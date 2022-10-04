var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : true, 
	disable : true, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : '../../lib/google-blockly-v8.0.5/media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : false, 
	grid : {
		spacing : 20, 
		length : 1, 
		colour : '#888', 
		snap : false
	}, 
	zoom : {
		controls : true, 
		wheel : true, 
		startScale : 0.9, 
		maxScale : 3, 
		minScale : 0.3, 
		scaleSpeed : 1.2
	}
};

/* Inject workspace */ 
var workspace = Blockly.inject(blocklyDiv, options);

/* Load Workspace Blocks from XML to workspace. */
var workspaceBlocks = document.getElementById("workspaceBlocks"); 
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

/* Update the download filename placeholder text with the (first) domain name. */
/* TODO: (Optional) Replace logic to dynamically update the download filename placeholder */
// function updateDownloadFilenamePlaceholder(event) {
// 	if (Blockly.Events.BLOCK_CHANGE === event.type 
// 		|| Blockly.Events.BLOCK_CREATE === event.type 
// 		|| Blockly.Events.BLOCK_DELETE === event.type) {
// 			var domain_blocks = workspace.getBlocksByType('pddl_domain');
// 			var filenameElement = document.getElementById('downloadFilename');
// 			if (0 < domain_blocks.length)
// 				filenameElement.placeholder = domain_blocks[0].getFieldValue('DOMAIN_NAME');
// 		}
// }
// workspace.addChangeListener(updateDownloadFilenamePlaceholder);

/* TODO: Register the callback for the dynamic toolbox flyout category. */
// if (Blockly.Predicates && Blockly.Predicates.flyoutCategory) {
//     workspace.registerToolboxCategoryCallback("DYNAMIC_CATEGORY",
//         Blockly.Predicates.flyoutCategory);
// }

/* Function to convert the workspace blocks into code and trigger download. */
function downloadCode() {
	/* TODO: Replace JavaScript with the appropriate generator */
	Blockly.JavaScript.init(workspace);

	var filename = document.getElementById('downloadFilename').value;
	if (null === filename || '' === filename) {
		filename = document.getElementById("downloadFilename").placeholder;
	}
	/* TODO: Replace "code" with the appropriate file extension for downloading code */
	filename += '.code';
	var code = Blockly.JavaScript.workspaceToCode(workspace);

	writeToFileAndDownload(filename, code);
}
