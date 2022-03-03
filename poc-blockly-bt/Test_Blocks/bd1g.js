Blockly.JavaScript['pddl_domain'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var checkbox_fluents = block.getFieldValue('fluents') == 'TRUE';
  var checkbox_timed_literals = block.getFieldValue('timed_literals') == 'TRUE';
  var statements_types = Blockly.JavaScript.statementToCode(block, 'types');
  var statements_predicates = Blockly.JavaScript.statementToCode(block, 'predicates');
  var statements_actions = Blockly.JavaScript.statementToCode(block, 'actions');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};