/**
 * @fileoverview 
 * @author Anil Agarwal
 */

var toolbox = document.getElementById('toolbox');

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

var split = Split(['#flex-1', '#flex-2'], {
    sizes: [60, 40],
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
	onDrag: function () {
		Blockly.svgResize(workspace);
	},
	onDragEnd: function (sizes) {
        if (sizes[1] < 2) {
			hideCodeViewer();
        }
        else {
			unhideCodeViewer();
        }
	}
})

lastSize = split.getSizes();

updateWorkspaceCodeViewer = function() {
	var code = generateCodeFromWorkspace();
	
	var encodedStr = code.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
		return '&#'+i.charCodeAt(0)+';'; 
	});

	var p = document.createElement('p');
	p.appendChild(document.createTextNode(encodedStr));
	document.getElementById('workspaceCodeViewer').textContent = p.innerHTML;
}

updateWorkspaceCodeViewerListener = function(event) {
	if (event && false == event.isUiEvent) {
		updateWorkspaceCodeViewer();
	}
}

toggleCodeView = function() {
	currentSize = split.getSizes();
	if (currentSize && currentSize[1] > 0.5) {
		lastSize = currentSize;
		hideCodeViewer();
	}
	else {
		split.setSizes(lastSize);
		unhideCodeViewer();
	}
	Blockly.svgResize(workspace);
}

hideCodeViewer = function() {
	document.getElementById('workspaceCodePre').hidden = true;
	split.setSizes([100, 0]);
	document.getElementById("codeViewToggle").textContent = 'View';
	workspace.removeChangeListener(updateWorkspaceCodeViewerListener);
}

unhideCodeViewer = function() {
	document.getElementById('workspaceCodePre').hidden = false;
	document.getElementById("codeViewToggle").textContent = 'Hide';
	workspace.addChangeListener(updateWorkspaceCodeViewerListener);
	updateWorkspaceCodeViewer();
}

/**
 * writeToFileAndDownload
 * Write text to a file and trigger download
 */
function writeToFileAndDownload(filename, content) {
    var b = new Blob([content], { type: 'text/plain' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(b);
    a.download = filename;
    a.click();
}

/**
 * loadWorkspace
 * Loads a workspace file with blockly XML
 */
function loadWorkspace() {
    // TODO: Alert user that workspace will be cleared and ask for confirmation
    workspace.clear();

    var file = document.getElementById('workspaceFileInput').files[0];
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var xml = Blockly.Xml.textToDom(text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    };
    reader.readAsText(file);
    document.getElementById('workspaceFileInput').value = '';
}

/**
 * saveWorkspace
 * Saves the blockly workspace as XML and triggers a download.
 */
function saveWorkspace() {
    var filename = document.getElementById('saveWorkspaceFilename').value;
    if (null === filename || '' === filename) {
        filename = document.getElementById('saveWorkspaceFilename').placeholder;
    }
    filename += '.xml';

    var xml = Blockly.Xml.workspaceToDom(workspace);
    var workspaceXml = Blockly.Xml.domToPrettyText(xml);
    // TODO: Alert user if workspace is empty
    writeToFileAndDownload(filename, workspaceXml);
}