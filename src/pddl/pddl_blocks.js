'use strict';

// goog.provide('Blockly.PDDL');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['pddl_domain'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("domain_name"), "DOMAIN_NAME");
    this.appendStatementInput("VARIABLES")
        .setCheck("predicate_def")
        .appendField("variables");
    this.appendStatementInput("ACTIONS")
        .setCheck("action")
        .appendField("actions");
    this.setColour(120);
 this.setTooltip("This is the pddl domain");
 this.setHelpUrl("https://en.wikipedia.org/wiki/Planning_Domain_Definition_Language");
  }
};

Blockly.Blocks['action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("action_name"), "NAME");
    this.appendStatementInput("con")
        .setCheck(["predicate_call", "pddl_not", "pddl_and_or"])
        .appendField("con");
    this.appendStatementInput("eff")
        .setCheck(["predicate_call", "pddl_not", "pddl_and_or"])
        .appendField("eff");
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setColour(15);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (event.type == Blockly.Events.SELECTED && event.newElementId != null) {
      // If the selected block is not an action block, do not change state of this block
      if (this.workspace.getBlockById(event.newElementId).type != 'action') {
        return;
      }
      if (event.newElementId != this.id && this.getParent() != null) {
        this.setCollapsed(true);
      }
      else {
        this.setCollapsed(false);
      }
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_MOVE) {
      // Check if type name is duplicate
      if (workspace.isNameUsed(this.getFieldValue('NAME'), this.workspace, this))
        this.setWarningText("This name is already in use.");
      else
        this.setWarningText(null);
    }
  },
  
  // Overrides
  /**
   * Create a human-readable text representation of this block and any children.
   * @param {number=} opt_maxLength Truncate the string to this length.
   * @param {string=} opt_emptyToken The placeholder string used to denote an
   *     empty field. If not specified, '?' is used.
   * @return {string} Text of block.
   */
  toString: function(opt_maxLength, opt_emptyToken) {
    return this.getFieldValue('NAME');
  }
};

Blockly.Blocks['parameter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("parameter_name"), "NAME")
        .appendField(new Blockly.FieldTextInput("type"), "PARAM_TYPE");
    this.setPreviousStatement(true, ["parameter", "parameter_nested_type"]);
    this.setNextStatement(true, ["parameter", "parameter_nested_type"]);
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  // onchange: function(event) {
  //   if (!this.workspace || this.workspace.isFlyout) {
  //     // Block is deleted or is in a flyout.
  //     return;
  //   }
  //   if (!event.recordUndo) {
  //     // Events not generated by user. Skip handling.
  //     return;
  //   }
  //   if (event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_MOVE) {
  //     // Check if type name is duplicate
  //     if (workspace.isNameUsed(this.getFieldValue('NAME'), this.workspace, this))
  //       this.setWarningText("This name is already in use.");
  //     else
  //       this.setWarningText(null);
  //   }
  // },
};

Blockly.Blocks['parameter_nested_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("parameter_name"), "NAME")
        .appendField(new Blockly.FieldTextInput("type"), "PARAM_TYPE")
        .appendField("-")
        .appendField(new Blockly.FieldTextInput("parent"), "PARENT_TYPE");
    this.setPreviousStatement(true, ["parameter", "parameter_nested_type"]);
    this.setNextStatement(true, ["parameter", "parameter_nested_type"]);
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['predicate_def'] = {
  init: function() {
    var initName = Blockly.Predicates.findLegalName('', this);
    var nameField = new Blockly.FieldTextInput(initName,
        Blockly.Predicates.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(nameField, "NAME")
        .appendField(new Blockly.FieldDropdown([["boolean","BOOL"], ["float","FLOAT"], ["integer","INT"]]), "DATA_TYPE");
    this.appendStatementInput("PARAM_INPUTS")
        .setCheck("parameter")
        .appendField("params");
    this.setPreviousStatement(true, "predicate_def");
    this.setNextStatement(true, "predicate_def");
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
 this.parameterNamesList_ = [];
 this.parameterTypesList_ = [];
  },
  /**
   * Create XML to represent the argument inputs.
   * @param {boolean=} opt_paramIds If true include the IDs of the parameter
   *     quarks.  Used by Blockly.Predicates.mutateCallers for reconnection.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function(opt_paramIds) {
    var container = Blockly.utils.xml.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    // var parNamesList = this.parameterNamesList_;
    for (var i = 0; i < this.parameterNamesList_.length; i++) {
      var parameter = Blockly.utils.xml.createElement('par');
      parameter.setAttribute('parname', this.parameterNamesList_[i])
      parameter.setAttribute('partype', this.parameterTypesList_[i]);
      container.appendChild(parameter);
    }

    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.parameterNamesList_ = [];
    this.parameterTypesList_ = [];
    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'par') {
        // var parName = childNode.getAttribute('partype');
        this.parameterNamesList_.push(childNode.getAttribute('parname'));
        this.parameterTypesList_.push(childNode.getAttribute('partype'));
      }
    }
  },
  /**
   * Return the signature of this predicate definition.
   * @return {!Array} Tuple containing two elements:
   *     - the name of the defined predicate,
   *     - a list of all its parameters,
   * @this {Blockly.Block}
   */
  getPredicateDef: function() {
    return [this.getFieldValue('NAME'), this.parameterNamesList_, false, this.parameterTypesList_];
  },
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function(options) {
    if (this.isInFlyout) {
      return;
    }
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = "Create '%1' call".replace('%1', name);
    var xmlMutation = Blockly.utils.xml.createElement('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.parameterTypesList_.length; i++) {
      var xmlArg = Blockly.utils.xml.createElement('par');
      xmlArg.setAttribute('parname', this.parameterNamesList_[i]);
      xmlArg.setAttribute('partype', this.parameterTypesList_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = Blockly.utils.xml.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  },

  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_CREATE || event.type == Blockly.Events.BLOCK_MOVE) {
      var newParamterNamesList = [];
      var newParamterTypesList = [];
      var childBlock = this.getInputTargetBlock('PARAM_INPUTS');
      if (childBlock) {
        if ('parameter' == childBlock.type) {
          newParamterNamesList.push(childBlock.getFieldValue('NAME'));
          newParamterTypesList.push(childBlock.getFieldValue('PARAM_TYPE'));
        }
      
        while (childBlock.nextConnection && childBlock.nextConnection.targetBlock()) {
          childBlock = childBlock.nextConnection.targetBlock();
          if ('parameter' === childBlock.type || 'parameter_nested_type' === childBlock.type) {
            newParamterNamesList.push(childBlock.getFieldValue('NAME'));
            newParamterTypesList.push(childBlock.getFieldValue('PARAM_TYPE'));
          }
        }
      }

      this.parameterNamesList_ = newParamterNamesList;
      this.parameterTypesList_ = newParamterTypesList;
      Blockly.Predicates.mutateCallers(this);
    }
  },

  callType_: 'predicate_call'
};

Blockly.Blocks['predicate_call'] = {
  init: function() {
    this.appendDummyInput("TOPROW")
        .appendField("", "NAME")
    this.setPreviousStatement(true, "predicate_call");
    this.setNextStatement(true, "predicate_call");
    this.setColour(300);
//  this.setTooltip("");
 this.setHelpUrl("");
 this.parameterTypesList_ = [];
 this.parameterNamesList_ = [];
 this.previousEnabledState_ = true;
  },

  /**
   * Returns the name of the predicate this block calls.
   * @return {string} Predicate name.
   * @this {Blockly.Block}
   */
  getPredicateCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a predicate is renaming.
   * If the name matches this block's predicate, rename it.
   * @param {string} oldName Previous name of predicate.
   * @param {string} newName Renamed predicate.
   * @this {Blockly.Block}
   */
  renamePredicate: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getPredicateCall())) {
      this.setFieldValue(newName, 'NAME');
      var baseMsg = 'Use the predicate %1 in an action block';
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  /**
   * Notification that the predicate's parameters have changed.
   * @param {!Array<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this {Blockly.Block}
   */
  setPredicateParameters_: function(paramTypes, paramNames) {
    // Switch off rendering while the block is rebuilt.
    // var savedRendered = this.rendered;
    // this.rendered = false;
    this.parameterNamesList_ = paramNames;
    this.parameterTypesList_ = paramTypes;
    // console.log(this.parameterNamesList_);
    this.updateParameterInputs(paramTypes, paramNames);

    // Restore rendering and show the changes.
    // this.rendered = savedRendered;
    // if (this.rendered) {
    //   this.render();
    // }
  },

  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('name', this.getPredicateCall());
    for (var i = 0; i < this.parameterTypesList_.length; i++) {
      var parameter = Blockly.utils.xml.createElement('par');
      parameter.setAttribute('partype', this.parameterTypesList_[i]);
      var fieldName = 'paramField' + i + ';' + this.parameterTypesList_[i];
      parameter.setAttribute('parname', this.getFieldValue(fieldName));
      container.appendChild(parameter);
    }
    return container;
  },

  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renamePredicate(this.getPredicateCall(), name);
    var parTypes = [];
    var parNames = [];
    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'par') {
        parTypes.push(childNode.getAttribute('partype'));
        parNames.push(childNode.getAttribute('parname'));
      }
    }
    this.setPredicateParameters_(parTypes, parNames);
  },

  /**
   * Predicate calls cannot exist without the corresponding predicate
   * definition.  Enforce this link whenever an event is fired.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this {Blockly.Block}
   */
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CREATE &&
        event.ids.indexOf(this.id) != -1) {
      // Look for the case where a predicate call was created (usually through
      // paste) and there is no matching definition.  In this case, create
      // an empty definition block with the correct signature.
      var name = this.getPredicateCall();
      var def = Blockly.Predicates.getDefinition(name, this.workspace);
      if (def && (def.type != this.defType_ )) {
        // The signatures don't match.
        def = null;
      }
      if (!def) {
        Blockly.Events.setGroup(event.group);
        /**
         * Create matching definition block.
         * <xml xmlns="https://developers.google.com/blockly/xml">
         *   <block type="predicate_def" x="10" y="20">
         *     <mutation name="test">
         *       <arg name="x"></arg>
         *     </mutation>
         *     <field name="NAME">test</field>
         *   </block>
         * </xml>
         */
        var xml = Blockly.utils.xml.createElement('xml');
        var block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', this.defType_);
        var xy = this.getRelativeToSurfaceXY();
        var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
        var y = xy.y + Blockly.SNAP_RADIUS * 2;
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        var mutation = this.mutationToDom();
        block.appendChild(mutation);
        var field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NAME');
        var callName = this.getPredicateCall();
        if (!callName) {
          // Rename if name is empty string.
          callName = Blockly.Predicates.findLegalName('', this);
          this.renamePredicate('', callName);
        }
        field.appendChild(Blockly.utils.xml.createTextNode(callName));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.BLOCK_DELETE) {
      // Look for the case where a predicate definition has been deleted,
      // leaving this block (a predicate call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getPredicateCall();
      var def = Blockly.Predicates.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.CHANGE && event.element == 'disabled') {
      var name = this.getPredicateCall();
      var def = Blockly.Predicates.getDefinition(name, this.workspace);
      if (def && def.id == event.blockId) {
        // in most cases the old group should be ''
        var oldGroup = Blockly.Events.getGroup();
        if (oldGroup) {
          // This should only be possible programmatically and may indicate a problem
          // with event grouping. If you see this message please investigate. If the
          // use ends up being valid we may need to reorder events in the undo stack.
          console.log('Saw an existing group while responding to a definition change');
        }
        Blockly.Events.setGroup(event.group);
        if (event.newValue) {
          this.previousEnabledState_ = this.isEnabled();
          this.setEnabled(false);
        } else {
          this.setEnabled(this.previousEnabledState_);
        }
        Blockly.Events.setGroup(oldGroup);
      }
    }
  },

  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function(options) {
    if (!this.workspace.isMovable()) {
      // If we center on the block and the workspace isn't movable we could
      // loose blocks at the edges of the workspace.
      return;
    }

    var option = {enabled: true};
    option.text = 'Show corresponding variable definition';
    var name = this.getPredicateCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Predicates.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },

  updateParameterInputs: function(paramTypes, parameterNamesList){
    var inputFields = this.getInput('TOPROW').fieldRow;
    var numParameterFields = inputFields.length - 1;
    for (i = 0; i < parameterNamesList.length; i++) {
      var fieldName = 'paramField' + i + ';' + paramTypes[i];
      if (i >= numParameterFields) {
        var newTextInput = new Blockly.FieldTextInput(parameterNamesList[i]);
        // console.log(fieldName);
        // Insert new field
        this.getInput('TOPROW').insertFieldAt(i+1, newTextInput, fieldName);
      }
      else {
        // console.log(inputFields);
        if (inputFields[i+1].name == 'NAME'){
          continue;
        }
        else if (inputFields[i+1].name.split(";")[1] == paramTypes[i]) {
          continue;
        }
        else {
          inputFields[i+1].name = fieldName;
        }
      }
    }
    if (parameterNamesList.length < numParameterFields) {
      for (var i = numParameterFields; i > parameterNamesList.length; i--) {
        this.getInput('TOPROW').removeField(inputFields[i].name, true);
      }
    }
  },

  getParentActionBlock: function() {
    var tempParent = this.getParent();
    while(tempParent != null && tempParent.type != 'action')
      tempParent = tempParent.getParent();
    return tempParent;
  },

  defType_: 'predicate_def'
};

Blockly.Blocks['and_or'] = {
  init: function() {
    this.appendStatementInput("PREDICATE_CALLS")
        .setCheck("predicate_call")
        .appendField(new Blockly.FieldDropdown([["and","AND"], ["or","OR"]]), "LOGIC_OPERATION");
        this.setPreviousStatement(true, ["predicate_call", "not", "and_or"]);
        this.setNextStatement(true, ["predicate_call", "not", "and_or"]);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['not'] = {
  init: function() {
    this.appendStatementInput("PREDICATE_CALLS")
        .setCheck("predicate_call")
        .appendField("not");
    this.setPreviousStatement(true, ["predicate_call", "not", "and_or"]);
    this.setNextStatement(true, ["predicate_call", "not", "and_or"]);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};