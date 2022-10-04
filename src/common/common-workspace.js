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