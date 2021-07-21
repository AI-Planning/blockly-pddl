'use strict';

goog.provide('Blockly.PDDL');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['pddl_domain'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("domain_name"), "NAME");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "fluents")
        .appendField("numeric fluents");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "timed_literals")
        .appendField("timed initial literals");
    this.appendStatementInput("types")
        .setCheck("type")
        .appendField("types");
    this.appendStatementInput("predicates")
        .setCheck("predicate")
        .appendField("predicates");
    this.appendStatementInput("actions")
        .setCheck("action")
        .appendField("actions");
    this.setColour(120);
 this.setTooltip("This is the pddl domain");
 this.setHelpUrl("https://en.wikipedia.org/wiki/Planning_Domain_Definition_Language");
 this.typesList_ = [["object","object"]];
  },

  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    console.log(event.type);
    if (event.type == Blockly.Events.BLOCK_CHANGE) {
      var newTypesList = [['object','object']];
      var childList = this.getDescendants(true);
      for (let i in childList) {
        if (childList[i].type == 'type') {
            newTypesList.push([childList[i].getField('NAME').getValue(), childList[i].getField('NAME').getValue()]);
        }
        this.typesList_ = newTypesList;
      }
    }
  }
};

Blockly.Blocks['action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("action_name"), "NAME");
    this.appendStatementInput("par")
        .setCheck(null)
        .appendField("par");
    this.appendStatementInput("con")
        .setCheck(null)
        .appendField("con");
    this.appendStatementInput("eff")
        .setCheck(null)
        .appendField("eff");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(15);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['type'] = {
  init: function() {
    var typesList = new Blockly.FieldDropdown(this.generateTypesList);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("type_name"), "NAME")
        .appendField(" - ")
        .appendField(typesList, "parent_list");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "type");
    this.setNextStatement(true, "type");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  // onchange: function(event) {
  //   if (!this.workspace || this.workspace.isFlyout) {
  //     // Block is deleted or is in a flyout.
  //     return;
  //   }
  //   console.log(event.type);
  //   if (event.type == 'ui' || event.type == 'move') {
  //     if (this.getParent()) {
  //       console.log(this.getField('parent_list'));
  //       this.typesList.doValueUpdate_(this.getParent().typesList_);
  //     }
  //   }
  // },

  generateTypesList: function() {
    // console.log(this);
      // return workspace_pddl_types;
    if (this.getSourceBlock() == null)
      return workspace_pddl_types;
    if (this.getSourceBlock().isInFlyout)
      return workspace_pddl_types;
    if (this.getSourceBlock().getParent() == null)
      return workspace_pddl_types;
    if (this.getSourceBlock().getParent() != null) {
      console.log(this.getSourceBlock().getParent().typesList_);
      return this.getSourceBlock().getParent().typesList_;
    }
    return workspace_pddl_types;
  },

  getParentDomainBlock: function() {

  }
};

Blockly.Blocks['parameter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("parameter_name"), "par_name")
        .appendField(new Blockly.FieldDropdown([["key","a"], ["door","b"]]), "type");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['predicate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("predicate_name"), "NAME");
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("params");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};