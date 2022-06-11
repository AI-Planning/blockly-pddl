Blockly.PDDL['pddl_domain'] = function(block) {
  var text_domain_name = block.getFieldValue('DOMAIN_NAME');
  var statements_variables = Blockly.PDDL.variablesToCode(block, 'VARIABLES');
  var statements_actions = Blockly.PDDL.statementToCode(block, 'ACTIONS');
  
  var code = '(define (domain ' + text_domain_name + ')\n';

  // Add requirements
  code += '(:requirements';
  code += ' :strips';
  code += ' :fluents';
  code += ' :timed-initial-literals';
  code += ' :typing';
  code += ' :negative-preconditions';
  code += ')\n';

  // Add types
  code += '(:types ';
  code += ';; TODO';
  code += ')\n';

  // Add predicates and functions
  var has_predicates = false;
  var code_predicates = '(predicates: \n';
  var has_functions = false;
  var code_functions = '(functions: \n';
  for (var i = 0; i < statements_variables.length; i++) {
    if ('BOOL' == statements_variables[i][0]) {
      has_predicates = true;
      code_predicates += statements_variables[i][1];
    }
    else {
      has_functions = true;
      code_functions += statements_variables[i][1];
    }
  }
  code_predicates += ')\n';
  code_functions += ')\n';

  if (has_predicates)
    code += code_predicates;
  if(has_functions)
    code += code_functions;

  // Add actions
  if (statements_actions != '') {
    code += '\n' + statements_actions.trim();
  }
  
  // End "define"
  code += '\n)';
  return code;
};

Blockly.PDDL['action'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_con = Blockly.PDDL.statementToCode(block, 'con');
  var statements_eff = Blockly.PDDL.statementToCode(block, 'eff');
  
  var code = '(:action ';
  code += text_name;

  // code += '\n:parameters (' + statements_par.trim() + ')';
  code += '\n:parameters (' + ';; TODO' + ')';

  statements_con.trim();
  code += '\n:precondition ' + statements_con.trim();

  code += '\n:effect ' + statements_eff.trim();

  code += ')\n'; // End action
  return code;
};

Blockly.PDDL['parameter'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_param_type = block.getFieldValue('PARAM_TYPE');

  var code = ' ?' + text_name + ' - ' + text_param_type;
  return code;
};

Blockly.PDDL['predicate_def'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // var dropdown_data_type = block.getFieldValue('DATA_TYPE');
  var statements_param_input = Blockly.PDDL.statementToCode(block, 'PARAM_INPUTS');
  
  var code = '\t(' + text_name;
  if (statements_param_input)
    code += ' ' + statements_param_input.trim();
  code += ')\n';
  return code;
};

Blockly.PDDL['predicate_call'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var code = ' (' + text_name;
  var fields = block.getInput('TOPROW').fieldRow;
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].name != 'NAME') {
      code += ' ?' + fields[i].getValue();
    }
  }
  code += ')\n';
  return code;
};

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