/**
 * @fileoverview 
 * @author Naman Bhatia
 */

Blockly.StateMachines['machine'] = function(block) {
  var code = '';
  var text_sm_name = block.getFieldValue('sm_name');
  var statements_state = Blockly.JavaScript.statementToCode(block, 'state');
  console.log(statements_state);
  code += '# ' + text_sm_name + '\n';
  code += statements_state;
  return code;
};

Blockly.StateMachines['state'] = function(block) {
  var text_state_id = block.getFieldValue('state_id');
  var text_state_description = block.getFieldValue('state_description');
  var statements_function_1 = Blockly.JavaScript.statementToCode(block, 'function_1');
  var statements_function_2 = Blockly.JavaScript.statementToCode(block, 'function_2');
  var text_transition_0 = block.getFieldValue('transition_0');
  var text_transition_1 = block.getFieldValue('transition_1');
  var text_transition_2 = block.getFieldValue('transition_2');
  var text_transition_3 = block.getFieldValue('transition_3');
  var text_transition_4 = block.getFieldValue('transition_4');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  //Add State id
  if (text_state_id != '') {
    code += '#State ';
    code += text_state_id + ': ';
    code += text_state_description;
    code += '\n';
    code += 'Q_id ';
    code += text_state_id;
    code += '\n';
  }

  // Add transition states
  if (text_transition_1 != '') {
    code += 'delta_q ';
    code += '1 '+ text_transition_1;
    code += '\n';
  }

  if (text_transition_2 != '') {
    code += 'delta_q ';
    code += '2 '+ text_transition_2;
    code += '\n';
  }

  if (text_transition_3 != '') {
    code += 'delta_q ';
    code += '3 '+ text_transition_3;
    code += '\n';
  }

  if (text_transition_4 != '') {
    code += 'delta_q ';
    code += '4 '+ text_transition_4;
    code += '\n';
  }

  if(statements_function_1 != ''){
    code += statements_function_1;
  }

  if(statements_function_2 != ''){
    code += statements_function_2;
  }
  // End "define"
  code += '\n';
  return code;
};

Blockly.StateMachines['action'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_par = Blockly.JavaScript.statementToCode(block, 'par');
  var statements_con = Blockly.JavaScript.statementToCode(block, 'con');
  var statements_eff = Blockly.JavaScript.statementToCode(block, 'eff');
  var code = '';
  // TODO: Assemble JavaScript into code variable.
  
  code += '(:action ';
  code += text_name;

  code += '\n:parameters (' + statements_par.trim() + ')';

  statements_con.trim();
  code += '\n:precondition ' + statements_con.trim();

  code += '\n:effect ' + statements_eff.trim();

  code += ')\n'; // End action
  return code;
};

Blockly.StateMachines['function_1'] = function(block) {
  var dropdown_action_name = block.getFieldValue('action_name');
  // var value_action_name = Blockly.JavaScript.valueToCode(block, 'action_name', Blockly.JavaScript.ORDER_ATOMIC);
  var text_param = block.getFieldValue('param');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  // if(text_timeout!= ' '){
  //   code += 'timeout ' + text_timeout + '\n';
  // } maxim
  if(dropdown_action_name != ''){
    code += 'Action Name ' + dropdown_action_name + '\n';
  }
  if(text_param != ''){
    code += 'Parameter ' + text_param + '\n';
  }
  return code;
};

Blockly.StateMachines['function_2'] = function(block) {
  var dropdown_action_name = block.getFieldValue('action_name');
  var text_param = block.getFieldValue('param');
  var text_timeout = block.getFieldValue('timeout');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  if(text_timeout!= ''){
    code += 'timeout ' + text_timeout + '\n';
  }
  if(dropdown_action_name != ''){
    code += 'Action Name ' + dropdown_action_name + '\n';
  }
  if(text_param != ''){
    code += 'Parameter ' + text_param + '\n';
  }
  return code;
};

Blockly.StateMachines['input'] = function(block) {
  var text_input = block.getFieldValue('input');
  // TODO: Assemble JavaScript into code variable.
  var code = '';

  //JS code into variable

  code += '(:Method name (' + text_input + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};
