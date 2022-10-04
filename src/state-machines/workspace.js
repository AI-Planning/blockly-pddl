/**
 * @fileoverview 
 * @author Naman Bhatia, Anil Agarwal
 */

var toolbox = document.getElementById("toolbox");

var options = {
	toolbox: toolbox,
	collapse: true,
	comments: true,
	disable: true,
	maxBlocks: Infinity,
	trashcan: true,
	horizontalLayout: false,
	toolboxPosition: 'start',
	css: true,
	media: '../../lib/google-blockly-v8.0.5/media/',
	rtl: false,
	scrollbars: true,
	sounds: true,
	oneBasedIndex: false,
	grid: {
		spacing: 20,
		length: 1,
		colour: '#888',
		snap: false
	},
	zoom: {
		controls: true,
		wheel: true,
		startScale: 0.9,
		maxScale: 3,
		minScale: 0.3,
		scaleSpeed: 1.2
	}
};

var functions_1 = [['', '']];
var functions_2 = [['', '']];
var meta_Data = [''];

/* Inject workspace */
var workspace = Blockly.inject(blocklyDiv, options);

/* Load Workspace Blocks from XML to workspace. */
// var workspaceBlocks = document.getElementById("workspaceBlocks"); 
// Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

/* Update the download filename placeholder text with the (first) domain name. */
/* TODO: (Optional) Replace logic to dynamically update the download filename placeholder */
function updateExportCodeFilenamePlaceholder(event) {
	if (Blockly.Events.BLOCK_CHANGE === event.type
		|| Blockly.Events.BLOCK_CREATE === event.type
		|| Blockly.Events.BLOCK_DELETE === event.type) {
		var machine_blocks = workspace.getBlocksByType('machine');
		var saveWorkspaceFilenameElement = document.getElementById('saveWorkspaceFilename');
		var exportCodeFilenameElement = document.getElementById('exportCodeFilename');
		if (0 < machine_blocks.length) {
			exportCodeFilenameElement.placeholder = machine_blocks[0].getFieldValue('sm_name');
			saveWorkspaceFilenameElement.placeholder = machine_blocks[0].getFieldValue('sm_name') + 'Workspace';
		}
	}
}
workspace.addChangeListener(updateExportCodeFilenamePlaceholder);

/* Function to convert the workspace blocks into code and trigger download. */
function exportCodeFromWorkspace() {
	Blockly.JavaScript.init(workspace);

	var filename = document.getElementById('exportCodeFilename').value;
	if (null === filename || '' === filename) {
		filename = document.getElementById("exportCodeFilename").placeholder;
	}
	/* TODO: Replace "txt" with the appropriate file extension for downloading code */
	filename += '.txt';

	var code = getEntryFunctions();
	code += getInputFunctions();
	code += getTicksInfo();
	code += getTransitionDefinitions();
	code += getScriptForInitialFinalState();
	code += Blockly.JavaScript.workspaceToCode(workspace);

	writeToFileAndDownload(filename, code);
}

workspace.isNameUsed = function (name, workspace, opt_exclude) {
	var blocks = workspace.getAllBlocks(false);
	// Iterate through every block and check the name.
	for (var i = 0; i < blocks.length; i++) {
		if (blocks[i] == opt_exclude) {
			continue;
		}
		if (blocks[i].getFieldValue('state_id')
			&& Blockly.Names.equals(blocks[i].getFieldValue('state_id'), name)
			&& (blocks[i].type == opt_exclude.type)) {
			return true;
		}
		if (blocks[i].getFieldValue('state_description')
			&& Blockly.Names.equals(blocks[i].getFieldValue('state_description'), name)
			&& (blocks[i].type == opt_exclude.type)) {
			return true;
		}

	}
	return false;
};

/**
 * Display predefined Functions
 */
function getEntryFunctions() {

	var code = '#Entry Functions:\n' + '#-------------------------------------------------------------------------------------------------------------------\n';
	code += '# F_entry  |	                	Action	                 	|			Parameter			\n';
	code += '#-------------------------------------------------------------------------------------------------------------------\n';
	for (let i = 1; i < functions_2.length; i++) {
		code += '#\t' + (i - 1) + '	' + '|  ' + functions_2[i] + '			' + '	| 	' + meta_Data[i] + '\n';
	}
	code += '#-------------------------------------------------------------------------------------------------------------------\n';
	return code;
}

/**
 * Display predefined Input Functions
 * Generates input functions table for the reference
 */
function getInputFunctions() {

	var code = '\n#Input Functions:\n' + '#-------------------------------------------------------------------------------------------------------------------\n';
	code += '# F_input  |	                	Action	                 	|			Parameter			\n';
	code += '#-------------------------------------------------------------------------------------------------------------------\n';
	for (let i = functions_2.length; i < functions_2.length + functions_1.length - 1; i++) {
		code += '#\t' + (i - functions_2.length) + '	' + '|  ' + functions_1[i - functions_2.length + 1] + '			' + '	| 	' + meta_Data[i - 1] + '\n';
	}
	code += '#-------------------------------------------------------------------------------------------------------------------\n';

	return code;
}

/**
 * Transition Defnitions
 * Generates transitions defininations table for the reference
 */
function getTransitionDefinitions() {

	var code = '\n# States and transitions descriptions\n# By design of the Input functions, they return 4 values \n# 0 - stay in same state\n# 1 - continue, expected outcome occurred\n';
	code += '# 2 - timeout occurred\n# 3 - command received to stop operation\n# 4 - fault occurred\n';
	code += '#-------------------------------------------------------------------------------------------------------------------\n';
	return code;
}

/**
 * Initial and Final State 
 * Displays the denotion and definition for the initial and final state 
 */
function getScriptForInitialFinalState() {

	var states = workspace.getBlocksByType('state', false);
	var start = '';
	var end = '';
	// Iterate through every block and check the state stype.
	for (var i = 0; i < states.length; i++) {
		if (states[i].getFieldValue('type')
			&& states[i].getFieldValue('type') == 'starting') {
			start = states[i].getFieldValue('state_id');
		}
		if (states[i].getFieldValue('type')
			&& states[i].getFieldValue('type') == 'ending') {
			end = states[i].getFieldValue('state_id');
		}
	}

	var code = '# Start state Q_0 \n'
	code += 'q_0 ' + start + '\n';
	code += '#Final state F\n';
	code += 'F ' + end + '\n';
	code += '#-------------------------------------------------------------------------------------------------------------------\n';

	console.log('starting state is ' + start);
	console.log('ending state is ' + end);

	return code;
}

/**
 * Ticks Information 
 * Displays the ticks information vs timeout assumed
 */
function getTicksInfo() {
	var code = '# Timer function assumes ticks of size ' + meta_Data[functions_2.length + functions_1.length - 2] + '\n';
	code += '# A 10min delay/timeout is as follows: \n';
	code += '# 10[min] * 60[s]  / 0.1[s/tick]  = 6000 \n';
	code += '#-------------------------------------------------------------------------------------------------------------------\n';
	return code;
}

/**
 * Upload Bag of Functions
 * Loads a sample file with functions provided by the user
 * @param none
 * @private
 */
function loadFunctions() {
	// workspace.clear();

	//finds the file given the id "functionsFileInput" in index.html
	var file = document.getElementById("functionsFileInput").files[0];
	var reader = new FileReader();
	reader.onload = function () {
		//loads the bag of functions from the user inputted file
		var text = reader.result;
		const regex = /\bs+(_Input)+[_a-zA-Z]*/g;
		let found = text.match(regex);
		const regex2 = /\bs+(_Entry)+[_a-zA-Z]*/g;
		let found2 = text.match(regex2);
		var groups = text.split('//tgroup')
		// console.log(groups);
		var lines = text.split('\n');
		let index = 0;
		for (let i = 0; i < lines.length; i++) {
			let temp = lines[i];
			var start = temp.indexOf("//ttag");
			if (start != -1) {
				let comment = temp.substr(start + 9);
				meta_Data[index] = comment;
				index++;
				// console.log(meta_Data);
				// let vars = comment.split(':');
				// console.log(vars[1]);
			}
		}
		// console.log(lines);


		const hashSet1 = new Set();
		const hashSet2 = new Set();

		let arr = new Array();

		for (let i = 0; i < found.length; i++) {
			if (!hashSet1.has(found[i])) {
				hashSet1.add(found[i]);
				arr.push(found[i].substring(8));
				arr.push(i.toString());
				functions_1.push(arr);
				arr = [];
			}
		}

		for (let i = 0; i < found2.length; i++) {
			if (!hashSet2.has(found2[i])) {
				hashSet2.add(found2[i]);
				arr.push(found2[i].substring(8));
				arr.push(i.toString());
				functions_2.push(arr);
				arr = [];
			}
		}
		// console.log(functions_1);
		// console.log(functions_2);
	}
	reader.readAsText(file);
	//removes the selected id from the file that has just been processed
	document.getElementById("functionsFileInput").value = "";
}
