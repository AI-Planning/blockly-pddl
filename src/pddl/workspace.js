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

/* Disable toolbox flyout auto close. */
flyout = workspace.getFlyout();
flyout.autoClose = false;

/* The toolbox flyouts refresh when they are opened.
   Since auto close is disabled, refresh it on every event. */
function refreshToolbox(event) {
	workspace.getToolbox().refreshSelection();
}
workspace.addChangeListener(refreshToolbox);

/* Update the download filename placeholder text with the (first) domain name. */
function updateExportCodeFilenamePlaceholder(event) {
	if (Blockly.Events.BLOCK_CHANGE === event.type
		|| Blockly.Events.BLOCK_CREATE === event.type
		|| Blockly.Events.BLOCK_DELETE === event.type) {
		var domain_blocks = workspace.getBlocksByType('pddl_domain');
		var exportFilenameElement = document.getElementById('exportCodeFilename');
		var saveFilenameElement = document.getElementById('saveWorkspaceFilename');
		if (0 < domain_blocks.length) {
			exportFilenameElement.placeholder = domain_blocks[0].getFieldValue('DOMAIN_NAME');
			saveFilenameElement.placeholder = domain_blocks[0].getFieldValue('DOMAIN_NAME') + '_workspace';
		}
	}
}
workspace.addChangeListener(updateExportCodeFilenamePlaceholder);

/* Register the callback for the PDDL Variables toolbox flyout category. */
if (Blockly.Predicates && Blockly.Predicates.flyoutCategory) {
	workspace.registerToolboxCategoryCallback("PDDL_VARIABLES",
		Blockly.Predicates.flyoutCategory);
}

/* Default types for the workspace. */
/* TODO: Move to block_defs.js */
var workspace_pddl_types = [['object', 'object']];

/* Helper function to generate warnings for blocks with duplicate names. */
workspace.isNameUsed = function (name, workspace, opt_exclude) {
	var blocks = workspace.getAllBlocks(false);
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

generateCodeFromWorkspace = function() {
	Blockly.PDDL.init(workspace);
	var code = '';
	var domain_blocks = workspace.getBlocksByType('pddl_domain');
	for (var i = 0; i < domain_blocks.length; i++) {
		code += Blockly.PDDL.blockToCode(domain_blocks[i], false);
	}
	return code;
}

/* Function to convert the workspace blocks into code and trigger download. */
function exportCodeFromWorkspace() {
	var domain_blocks = workspace.getBlocksByType('pddl_domain');
	var filename = document.getElementById('exportCodeFilename').value;
	if (null === filename || '' === filename) {
		filename = domain_blocks[0].getFieldValue('DOMAIN_NAME');
	}
	filename += '.pddl';
	
	writeToFileAndDownload(filename, generateCodeFromWorkspace());
}
