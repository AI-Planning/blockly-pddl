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
  }
};