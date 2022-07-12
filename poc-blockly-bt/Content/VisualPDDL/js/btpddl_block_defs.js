'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

  // Selector composite UI 
Blockly.Blocks['sequence_BT'] = {
    init: function() {
      // sequence composite behaviour name
      this.appendDummyInput()
        .appendField("sequence")  
        .appendField(new Blockly.FieldTextInput("name"), "NAME")
      // sequence memory input UI
      // when enabled if Tree RUNNING on the previous tick, resumes with the RUNNING child
      this.appendDummyInput()
        .appendField('memory')
        .appendField(new Blockly.FieldDropdown([
            ['EN', 'EN_MEM'],
            ['DIS', 'DIS_MEM']
        ]), 'MEMORY');
      //  list of children to add in sequence
      this.appendStatementInput("child")
        .appendField("childs")
        .setCheck("child");
      this.setPreviousStatement(true, "child");
      this.setNextStatement(true, "child");
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['condition_BT'] = {
    init: function() {
      this.appendStatementInput("PREDICATE_CALLS")
          .setCheck("predicate_call")
          .appendField("condition");
      this.setPreviousStatement(true, "predicate_call");
      this.setNextStatement(true, "predicate_call");
      this.setColour(120);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['action_BT'] = {
    init: function() {
      this.appendStatementInput("PREDICATE_CALLS")
          .setCheck("predicate_call")
          .appendField("action");
      this.setPreviousStatement(true, "predicate_call");
      this.setNextStatement(true, "predicate_call");
      this.setColour(0);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  // Selector composite UI 
  Blockly.Blocks['selector_BT'] = {
    init: function() {
      // selector composite behaviour name
      this.appendDummyInput()
        .appendField("selector")  
        .appendField(new Blockly.FieldTextInput("name"), "NAME")
      // selector memory input UI
      // when enabled if Tree RUNNING on the previous tick, resumes with the RUNNING child
      this.appendDummyInput()
        .appendField('memory')
        .appendField(new Blockly.FieldDropdown([
            ['EN', 'EN_MEM'],
            ['DIS', 'DIS_MEM']
        ]), 'MEMORY');
      //  list of children to add
      this.appendStatementInput("child")
        .appendField("childs")
        .setCheck("child");
      this.setPreviousStatement(true, "child");
      this.setNextStatement(true, "child");
      this.setColour(60);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

    // Parallel composite UI 
    Blockly.Blocks['parallel_BT'] = {
      init: function() {
        // parallel composite behaviour name
        this.appendDummyInput()
          .appendField("parallel")  
          .appendField(new Blockly.FieldTextInput("name"), "NAME");
        this.appendDummyInput()
          .appendField('policy')
          .appendField(new Blockly.FieldDropdown([
              ['optional', 'OP_POLICY'],
              ['base', 'B_POLICY']
          ]), 'POLICCY');
        //  list of children to add
        this.appendStatementInput("child")
          .appendField("childs")
          .setCheck("child");
        this.setPreviousStatement(true, "child");
        this.setNextStatement(true, "child");
        this.setColour(180);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };