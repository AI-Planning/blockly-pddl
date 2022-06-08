Blockly.PDDL['pddl_domain'] = function(block) {
  var text_domain_name = block.getFieldValue('DOMAIN_NAME');
  var statements_variables = Blockly.PDDL.statementToCode(block, 'VARIABLES');
  var statements_actions = Blockly.PDDL.statementToCode(block, 'ACTIONS');
  // TODO: Assemble PDDL into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PDDL['action'] = function(block) {
  var text_action_name = block.getFieldValue('NAME');
  var statements_con = Blockly.PDDL.statementToCode(block, 'con');
  var statements_eff = Blockly.PDDL.statementToCode(block, 'eff');
  // TODO: Assemble PDDL into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PDDL['parameter'] = function(block) {
  var text_param_name = block.getFieldValue('NAME');
  var text_param_type = block.getFieldValue('PARAM_TYPE');
  // TODO: Assemble PDDL into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PDDL['predicate_def'] = function(block) {
  var text_var_name = block.getFieldValue('NAME');
  var dropdown_data_type = block.getFieldValue('DATA_TYPE');
  var statements_param_input = Blockly.PDDL.statementToCode(block, 'PARAM_INPUT');
  // TODO: Assemble PDDL into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PDDL['predicate_call'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var fields = block.getInput('TOPROW').fieldRow;
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].name != 'NAME') {
      code += ' ?' + fields[i].getValue();
    }
  }
  // TODO: Assemble PDDL into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PDDL['and_or'] = function(block) {
  var dropdown_logic_operation = block.getFieldValue('LOGIC_OPERATION');
  var statements_predicate_calls = Blockly.PDDL.statementToCode(block, 'PREDICATE_CALLS');
  // TODO: Assemble PDDL into code variable.
  var code = '(' + dropdown_logic_operation.toLowerCase() + ' ' + statements_predicate_calls.trim() + ')';
  return code;
};

Blockly.PDDL['not'] = function(block) {
  var statements_predicate_calls = Blockly.PDDL.statementToCode(block, 'PREDICATE_CALLS');
  // TODO: Assemble PDDL into code variable.
  var code = '(not ' + statements_predicate_calls.trim() + ')';
  return code;
};