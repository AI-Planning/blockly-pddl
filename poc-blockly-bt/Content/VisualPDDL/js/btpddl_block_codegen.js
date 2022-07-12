Blockly.JavaScript['sequence_BT'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'seqnode_' + text_name + ' = py_trees.composites.Sequence("'+ text_name+'")';
  return code;
};

Blockly.JavaScript['condition_BT'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble JavaScript into code variable.
  var code = ' ?' + text_name + ' - ' + dropdown_type;
  return code;
};

Blockly.JavaScript['action_BT'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble JavaScript into code variable.
  var code = ' ?' + text_name + ' - ' + dropdown_type;
  return code;
};

Blockly.JavaScript['selector_BT'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'selnode_' + text_name + ' = py_trees.composites.Selector("'+ text_name+'")';
  return code;
};


Blockly.JavaScript['parallel_BT'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'parnode_' + text_name + ' = py_trees.composites.Parallel("'+ text_name+'")';
  return code;
};