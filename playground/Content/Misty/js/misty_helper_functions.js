/**
 * -----------------------------------------------------------------------------------------------
 * misty_helper_functions.js
 * This file contains helper functions for interacting between the Blockly interface and 
 * the files on a user's computer (i.e. audio files, image files, etc.).
 * Revised April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson (added comments throughout)
 * -----------------------------------------------------------------------------------------------
 */

//listOfFilesReadIn preserves information for all files selected
var listOfFilesReadIn = [];
//latestFileData preserves information for the last file selected
var latestFileData;
//instanceOfBrowseInMistyTabblockName keeps track of the id of the instance of the browse block currently created, but not placed in workspace yet

/**
 * hexToRgb
 * Converts hexedecimal values to RGB
 * @param {String} hex the hexadecimal value to be converted.
 * @private
 */
function hexToRgb(hex) {
	//separates the hex code into the red, green and blue values
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	//returns the red, green and blue values converted from base 16 to base 10;
	return result ? {
		Red: parseInt(result[1], 16),
		Green: parseInt(result[2], 16),
		Blue: parseInt(result[3], 16)
	} : null;
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
 * restoreBlocklySession
 * Restores a single set of blocks from the browser's local storage
 * @param none
 * @private
 */
function restoreBlocklySession() {
	BlocklyStorage.restoreBlocks(workspace);
}

/**
 * openFilePicker
 * Opens a dialog for the user to select a file
 * @param none
 * @private
 */
function openFilePicker() {
	//allows the user to select a file and assigns the file with the fileSelected id
	$("input#fileSelected").trigger("click");
}

/**
 * openImageFilePicker
 * Opens a dialog for the user to select a image
 * @param none
 * @private
 */
function openImageFilePicker() {
	//checks to make sure the browser supports the necessary file APIs
	if (window.File && window.FileReader && window.FileList) {
		var labelBox = Blockly.selected.getField("FIELD_BrowseToImageFile_Boolean");
		if (labelBox) {
			//allows the user to select a file and assigns the file with the image-file id
			$("input#image-file").trigger("click");
			labelBox.setValue("<filename>");
		} 
	}
	return false;
}

/**
 * openAudioFilePicker
 * Opens a dialog for the user to select an audio file
 * @param none
 * @private
 */
function openAudioFilePicker() {
	//checks to make sure the browser supports the necessary file APIs
	if (window.File && window.FileReader && window.FileList) {
		var labelBox = Blockly.selected.getField("FIELD_BrowseToAudioFile_Boolean");
		if (labelBox) {
			//allows the user to select a file and assigns the file with the audio-file id
			$("input#audio-file").trigger("click");
			labelBox.setValue("<filename>");
		}
	}
	return false;
}

/**
 * validateImageFile
 * Ensures the image selected by the user is of a supported format
 * @param none
 * @private
 */
function validateImageFile() {
	//selects the most recent image-file chosen by the user
	var file = $("input#image-file")[0].files[0];
	//sets the allowed file extensions
	var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
	//compares the file extension of the file to the ones supported
	if (!allowedExtensions.exec(file.name)) {
		//alerts the user if the file is of an invalid file type
		alert("Please upload file having extensions .jpeg/.jpg/.png/.gif only.");
		//clears the inputted file
		fileInput.value = "";
		return false;
	}
	//ensures the file size is not larger than 6MB
	if (file.size > 6291456) {
		//alerts the user if the file is too big
		showToastMessage("The file exceeds the maximum size of 6MB.");
		return;
	}
	//if the file is valid uploads the file to be used by the Blockly interface
	uploadFile(file);
}

/**
 * validateImageFile
 * Ensures the audio file selected by the user is of a supported format
 * @param none
 * @private
 */
function validateAudioFile() {
	//selects the most recent audio-file chosen by the user
	var file = $("input#audio-file")[0].files[0];
	//sets the allowed file extensions
	var allowedExtensions = /(\.wav|\.mp3|\.wma|\.aac|\.ogg)$/i;
	//compares the file extension of the file to the ones supported
	if (!allowedExtensions.exec(file.name)) {
		//alerts the user if the file is of an invalid file type
		alert("Please upload file having extensions .wav/.mp3/.wma/.aac/.ogg only.");
		//clears the inputted file
		file.value = "";
		return false;
	}
	//ensures the file size is not larger than 6MB
	if (file.size > 6291456) {
		//alerts the user if the file is too big
		showToastMessage("The file exceeds the maximum size of 6MB.");
		return;
	}
	//if the file is valid uploads the file to be used by the Blockly interface
	uploadFile(file);
}

/**
 * uploadFile
 * Uploads the given file to the Blockly interface
 * @param {File} file the file to be uploaded
 * @private
 */
function uploadFile(file) {
	//identifies the current block where the file upload command was called from
	var block = Blockly.selected;

	//if the file is an image
	if (file.helpUrl === "Image File") {
		var image = new Image();
		image.blockid = block.id;
		let height = this.height;
		let width = this.width;

		let fileName = file.name;
		let filereader = new FileReader();
		filereader.onload = function (evt) {

			let Uint8View = new Uint8Array(evt.target.result);
			let uploadableFile = {
				"blockId": block.id,
				"FileName": fileName,
				"Data": arrayBufferToBase64(evt.target.result),//Uint8View.toString(),
				"Width": width,
				"Height": height,
				"ImmediatelyApply": true,
				"OverwriteExisting": true
			};
			
			$("input#image-file").value = null;
			listOfFilesReadIn.push(uploadableFile);
			block.setFieldValue(block.id, "FIELD_BrowseToFile_Data");
			updateFileBlockText(block, file);
		};
		fr.readAsArrayBuffer(file);
		fr.onerror = fileLoadErrorHandler;
	} else { //if the file is an audio file

		let filereader = new FileReader();
		filereader.onload = function (evt) {
			let Uint8View = new Uint8Array(evt.target.result);
			let fileName = file.name;
			let uploadableFile = {
				"blockId": block.id,
				"FileName": file.name,
				"Data": arrayBufferToBase64(evt.target.result),//Uint8View.toString(),
				"ImmediatelyApply": true,
				"OverwriteExisting": true
			};
			$("input#audio-file").value = null;
			listOfFilesReadIn.push(uploadableFile);
			block.setFieldValue(block.id, "FIELD_BrowseToFile_Data");
			updateFileBlockText(block, file);
		};
		filereader.readAsArrayBuffer(file);
		filereader.onerror = fileLoadErrorHandler;
	}
}

/**
 * arrayBufferToBase64
 * Converts ana array buffer to base64
 * @param {File} file the file to be uploaded
 * @private
 */
function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
}

/**
 * fileLoadErrorHandler
 * Used with the Browse to file block for when file loading fails
 * @param {File} file the file to be uploaded
 * @private
 */
function fileLoadErrorHandler(evt) {
	if (evt.target.error.name === "NotReadableError") {
		alert("Cannot read file");
	}
	else {
		alert("File load error");
	}
}

/**
 * updateFileBlockText
 * Indicate file selected to user
 * @param {File} file the file to be uploaded
 * @private
 */
function updateFileBlockText(block, file) {
	var checkBox = file.type.includes("image") ? block.getField("FIELD_BrowseToImageFile_Boolean") : block.getField("FIELD_BrowseToAudioFile_Boolean");
	var labelBox = block.getField("FIELD_BrowseToFile_Data");
	var value = block.getFieldValue("FIELD_BrowseToFile_Data");
	if (file.value === "") {
		labelBox.setValue("invalid file");
	}
	if (file.size > 6291456) {
		labelBox.setValue("file too large (>6mb)");
	} else {
		checkBox.setValue(true);
		labelBox.setValue(file.name);
	}
}

/**
 * fileSelectionCanceled
 * clears the input field if the user cancels their file selection
 * @param {File} file the file to be uploaded
 * @private
 */
function fileSelectionCanceled() {
	console.log("fileSelectionCanceled");
	var labelBox = Blockly.selected.getField("FIELD_BrowseToFile_Data");
	labelBox.setValue("<filename>");
}