/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse: true,
	comments: true,
	disable: true,
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars: true,
	sounds : true, 
	oneBasedIndex : false, 
	grid : {
		spacing : 20, 
		length : 1, 
		colour : '#888', 
		snap : true
	}, 
	zoom : {
		controls : true, 
		wheel : false, 
		startScale : 1, 
		maxScale : 3, 
		minScale : 0.3, 
		scaleSpeed : 1.2
	}
};

/* Inject your workspace */ 
var workspace = Blockly.inject(blocklyDiv, options);

/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
// var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. */
// Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);


var workspace_pddl_types = [['object','object']];

predicatesFlyoutCallback = function(workspace) {
	console.log('predicatesFlyoutCallback');
	var xmlBlocksList = [];
	if (Blockly.Blocks['predicate_def']) {
		var blockText = '<block type="predicate_def">' +
			'<field name="NAME">predicate_name</field>' +
			'</block>';
		var block = Blockly.Xml.textToDom(blockText);
		xmlBlocksList.push(block);
	}
	return xmlBlocksList;
}
workspace.registerToolboxCategoryCallback('PREDICATES', predicatesFlyoutCallback);

// function updateTypesList(event) {
// 	if (event.type == 'change') {
// 	  alert('block change event');
// 	  workspace.removeChangeListener(updateTypesList);
// 	}
// }
// workspace.addChangeListener(updateTypesList);