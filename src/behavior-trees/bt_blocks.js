'use strict';


goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['sequence'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sequence");
    this.appendDummyInput()
        // .appendField(new Blockly.FieldTextInput("Sequence output"), "sequence_out_name")
        .appendField(new Blockly.FieldTextInput("Sequence name"), "sequence_name");
    this.appendStatementInput("sequence_children")
        .setCheck(["action", "condition"])
        // .appendField("Children");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['selector'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Selector");
    this.appendDummyInput()
        // .appendField(new Blockly.FieldTextInput("Selector output"), "selector_out_name")
        .appendField(new Blockly.FieldTextInput("Selector name"), "selector_name");
    this.appendStatementInput("selector_children")
        .setCheck(["action", "condition"])
        // .appendField("Children");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['condition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Condition text"), "condition_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Action text "), "action_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['init_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Init code");
    this.appendStatementInput("output_node")
        .setCheck(null)
        // .appendField("Children");
    this.setOutput(true, null);
    this.setColour(75);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['textInput'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("text:")
        .appendField(new Blockly.FieldTextInput('default text'),
            'FIELDNAME');
  }
};

Blockly.Blocks['parallel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Parallel");
    this.appendDummyInput()
        // .appendField(new Blockly.FieldTextInput("Parallel output"), "parallel_out_name")
        .appendField(new Blockly.FieldTextInput("Parallel name"), "parallel_name");
    this.appendStatementInput("parallel_children")
        .setCheck(null)
        // .appendField("Children");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bt_action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("action"), "NAME");
    this.appendValueInput("pre")
        .setCheck(null)
        .appendField(new Blockly.FieldLabelSerializable("pre"), "pre");
    this.appendValueInput("per")
        .setCheck(null)
        .appendField(new Blockly.FieldLabelSerializable("per"), "per");
    this.appendValueInput("end")
        .setCheck(null)
        .appendField(new Blockly.FieldLabelSerializable("end"), "ned");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};