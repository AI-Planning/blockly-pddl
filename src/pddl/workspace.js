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

/* Inject workspace */
var workspace = Blockly.inject(blocklyDiv, options);

/* Load Workspace Blocks from XML to workspace. */
var workspaceBlocks = document.getElementById("workspaceBlocks");
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);


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

var split = Split(['#flex-1', '#flex-2'], {
	gutterSize: 5,
	minSize: [500, 0],
	elementStyle: function (dimension, size, gutterSize) {
		return {
			'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)',
		}
	},
	gutterStyle: function (dimension, gutterSize) {
		return {
			'flex-basis': gutterSize + 'px',
		}
	},
	onDrag: function (sizes) {
		Blockly.svgResize(workspace);
	}
})
Blockly.svgResize(workspace);

lastSize = split.getSizes();
toggleCodeView = function() {
	currentSize = split.getSizes();
	console.log(currentSize);
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

/* Function to convert the workspace blocks into code and trigger download. */
function exportCodeFromWorkspace() {
	Blockly.PDDL.init(workspace);
	var domain_blocks = workspace.getBlocksByType('pddl_domain');
	var filename = document.getElementById('exportCodeFilename').value;
	if (null === filename || '' === filename) {
		filename = domain_blocks[0].getFieldValue('DOMAIN_NAME');
	}
	filename += '.pddl';
	var code = '';
	for (var i = 0; i < domain_blocks.length; i++) {
		code += Blockly.PDDL.blockToCode(domain_blocks[i], false);
	}

	writeToFileAndDownload(filename, code);
}
