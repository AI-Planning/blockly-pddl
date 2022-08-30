// Blockly.JavaScript['pddl_domain'] = function(block) {
//   var text_name = block.getFieldValue('NAME');
//   var checkbox_strips = block.getFieldValue('STRIPS') == 'TRUE';
//   var checkbox_fluents = block.getFieldValue('FLUENTS') == 'TRUE';
//   var checkbox_timed_literals = block.getFieldValue('TIMED_LITERALS') == 'TRUE';
//   var statements_types = Blockly.JavaScript.statementToCode(block, 'types');
//   var statements_predicates = Blockly.JavaScript.statementToCode(block, 'predicates');
//   var statements_actions = Blockly.JavaScript.statementToCode(block, 'actions');
  
//   // TODO: Assemble JavaScript into code variable.
//   var code = '(define (domain ' + text_name + ')\n';

//   // Add requirements
//   code += '(:requirements';
//   if (checkbox_strips)
//     code += ' :strips';
//   if (checkbox_fluents)
//     code += ' :fluents';
//   if (checkbox_timed_literals)
//     code += ' :timed-initial-literals';
//   if (true || checkbox_typing)
//     code += ' :typing';
//   if (true || checkbox_neg_preconditions)
//     code += ' :negative-preconditions';
     
//   code += ')\n';

//   // Add types
//   if (statements_types != '') {
//     code += '(:types ';
//     code += statements_types.trim();
//     code += ')\n';
//   }

//   // Add predicates
//   if (statements_predicates != '') {
//     code += '(:predicates ';
//     code += statements_predicates.trim();
//     code += ')\n';
//   }

//   // Add actions
//   if (statements_actions != '') {
//     code += '\n' + statements_actions.trim();
//   }

//   // End "define"
//   code += '\n)';
//   return code;
// };


// Blockly.JavaScript['type'] = function(block) {
//   var text_name = block.getFieldValue('NAME');
//   var dropdown_parent_list = block.getFieldValue('parent_list');
//   // TODO: Assemble JavaScript into code variable.
//   var code = '\t' + text_name + ' - ' + dropdown_parent_list + '\n';
//   return code;
// };

// Blockly.JavaScript['parameter'] = function(block) {
//   var text_name = block.getFieldValue('NAME');
//   var dropdown_type = block.getFieldValue('type');
//   // TODO: Assemble JavaScript into code variable.
//   var code = ' ?' + text_name + ' - ' + dropdown_type;
//   return code;
// };

// Blockly.JavaScript['predicate_def'] = function(block) {
//   var text_name = block.getFieldValue('NAME');
//   var statements_param_inputs = Blockly.JavaScript.statementToCode(block, 'PARAM_INPUTS');
//   // TODO: Assemble JavaScript into code variable.
//   var code = '\t(' + text_name + statements_param_inputs + ')\n';
//   return code;
// };

// Blockly.JavaScript['predicate_call'] = function(block) {
//   var predicate_name = block.getFieldValue('NAME');
//   var code = ' (' + predicate_name;
//   var fields = block.getInput('TOPROW').fieldRow;
//   for (var i = 0; i < fields.length; i++) {
//     if (fields[i].name != 'NAME') {
//       code += ' ?' + fields[i].getValue();
//     }
//   }
//   // TODO: Assemble JavaScript into code variable.
//   code += ')\n';
//   return code;
// };

// Blockly.JavaScript['and_or'] = function(block) {
//   var dropdown_logic_operation = block.getFieldValue('LOGIC_OPERATION');
//   var statements_predicate_calls = Blockly.JavaScript.statementToCode(block, 'PREDICATE_CALLS');
//   // TODO: Assemble JavaScript into code variable.
//   var code = '(' + dropdown_logic_operation.toLowerCase() + ' ' + statements_predicate_calls.trim() + ')';
//   return code;
// };

// Blockly.JavaScript['not'] = function(block) {
//   var statements_predicate_calls = Blockly.JavaScript.statementToCode(block, 'PREDICATE_CALLS');
//   // TODO: Assemble JavaScript into code variable.
//   var code = '(not ' + statements_predicate_calls.trim() + ')';
//   return code;
// };


Blockly.Python['sequence'] = function(block) {
  var text_sequence_name = block.getFieldValue('sequence_name');
  var statements_sequence_children = Blockly.Python.statementToCode(block, 'sequence_children');
  // TODO: Assemble Python into code variable.
  var output = text_sequence_name + "_output";
  var code = output + " = " + "py_trees.composites.Sequence(" + text_sequence_name + ")" +"\n";
  return code;
};

Blockly.Python['selector'] = function(block) {
  var text_selector_name = block.getFieldValue('selector_name');
  var statements_selector_children = Blockly.Python.statementToCode(block, 'selector_children');
  // TODO: Assemble Python into code variable.
  var output = text_selector_name + "_output";
  var code = output + " = " + "py_trees.composites.Selector(" + text_selector_name + ")" + "\n";
  return code;
};

Blockly.Python['condition'] = function(block) {
  var statements_condition_input = Blockly.Python.statementToCode(block, 'condition_input');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['action'] = function(block) {
  var statements_action_input = Blockly.Python.statementToCode(block, 'action_input');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['init_node'] = function(block) {
  var statements_output_node = Blockly.Python.statementToCode(block, 'output_node');
  // TODO: Assemble Python into code variable.
  var import_code = 'import py_trees';
  var code = import_code + "\n" + statements_output_node;


  root.add_children([connect, publisher, register, plan_command_handler, flow])
    # Build the tree.
    tree = py_trees.trees.BehaviourTree(root=root)

    
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};