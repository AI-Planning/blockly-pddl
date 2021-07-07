Blockly.Blocks['action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("action_name"), "NAME");
    this.appendStatementInput("params")
        .setCheck(null)
        .appendField("parameters");
    this.appendValueInput("pre")
        .setCheck(null)
        .appendField("preconditions");
    this.appendValueInput("eff")
        .setCheck(null)
        .appendField("effects");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['predicate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("predicate_name"), "NAME");
    this.appendStatementInput("NAME")
        .setCheck("type")
        .appendField("parameters");
    this.setPreviousStatement(true, "predicate");
    this.setNextStatement(true, "predicate");
    this.setColour(230);
 this.setTooltip("basic PDDL predicate");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("type_name"), "NAME");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['holding_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("holding_key");
    this.setOutput(true, "Boolean");
    this.setColour(165);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['door_open'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("door_open");
    this.setOutput(true, "Boolean");
    this.setColour(165);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['found_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("found_key");
    this.setOutput(true, "Boolean");
    this.setColour(165);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};