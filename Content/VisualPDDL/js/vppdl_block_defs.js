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
        .setCheck("predicate_def")
        .appendField("predicates");
    this.appendStatementInput("actions")
        .setCheck("action")
        .appendField("actions");
    this.setColour(120);
 this.setTooltip("This is the pddl domain");
 this.setHelpUrl("https://en.wikipedia.org/wiki/Planning_Domain_Definition_Language");
 this.typesInThisDomain = [["object","object"]];
  },

  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    // console.log(event.type);
    if (event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_MOVE) {
      var newTypesList = [['object','object']];
      var childList = this.getDescendants(true);
      for (let i in childList) {
        if (childList[i].type == 'type') {
            newTypesList.push([childList[i].getField('NAME').getValue(), childList[i].getField('NAME').getValue()]);
        }
        this.typesInThisDomain = newTypesList;
      }
    }
  }
};

Blockly.Blocks['action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("action_name"), "NAME");
    this.appendStatementInput("par")
        .setCheck("parameter")
        .appendField("par");
    this.appendStatementInput("con")
        .setCheck("predicate_call")
        .appendField("con");
    this.appendStatementInput("eff")
        .setCheck(null)
        .appendField("eff");
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setColour(15);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['type'] = {
  init: function() {
    var typesList = new Blockly.FieldDropdown(this.generateTypesList, this.isTypeSelectionValid);
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
 this.typesList_ = [['object','object']];
  },

  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_MOVE) {
      if (this.getParent() == null) {
        this.typesList_ = [['object','object']];
      }
      else {
        if (this.getParent().type != "type") {
          this.typesList_ = [['object','object']];
          this.typesList_.push([this.getField('NAME').getValue(), this.getField('NAME').getValue()]);
        }
        else {
          this.typesList_ = this.getParent().getTypesList();
          this.typesList_.push([this.getField('NAME').getValue(), this.getField('NAME').getValue()]);
        }
      }
    }
  },

  isTypeSelectionValid: function(parentTypeName) {
    if (parentTypeName == this.getSourceBlock().getField('NAME').getValue())
      return null;
    else
      return parentTypeName;
  },

  generateTypesList: function() {
    if (this.getSourceBlock() == null)
      return workspace_pddl_types;
    if (this.getSourceBlock().getParent() != null) {
      if (this.getSourceBlock().getParent().type != "type")
        return [['object','object']];
      else {
        return this.getSourceBlock().getParent().getTypesList();
      }
    }
    return workspace_pddl_types;
  },

  getTypesList: function() {
    var returnObj = [];
    for (let i in this.typesList_) {
      returnObj.push(this.typesList_[i]);
    }
    return returnObj;
  }

  // getParentDomainBlock: function() {
  //   var tempParent = this.getParent();
  //   if (tempParent != null) {
  //     while(tempParent.type != 'pddl_domain')
  //       tempParent = tempParent.getParent();
  //   }
  //   return tempParent;
  // }
};

Blockly.Blocks['parameter'] = {
  init: function() {
    var typesList = new Blockly.FieldDropdown(this.generateTypesList, this.isTypeSelectionValid);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("parameter_name"), "par_name")
        .appendField(typesList, "type");
    this.setPreviousStatement(true, "parameter");
    this.setNextStatement(true, "parameter");
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  
  generateTypesList: function() {
    if (this.getSourceBlock() == null)
      return workspace_pddl_types;
    if (this.getSourceBlock().isInFlyout)
      return workspace_pddl_types;
    if (this.getSourceBlock().getParent() != null) {
      if (this.getSourceBlock().getParentDomainBlock() != null)
        return this.getSourceBlock().getParentDomainBlock().typesInThisDomain;
    }
    return workspace_pddl_types;
  },

  isTypeSelectionValid: function(parentTypeName) {
    if (parentTypeName == this.getSourceBlock().getField('par_name').getValue())
      return null;
    else
      return parentTypeName;
  },

  getParentDomainBlock: function() {
    var tempParent = this.getParent();
    while(tempParent != null && tempParent.type != 'pddl_domain')
      tempParent = tempParent.getParent();
    return tempParent;
  }
};

Blockly.Blocks['predicate_def'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("predicate_name"), "PREDICATE_NAME");
    this.appendStatementInput("NAME")
        .setCheck("parameter")
        .appendField("params");
    this.setPreviousStatement(true, "predicate_def");
    this.setNextStatement(true, "predicate_def");
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['predicate_call'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("predicate_call");
    this.setPreviousStatement(true, "predicate_call");
    this.setNextStatement(true, "predicate_call");
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};