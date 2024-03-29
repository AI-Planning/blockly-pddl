/**
 * @fileoverview 
 * @author Yassine Bennani
 */

var existing_children = [];
var action_ind = 0;
var seq_ind = 0;
var sel_ind = 0;
var parall_ind = 0;

Blockly.Python['sequence'] = function(block) {
  
  var text_sequence_name = block.getFieldValue('sequence_name');
  var text_sequence_out_name = text_sequence_name + "_out";
  var statements_sequence_children_arry = Blockly.Python.statementToCode(block, 'sequence_children').split("\n");

  statements_sequence_children_arry.pop();
  statements_sequence_children ="";
  var child = [];
  for (let index = 0; index < statements_sequence_children_arry.length; index++) {
    child_cur = statements_sequence_children_arry[index];
    child_cur = child_cur.trim();

    if(child_cur.includes("=") || child_cur.includes("add_children")){
      var index1 = child_cur.indexOf("=");
      new_child = child_cur.substring(0,index1);
      new_child = new_child.replace(/\s/g, '');
      while(new_child.includes(".")){
        new_child = new_child.substring(new_child.indexOf(")") + 1,new_child.length);
      }
      if(!(existing_children.includes(new_child)) && new_child != [] && new_child != "pre_condition" && new_child != "name" && new_child != "per_condition" && new_child != "end_condition"){
        child.push(new_child);
      }
      statements_sequence_children += "\n"+"\t"+child_cur;
    }
    else if(child_cur != ""){
      child.push(child_cur);
    }

    
    
  }
  statements_sequence_children += "\n";
 
  // Add sequence declaration
  var output = "\t" + text_sequence_out_name;
  var code = output + " = " + "py_trees.composites.Sequence(" + "\"" + text_sequence_name + "\"" + ")";
  code += statements_sequence_children;

  // Add children to sequence
  if(child.length >0){
    var child_code = "\t" + text_sequence_out_name + ".add_children([";
    for (let index = 0; index < child.length; index++) {
      child_code += child[index] + ", ";
    }
    child_code = child_code.substring(0,child_code.length-2);
    child_code += "]) \n\n";
    code += child_code;
  }

  for (let index = 0; index < child.length; index++) {
    existing_children.push(child[index]);
  }
  
  return code;
};

Blockly.Python['selector'] = function(block) {
  
  var text_selector_name = block.getFieldValue('selector_name');
  var text_selector_out_name = text_selector_name+"_out";
  var statements_selector_children_arry = Blockly.Python.statementToCode(block, 'selector_children').split("\n");

  statements_selector_children_arry.pop();
  statements_selector_children ="";
  var child = [];
  for (let index = 0; index < statements_selector_children_arry.length; index++) {
    child_cur = statements_selector_children_arry[index];
    child_cur = child_cur.trim();

    if(child_cur.includes("=") || child_cur.includes("add_children")){
      var index1 = child_cur.indexOf("=");
      new_child = child_cur.substring(0,index1);
      new_child = new_child.replace(/\s/g, '');
      while(new_child.includes(".")){
        new_child = new_child.substring(new_child.indexOf(")") + 1,new_child.length);
      }
      if(!(existing_children.includes(new_child)) && new_child != [] && new_child != "pre_condition" && new_child != "name" && new_child != "per_condition" && new_child != "end_condition"){
        child.push(new_child);
      }
      statements_selector_children += "\n"+"\t"+child_cur;


    }
    else if(child_cur != ""){
      child.push(child_cur);
    }

    
    
  }
  statements_selector_children += "\n";
  
 
  // Add selector declaration
  var output = "\t" +text_selector_out_name;
  var code = output + " = " + "py_trees.composites.Selector(" + "\"" + text_selector_name + "\"" + ")";
  code += statements_selector_children;

  // Add children to selector
  if(child.length >0){
    var child_code = "\t" + text_selector_out_name + ".add_children([";
    for (let index = 0; index < child.length; index++) {
      child_code += child[index] + ", ";
    }
    child_code = child_code.substring(0,child_code.length-2);
    child_code += "]) \n\n";
    code += child_code;
  }

  for (let index = 0; index < child.length; index++) {
    existing_children.push(child[index]);
  }


  return code;
};

Blockly.Python['condition'] = function(block) {
  var text_condition_name = block.getFieldValue('condition_name');
  // TODO: Assemble Python into code variable.
  var code = text_condition_name + ' \n';
  return code;
};

Blockly.Python['action'] = function(block) {
  var text_action_name = block.getFieldValue('action_name');
  // TODO: Assemble Python into code variable.
  var code = text_action_name + ' \n';
  return code;
};

Blockly.Python['init_node'] = function(block) {
 
  var statements_output_node = Blockly.Python.statementToCode(block, 'output_node');
  
  var import_code = 'import py_trees' + '\n\n';
  var func = 'def _create_root_tree():' + '\n\n';
  var code = import_code + func + "\n" + statements_output_node;

  // find root name
  var statements_output_node_arry = statements_output_node.split("\n");
  var child_cur = statements_output_node_arry[0];
  var index1 = child_cur.indexOf("=");
  new_child = child_cur.substring(0,index1);
  new_child = new_child.replace(/\s/g, '');


  code += "\n\t" + "tree = py_trees.trees.BehaviourTree(root=" + new_child + ") \n" + "\t" + "return tree";

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['parallel'] = function(block) {
  
  var text_parallel_name = block.getFieldValue('parallel_name');
  var text_parallel_out_name = text_parallel_name + "_out";
  var statements_parallel_children_arry = Blockly.Python.statementToCode(block, 'parallel_children').split("\n");
  
  statements_parallel_children_arry.pop();
  statements_parallel_children ="";
  var child = [];
  for (let index = 0; index < statements_parallel_children_arry.length; index++) {
    child_cur = statements_parallel_children_arry[index];
    child_cur = child_cur.trim();

    if(child_cur.includes("=") || child_cur.includes("add_children")){
      var index1 = child_cur.indexOf("=");
      new_child = child_cur.substring(0,index1);
      new_child = new_child.replace(/\s/g, '');
      while(new_child.includes(".")){
        new_child = new_child.substring(new_child.indexOf(")") + 1,new_child.length);
      }
      if(!(existing_children.includes(new_child)) && new_child != []  && new_child != "pre_condition" && new_child != "name" && new_child != "per_condition" && new_child != "end_condition"){
        child.push(new_child);
      }
      statements_parallel_children += "\n"+"\t"+child_cur;
    }
    else if(child_cur != ""){
      child.push(child_cur);
    }

    
    
  }
  statements_parallel_children += "\n";
 
  // Add parallel declaration
  var output = "\t" + text_parallel_out_name;
  var code = output + " = " + "py_trees.composites.Parallel(" + "\"" + text_parallel_name + "\"" + ")";
  code += statements_parallel_children;

  // Add children to parallel
  if(child.length >0){
    var child_code = "\t" + text_parallel_out_name + ".add_children([";
    for (let index = 0; index < child.length; index++) {
      child_code += child[index] + ", ";
    }
    child_code = child_code.substring(0,child_code.length-2);
    child_code += "]) \n\n";
    code += child_code;
  }

  for (let index = 0; index < child.length; index++) {
    existing_children.push(child[index]);
  }
  
  return code;
};

Blockly.Python['bt_action'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_pre = Blockly.Python.valueToCode(block, 'pre', Blockly.Python.ORDER_ATOMIC);
  var value_per = Blockly.Python.valueToCode(block, 'per', Blockly.Python.ORDER_ATOMIC);
  var value_end = Blockly.Python.valueToCode(block, 'end', Blockly.Python.ORDER_ATOMIC);
  
  var code = text_name + "_act" + " = ExecuteAction(" + "\n\t";
  action_ind += 1;
  code += "name = '" + text_name + "',\n\t";
  code += "pre_condition = " + value_pre + ",\n\t";
  code += "per_condition = " + value_per + ",\n\t";
  code += "end_condition = " + value_end + ");\n\t";
  return code;
};
