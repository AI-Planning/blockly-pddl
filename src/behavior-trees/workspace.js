/**
 * @fileoverview 
 * @author Anil Agarwal
 */

/* Inject workspace */ 
var workspace = Blockly.inject(blocklyDiv, options);
Blockly.svgResize(workspace);

/* Load Workspace Blocks from XML to workspace. */
var workspaceBlocks = document.getElementById("workspaceBlocks"); 
if (workspaceBlocks != null) {
	Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
}

workspace.addChangeListener(updateWorkspaceCodeViewerListener);
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

generateCodeFromWorkspace = function() {
	/* TODO: Replace JavaScript with the appropriate generator */
	Blockly.Python.init(workspace);

	existing_children = [];
	action_ind = 0;
	seq_ind = 0;
	sel_ind = 0;
	parall_ind = 0;
	var code = Blockly.Python.workspaceToCode(workspace);

	return code;
}

/* Function to convert the workspace blocks into code and trigger download. */
function exportCodeFromWorkspace() {

	var filename = document.getElementById('exportCodeFilename').value;
	if (null === filename || '' === filename) {
		filename = document.getElementById("exportCodeFilename").placeholder;
	}
	/* TODO: Replace ".js" with the appropriate file extension for downloading code */
	filename += '.py';

	writeToFileAndDownload(filename, generateCodeFromWorkspace());
}
