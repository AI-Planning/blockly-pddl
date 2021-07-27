Blockly.Blocks['domain'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("domain")
        .appendField(new Blockly.FieldTextInput("name"), "domain_name");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "s")
        .appendField("typing");
    this.appendStatementInput("requirements")
        .setCheck("requirement")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("requirements");
    this.appendStatementInput("types")
        .setCheck(["types_object", "types_child_parent"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("types");
    this.appendStatementInput("predicates")
        .setCheck("predicate")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("predicates");
    this.appendStatementInput("functions")
        .setCheck("function")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("functions");
    this.appendStatementInput("actions")
        .setCheck("action")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("actions");
    this.setColour(240);
 this.setTooltip("domain");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("action")
        .appendField(new Blockly.FieldTextInput("name"), "action_name");
    this.appendStatementInput("parameters")
        .setCheck("parameter")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("parameters");
    this.appendStatementInput("preconditions")
        .setCheck("precondition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("preconditions");
    this.appendStatementInput("effects")
        .setCheck("effect")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("effects");
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setColour(120);
 this.setTooltip("action");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['predicate_two_parameter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("predicate");
    this.appendValueInput("parameter1")
        .setCheck("parameter")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldTextInput("predicate_name"), "predicate_name");
    this.appendValueInput("parameter2")
        .setCheck("parameter");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "predicate");
    this.setNextStatement(true, "predicate");
    this.setColour(290);
 this.setTooltip("predicate");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['parameter'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("type_name");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("parameter_name"), "parameter_name");
    this.setOutput(true, "parameter");
    this.setColour(230);
 this.setTooltip("parameter");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['predicate_one_parameter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("predicate");
    this.appendValueInput("parameter2")
        .setCheck("parameter");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldTextInput("predicate_name"), "predicate_name");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "predicate");
    this.setNextStatement(true, "predicate");
    this.setColour(290);
 this.setTooltip("predicate");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['and'] = {
  init: function() {
    this.appendStatementInput("and_inputs")
        .setCheck(null)
        .appendField("and");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['not'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("not");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['type_name'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("type_name")
        .appendField(new Blockly.FieldTextInput("type_name"), "type_name");
    this.setInputsInline(false);
    this.setOutput(true, "type_name");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['types_object'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("type_name");
    this.appendDummyInput()
        .appendField("- object");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "none");
    this.setNextStatement(true, "types_child_parent");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['types_child_parent'] = {
  init: function() {
    this.appendValueInput("child")
        .setCheck("type_name");
    this.appendValueInput("parent")
        .setCheck("type_name")
        .appendField("-");
    this.setInputsInline(true);
    this.setPreviousStatement(true, ["types_object", "types_child_parent"]);
    this.setNextStatement(true, "types_child_parent");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['function'] = {
  init: function() {
    this.appendValueInput("function_parameters")
        .setCheck("parameter")
        .appendField(new Blockly.FieldTextInput("function_name"), "function_name");
    this.setPreviousStatement(true, "function");
    this.setNextStatement(true, "function");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};