Blockly.PDDL['and_or'] = function(block) {
  var dropdown_logic_operation = block.getFieldValue('LOGIC_OPERATION');
  var statements_predicate_calls = Blockly.PDDL.statementToCode(block, 'PREDICATE_CALLS');

  var code = '(' + dropdown_logic_operation.toLowerCase() + ' ' + statements_predicate_calls.trim() + ')';
  return code;
};

Blockly.PDDL['not'] = function(block) {
  var statements_predicate_calls = Blockly.PDDL.statementToCode(block, 'PREDICATE_CALLS');

  var code = '(not ' + statements_predicate_calls.trim() + ')';
  return code;
};