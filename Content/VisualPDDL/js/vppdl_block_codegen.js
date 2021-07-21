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

Blockly.JavaScript['action'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_par = Blockly.JavaScript.statementToCode(block, 'par');
  var statements_con = Blockly.JavaScript.statementToCode(block, 'con');
  var statements_eff = Blockly.JavaScript.statementToCode(block, 'eff');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['type'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_parent_list = block.getFieldValue('parent_list');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['parameter'] = function(block) {
  var text_par_name = block.getFieldValue('par_name');
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['predicate_def'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['predicate_call'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};