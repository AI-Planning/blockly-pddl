/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility functions for handling predicates.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Predicates
 * @namespace
 */
goog.provide('Blockly.Predicates');

goog.require('Blockly.Blocks');
/** @suppress {extraRequire} */
goog.require('Blockly.constants');
goog.require('Blockly.Events');
/** @suppress {extraRequire} */
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('Blockly.Names');
goog.require('Blockly.utils.xml');
goog.require('Blockly.Workspace');
goog.require('Blockly.Xml');

goog.requireType('Blockly.Block');
goog.requireType('Blockly.Events.Abstract');
goog.requireType('Blockly.WorkspaceSvg');


/**
 * Constant to separate predicate names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.PREDICATE_CATEGORY_NAME
 */
Blockly.Predicates.NAME_TYPE = "PREDICATES";

/**
 * The default argument for a predicates_mutatorarg block.
 * @type {string}
 */
Blockly.Predicates.DEFAULT_ARG = 'x';

/**
 * Predicate block type.
 * @typedef {{
 *    getPredicateCall: function():string,
 *    renamePredicate: function(string,string),
 *    getPredicateDef: function():!Array
 * }}
 */
Blockly.Predicates.PredicateBlock;

/**
 * Find all user-created predicate definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array<!Array<!Array>>} Pair of arrays, the
 *     first contains predicates without return variables, the second with.
 *     Each predicate is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.Predicates.allPredicates = function (root) {
  var predicates = root.getBlocksByType('predicate_def', false).map(function (block) {
    return /** @type {!Blockly.Predicates.PredicateBlock} */ (block).getPredicateDef();
  });
  predicates.sort(Blockly.Predicates.procTupleComparator_);
  return predicates;
};

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.Predicates.procTupleComparator_ = function (ta, tb) {
  return ta[0].localeCompare(tb[0], undefined, { sensitivity: 'base' });
};

/**
 * Ensure two identically-named predicates don't exist.
 * Take the proposed predicate name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other predicates.
 * @param {string} name Proposed predicate name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Predicates.findLegalName = function (name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple predicates called 'do something'.
    return name;
  }
  name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
  while (!Blockly.Predicates.isLegalName_(name, block.workspace, block)) {
    // Collision with another predicate.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return name;
};

/**
 * Does this predicate have a legal name?  Illegal names include names of
 * predicates already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Blockly.Predicates.isLegalName_ = function (name, workspace, opt_exclude) {
  return !Blockly.Predicates.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a predicate name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Blockly.Predicates.isNameUsed = function (name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].getPredicateDef) {
      var predicateBlock = /** @type {!Blockly.Predicates.PredicateBlock} */ (
        blocks[i]);
      var procName = predicateBlock.getPredicateDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Rename a predicate.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Blockly.Predicates.rename = function (name) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  name = name.trim();

  var legalName = Blockly.Predicates.findLegalName(name,
       /** @type {!Blockly.Block} */(this.getSourceBlock()));
  var oldName = this.getValue();
  if (oldName != name && oldName != legalName) {
    // Rename any callers.
    var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].renamePredicate) {
        var predicateBlock = /** @type {!Blockly.Predicates.PredicateBlock} */ (
          blocks[i]);
        predicateBlock.renamePredicate(
             /** @type {string} */(oldName), legalName);
      }
    }
  }
  return legalName;
};

/**
 * Construct the blocks required by the flyout for the predicate category.
 * @param {!Blockly.Workspace} workspace The workspace containing predicates.
 * @return {!Array<!Element>} Array of XML block elements.
 */
Blockly.Predicates.flyoutCategory = function (workspace) {
  var xmlList = [];
  if (Blockly.Blocks['predicate_def']) {
    // <block type="predicate_def" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'predicate_def');
    block.setAttribute('gap', 16);
    var nameField = Blockly.utils.xml.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.utils.xml.createTextNode(
      'variable_name'));
    block.appendChild(nameField);
    xmlList.push(block);
  }
  if (xmlList.length) {
    // Add slightly larger gap between system blocks and user calls.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);
  }

  function populatePredicates(predicateList, templateName) {
    for (var i = 0; i < predicateList.length; i++) {
      var name = predicateList[i][0];
      var params = predicateList[i][3];
      // <block type="predicate_call" gap="16">
      //   <mutation name="do something">
      //     <par name="x"></par>
      //   </mutation>
      // </block>
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', templateName);
      block.setAttribute('gap', 16);
      var mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('name', name);
      block.appendChild(mutation);
      for (var j = 0; j < params.length; j++) {
        var par = Blockly.utils.xml.createElement('par');
        par.setAttribute('parname', predicateList[i][1][j]);
        par.setAttribute('partype', params[j]);
        mutation.appendChild(par);
      }
      xmlList.push(block);
    }
  }

  var predicates = Blockly.Predicates.allPredicates(workspace);
  populatePredicates(predicates, 'predicate_call');
  return xmlList;
};

/**
 * Updates the predicate mutator's flyout so that the arg block is not a
 * duplicate of another arg.
 * @param {!Blockly.Workspace} workspace The predicate mutator's workspace. This
 *     workspace's flyout is what is being updated.
 * @private
 */
//  Blockly.Predicates.updateMutatorFlyout_ = function(workspace) {
//    var usedNames = [];
//    var blocks = workspace.getBlocksByType('predicates_mutatorarg', false);
//    for (var i = 0, block; (block = blocks[i]); i++) {
//      usedNames.push(block.getFieldValue('NAME'));
//    }

//    var xml = Blockly.utils.xml.createElement('xml');
//    var argBlock = Blockly.utils.xml.createElement('block');
//    argBlock.setAttribute('type', 'predicates_mutatorarg');
//    var nameField = Blockly.utils.xml.createElement('field');
//    nameField.setAttribute('name', 'NAME');
//    var argValue = Blockly.Variables.generateUniqueNameFromOptions(
//        Blockly.Predicates.DEFAULT_ARG, usedNames);
//    var fieldContent = Blockly.utils.xml.createTextNode(argValue);

//    nameField.appendChild(fieldContent);
//    argBlock.appendChild(nameField);
//    xml.appendChild(argBlock);

//    workspace.updateToolbox(xml);
//  };

/**
 * Listens for when a predicate mutator is opened. Then it triggers a flyout
 * update and adds a mutator change listener to the mutator workspace.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @package
 */
//  Blockly.Predicates.mutatorOpenListener = function(e) {
//    if (!(e.type == Blockly.Events.BUBBLE_OPEN && e.bubbleType === 'mutator' &&
//        e.isOpen)) {
//      return;
//    }
//    var workspaceId = /** @type {string} */ (e.workspaceId);
//    var block = Blockly.Workspace.getById(workspaceId)
//        .getBlockById(e.blockId);
//    var type = block.type;
//    if (type != 'predicate_def') {
//      return;
//    }
//    var workspace = block.mutator.getWorkspace();
//    Blockly.Predicates.updateMutatorFlyout_(workspace);
//    workspace.addChangeListener(Blockly.Predicates.mutatorChangeListener_);
//  };

/**
 * Listens for changes in a predicate mutator and triggers flyout updates when
 * necessary.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @private
 */
//  Blockly.Predicates.mutatorChangeListener_ = function(e) {
//    if (e.type != Blockly.Events.BLOCK_CREATE &&
//        e.type != Blockly.Events.BLOCK_DELETE &&
//        e.type != Blockly.Events.BLOCK_CHANGE) {
//      return;
//    }
//    var workspaceId = /** @type {string} */ (e.workspaceId);
//    var workspace = /** @type {!Blockly.WorkspaceSvg} */
//        (Blockly.Workspace.getById(workspaceId));
//    Blockly.Predicates.updateMutatorFlyout_(workspace);
//  };

/**
 * Find all the callers of a named predicate.
 * @param {string} name Name of predicate.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array<!Blockly.Block>} Array of caller blocks.
 */
Blockly.Predicates.getCallers = function (name, workspace) {
  var callers = [];
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getPredicateCall) {
      var predicateBlock = /** @type {!Blockly.Predicates.PredicateBlock} */ (
        blocks[i]);
      var procName = predicateBlock.getPredicateCall();
      // Predicate name may be null if the block is only half-built.
      if (procName && Blockly.Names.equals(procName, name)) {
        callers.push(blocks[i]);
      }
    }
  }
  return callers;
};

/**
 * When a predicate definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock Predicate definition block.
 */
Blockly.Predicates.mutateCallers = function (defBlock) {
  var oldRecordUndo = Blockly.Events.recordUndo;
  var predicateBlock = /** @type {!Blockly.Predicates.PredicateBlock} */ (
    defBlock);
  var name = predicateBlock.getPredicateDef()[0];
  var xmlElement = defBlock.mutationToDom(false);
  var callers = Blockly.Predicates.getCallers(name, defBlock.workspace);
  for (var i = 0, caller; (caller = callers[i]); i++) {
    var oldMutationDom = caller.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    caller.domToMutation(xmlElement);
    var newMutationDom = caller.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      // Fire a mutation on every caller block.  But don't record this as an
      // undo action since it is deterministically tied to the predicate's
      // definition mutation.
      Blockly.Events.recordUndo = false;
      Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
        caller, 'mutation', null, oldMutation, newMutation));
      Blockly.Events.recordUndo = oldRecordUndo;
    }
  }
};

/**
 * Find the definition block for the named predicate.
 * @param {string} name Name of predicate.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {?Blockly.Block} The predicate definition block, or null not found.
 */
Blockly.Predicates.getDefinition = function (name, workspace) {
  // Do not assume predicate is a top block. Some languages allow nested
  // predicates. Also do not assume it is one of the built-in blocks. Only
  // rely on getPredicateDef.
  var blocks = workspace.getAllBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getPredicateDef) {
      var predicateBlock = /** @type {!Blockly.Predicates.PredicateBlock} */ (
        blocks[i]);
      var tuple = predicateBlock.getPredicateDef();
      if (tuple && Blockly.Names.equals(tuple[0], name)) {
        return blocks[i];  // Can't use predicateBlock var due to type check.
      }
    }
  }
  return null;
};
