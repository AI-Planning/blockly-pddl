'use strict';

// TODO: Replace "Blockly.PDDL" with appropriate provide
goog.provide('Blockly.PDDL');

goog.require('Blockly.Blocks');
goog.require('Blockly');

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