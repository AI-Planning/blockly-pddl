/**
 * This file initializes the setup for DFA-Studio
 *
 * MODIFIED:
 *    By team of DFA-Studio project (JUN-2022)
 *
 * ORIGIN:
 *    Apache 2.0 License - Copyright 2020 Misty Robotics
 *    Created/Revised April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson 
 *
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
	media: 'https://blockly-demo.appspot.com/static/media/',
	rtl: false,
	scrollbars: true,
	sounds: true,
	oneBasedIndex: false,
	grid: {
		spacing: 20,
		length: 1,
		colour: '#888',
		snap: true
	},
	zoom: {
		controls: true,
		wheel: false,
		startScale: 1,
		maxScale: 3,
		minScale: 0.3,
		scaleSpeed: 1.2
	}
};

/* Inject your workspace */
var workspace = Blockly.inject(blocklyDiv, options);

flyout = workspace.getFlyout();
flyout.autoClose = false;

/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
// var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. */
// Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);


var workspace_pddl_types = [['object', 'object']];
var functions_1 = [['', '']];
var functions_2 = [['', '']];
var meta_Data = [''];

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

// if (Blockly.Predicates && Blockly.Predicates.flyoutCategory) {
// 	workspace.registerToolboxCategoryCallback("PREDICATES",
// 		Blockly.Predicates.flyoutCategory);
// 	// workspace.addChangeListener(Blockly.Predicates.mutatorOpenListener);
// }

/**
 * $(document).ready
 * This block of code won't run until jQuery detects that the document is "ready"
 * Deals with the initial set up of the misty blockly site.
 */
$(document).ready(function () {
	bindEvents();
	disableButtons();
	enableButtons();
});

/**
 * bindEvents
 * This function removes and reassigns event handlers for specific HTML elements upon webpage creation to make the page work
 * @private
 */
function bindEvents() {
	// .unbind() removes a previously attached event handler from the selected element
	// .on() attaches an event handler function for one or more events to the selected element

	// Remove the previously attached click event handler attached to the element with id="browse-files"
	$("#browse-files").unbind('click').on('click', openFilePicker);
	$("#browse-function-files").unbind('click').on('click', openFunctionFilePicker);

	// Attach a new click event handler to the element with id="show-javascript" that will execute the showJavaScript() function every time the element is clicked
	$("#show-javascript").on('click', showJavaScript);
}


/**
 * disableButtons
 * Disable the following buttons: show-javascript, browse-files, export-session, help
 * @private
 */
function disableButtons() {
	// Disable the button with id="browse-files" by giving it the CSS class "disabled"
	$("#browse-files").addClass("disabled");

	// Disable the button with id="browse-function-files" by giving it the CSS class "disabled"
	$("#browse-function-files").addClass("disabled");

	// Disable the button with id="export-session" by giving it the CSS class "disabled"
	$("#export-session").addClass("disabled");

	// Disable the button with id="show-javascript" by giving it the CSS class "disabled"
	$("#show-javascript").addClass("disabled");

	// Disable the button with id="help" by giving it the CSS class "disabled"
	$("#help").addClass("disabled");
}


/**
 * enableButtons
 * Enable the following buttons: show-javascript, browse-files, export-session, help
 * @private
 */
function enableButtons() {
	// Enable the button with id="browse-files" by giving it the CSS class "disabled"
	$("#browse-files").removeClass("disabled");

	$("#browse-function-files").removeClass("disabled");

	// Enable the button with id="export-session" by giving it the CSS class "disabled"
	$("#export-session").removeClass("disabled");

	// Enable the button with id="show-javascript" by giving it the CSS class "disabled"
	$("#show-javascript").removeClass("disabled");

	// Enable the button with id="export-session" by giving it the CSS class "disabled"
	$("#help").removeClass("disabled");
}


/**
 * openFilePicker
 * Opens a dialog for the user to select a file
 * @param none
 * @private
 */
function openFilePicker() {
	console.log("triggered openFilePicker");
	//allows the user to select a file and assigns the file with the fileSelected id
	$("input#fileSelected").trigger("click");
}

/**
* openFunctionFilePicker
* Opens a dialog for the user to select a file
* @param none
* @private
*/
function openFunctionFilePicker() {
	console.log("triggered openFunctionFilePicker");
	//allows the user to select a file and assigns the file with the fileSelected id
	$("input#function-file").trigger("click");
}


/**
 * uploadBlocklyFile
 * Loads a blockly file provided by the user
 * @param none
 * @private
 */
function uploadBlocklyFile() {
	workspace.clear();

	//finds the file given the id "fileSelected" in index.html, only accepts .txt files
	var file = document.getElementById("fileSelected").files[0];
	var reader = new FileReader();
	reader.onload = function () {
		//loads the blockly blocks from the user inputted file
		var text = reader.result;
		var xml = Blockly.Xml.textToDom(text);
		//adds the blocks to the workspace
		Blockly.Xml.domToWorkspace(xml, workspace);
	};
	reader.readAsText(file);
	//removes the selected id from the file that has just been processed
	document.getElementById("fileSelected").value = "";
}

/**
 * exportBlocklySession
 * Converts the blockly file to plain text and saves it
 * @private
 */
function exportBlocklySession() {
	var name = window.prompt("Enter a filename:", "blockly");
	if (name == null)
		return;
	name += ".txt";
	var xml = Blockly.Xml.workspaceToDom(workspace);	// encodes the block block tree (blocks contained in "workspace") to XML
	var text = Blockly.Xml.domToText(xml);	// converts a DOM structure (tree of XML nodes in "xml") into plain text
	if (text.length === 0) {
		window.alert("There is nothing to save");
		return;
	}
	download(name, text);
}

/**
 * download
 * Takes the user's blocks in the browser, creates JavaScript code based on those blocks, and downloads/saves it to the client
 * @param {String} filename the file we wish to download
 * @param {String} text plain text version of XML nodes
 * @private
 */
function download(filename, text) {
	if (window.navigator.userAgent.indexOf("Edge") > -1) {
		// a Blob is a file-like object of immutable, raw data
		var blob = new Blob([text], { type: "text/plain" }); 	// creates a Blob object of plain text
		window.navigator.msSaveOrOpenBlob(blob, "blockly.txt");
	} else {	// case where "Edge" is never found in the string userAgent
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);		// adds the new element just created as a child of the html body

		element.click();	// simulates a click when the user moves the mouse over the element
		document.body.removeChild(element);		// removes that new element from the body when users mouse is over it
	}
}

/**
 * showJavaScript
 * Generates JavaScript from ther user's blockly program and displays it
 * @private
 */
function showJavaScript() {

	var code = getEntryFunctions();
	code += getInputFunctions();
	code += getTicksInfo();
	code += getTransitionDefinitions();
	code += getScriptForInitialFinalState();
	code += Blockly.JavaScript.workspaceToCode(workspace);
	var textWindow = window.open("", "MsgWindow", "width=500, height=400");		// establishes window size
	console.log(code);
	textWindow.document.body.innerHTML = "<div style=\"white-space:pre-wrap\">" + code + "</div>";	// formats window
	// console.log(code);		// writes the message contained in "code" to the console, useful for testing
}

/**
 * Display predefined Functions
 */
 function getEntryFunctions() {

	var code = '#Entry Functions:\n' + '#-------------------------------------------------------------------------------------------------------------------\n';
	code += '# F_entry  |	                	Action	                 	|			Parameter			\n';		
	code += '#-------------------------------------------------------------------------------------------------------------------\n';
	for(let i=1;i<functions_2.length;i++){
		code += '#\t' + (i-1) + '	' + '|  ' + functions_2[i] + '			' + '	| 	' +  meta_Data[i] +'\n';
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
	for(let i=functions_2.length;i<functions_2.length+functions_1.length-1;i++){
		code += '#\t' + (i-functions_2.length) + '	' + '|  ' + functions_1[i-functions_2.length+1] + '			' + '	| 	' +  meta_Data[i-1] + '\n';
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

	var states = workspace.getBlocksByType('state',false);
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
	code += 'q_0 ' + start +'\n';
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
	var code = '# Timer function assumes ticks of size ' + meta_Data[functions_2.length+functions_1.length-2] + '\n';
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
function uploadBagOfFunctions() {
	workspace.clear();

	//finds the file given the id "fileSelected" in index.html
	var file = document.getElementById("function-file").files[0];
	var reader = new FileReader();
	reader.onload = function () {
		//loads the bag of functions from the user inputted file
		var text = reader.result;
		const regex = /\bs+(_Input)+[_a-zA-Z]*/g;
		let found = text.match(regex);
		const regex2 = /\bs+(_Entry)+[_a-zA-Z]*/g;
		let found2 = text.match(regex2);
		var groups = text.split('//tgroup')
		console.log(groups);
		var lines = text.split('\n');
		let index = 0;
		for (let i = 0; i < lines.length; i++) {
			let temp = lines[i];
			var start = temp.indexOf("//ttag");
			if (start != -1) {
				let comment = temp.substr(start+9);
				meta_Data[index] = comment;
				index++;
				console.log(meta_Data);
				// let vars = comment.split(':');
				// console.log(vars[1]);
			}
		}
		console.log(lines);


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
		console.log(functions_1);
		console.log(functions_2);
	}
	reader.readAsText(file);
	//removes the selected id from the file that has just been processed
	document.getElementById("function-file").value = "";
}
