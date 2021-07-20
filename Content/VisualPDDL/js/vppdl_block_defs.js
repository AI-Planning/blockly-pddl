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
        .setCheck("pddl_type")
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
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("type_name"), "NAME")
        .appendField(" - ")
        .appendField(new Blockly.FieldDropdown([["object","ad"], ["op1","sdf"], ["op2","sdasd"]]), "parent_list");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "type");
    this.setNextStatement(true, "type");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
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