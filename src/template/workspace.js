/**
 * @fileoverview 
 * @author Anil Agarwal
 */

/* Inject workspace */ 
var workspace = Blockly.inject(blocklyDiv, options);
Blockly.svgResize(workspace);

toggleCodeView = function() {
	currentSize = split.getSizes();
	if (currentSize && currentSize[1] > 0.5) {
		lastSize = currentSize;
		split.setSizes([100, 0]);
		document.getElementById("codeViewToggle").textContent = 'View';
	}
	else {
		split.setSizes(lastSize);
		document.getElementById("codeViewToggle").textContent = 'Hide';
	}
	Blockly.svgResize(workspace);
}

/* Load Workspace Blocks from XML to workspace. */
var workspaceBlocks = document.getElementById("workspaceBlocks"); 
if (workspaceBlocks != null) {
	Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
}

/* Update the download filename placeholder text with the (first) domain name. */
/* TODO: (Optional) Replace logic to dynamically update the download filename placeholder */
// function updateExportCodeFilenamePlaceholder(event) {
// 	if (Blockly.Events.BLOCK_CHANGE === event.type
// 		|| Blockly.Events.BLOCK_CREATE === event.type
// 		|| Blockly.Events.BLOCK_DELETE === event.type) {
// 		var domain_blocks = workspace.getBlocksByType('pddl_domain');
// 		var exportFilenameElement = document.getElementById('exportCodeFilename');
// 		var saveFilenameElement = document.getElementById('saveWorkspaceFilename');
// 		if (0 < domain_blocks.length) {
// 			exportFilenameElement.placeholder = domain_blocks[0].getFieldValue('DOMAIN_NAME');
// 			saveFilenameElement.placeholder = domain_blocks[0].getFieldValue('DOMAIN_NAME') + '_workspace';
// 		}
// 	}
// }
// workspace.addChangeListener(updateExportCodeFilenamePlaceholder);

/* TODO: Register the callback for the dynamic toolbox flyout category. */
// if (Blockly.Predicates && Blockly.Predicates.flyoutCategory) {
//     workspace.registerToolboxCategoryCallback("DYNAMIC_CATEGORY",
//         Blockly.Predicates.flyoutCategory);
// }

/* Function to convert the workspace blocks into code and trigger download. */
function exportCodeFromWorkspace() {
	/* TODO: Replace JavaScript with the appropriate generator */
	Blockly.JavaScript.init(workspace);

	var filename = document.getElementById('exportCodeFilename').value;
	if (null === filename || '' === filename) {
		filename = document.getElementById("exportCodeFilename").placeholder;
	}
	/* TODO: Replace "code" with the appropriate file extension for downloading code */
	filename += '.code';
	var code = Blockly.JavaScript.workspaceToCode(workspace);

	writeToFileAndDownload(filename, code);
}
