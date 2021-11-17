/**
 * This file initializes the setup for VisualPDDL
 *
 * MODIFIED:
 *    By team of VisualPDDL project (JUN-2021)
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


var workspace_pddl_types = [['object','object']];

workspace.isNameUsed = function(name, workspace, opt_exclude) {
	var blocks = workspace.getAllBlocks(false);
	// Iterate through every block and check the name.
	for (var i = 0; i < blocks.length; i++) {
	  if (blocks[i] == opt_exclude) {
		continue;
	  }
	  if (blocks[i].getFieldValue('NAME')
	  		&& Blockly.Names.equals(blocks[i].getFieldValue('NAME'), name)
		  	&& (blocks[i].type == opt_exclude.type)) {
		  return true;
	  }
	}
	return false;
};

// predicatesFlyoutCallback = function(workspace) {
// 	console.log('predicatesFlyoutCallback');
// 	var xmlBlocksList = [];
// 	if (Blockly.Blocks['predicate_def']) {
// 		var blockText = '<block type="predicate_def">' +
// 			'<field name="NAME">predicate_name</field>' +
// 			'</block>';
// 		var block = Blockly.Xml.textToDom(blockText);
// 		xmlBlocksList.push(block);
// 	}
// 	return xmlBlocksList;
// }
// workspace.registerToolboxCategoryCallback('PREDICATES', predicatesFlyoutCallback);

if (Blockly.Predicates && Blockly.Predicates.flyoutCategory) {
    workspace.registerToolboxCategoryCallback("PREDICATES",
        Blockly.Predicates.flyoutCategory);
	// workspace.addChangeListener(Blockly.Predicates.mutatorOpenListener);
}
// function updateTypesList(event) {
// 	if (event.type == 'change') {
// 	  alert('block change event');
// 	  workspace.removeChangeListener(updateTypesList);
// 	}
// }
// workspace.addChangeListener(updateTypesList);

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
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	var textWindow = window.open("", "MsgWindow", "width=500, height=400");		// establishes window size
	textWindow.document.body.innerHTML = "<div style=\"white-space:pre-wrap\">" + code + "</div>";	// formats window
	// console.log(code);		// writes the message contained in "code" to the console, useful for testing
}
