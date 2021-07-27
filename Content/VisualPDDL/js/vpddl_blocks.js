/**
 * -----------------------------------------------------------------------------------------------
 * This file formats all the API calls that are available to the browser.
 * It deals with the page setup of the blocks.
 *
 * MODIFIED:
 *    By team of VisualPDDL project (JUN-2021)
 *
 * ORIGIN:
 *    Apache 2.0 License - Copyright 2020 Misty Robotics
 *    Created/Revised April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson 
 * -----------------------------------------------------------------------------------------------
 */

/**
 * blocklyTypes
 * Returns the different types of variables that go into fields of Blockly boxes
 * @param {int} value number passed to Blockly functions.
 * @param {int} min lower bound.
 * @param {int} max upper bound.
 * @private
 */
function blocklyTypes(value, min, max) {
	return {
		"String": new Blockly.FieldTextInput("     "),
		"Int32": new Blockly.FieldNumber(value, min, max, 1),
		"Double": new Blockly.FieldNumber(value, min, max, .001),
		"Single": new Blockly.FieldNumber(value, min, max, .001),
		"Byte": new Blockly.FieldColour("#ff0000"),
		"Boolean": new Blockly.FieldCheckbox(value),
	};
}

var listOfImages = [];		// stores images retrieved from robot
var listOfAudioFiles = [];  // stores audio files retrieved from robot
var SystemImageList = [];	

// get today's date
var today = new Date().toJSON().slice().replace(/-/g, '../index.html');


/**
* delayString(time)
* creates a string with a JavaScript busy-loop to delay timeMS milliseconds
* @param {int} number of milliseconds to delay
* @private
*/function delayJS(timeMS) {
	 return '\n{var start = new Date().getTime();\nvar end = start;\nwhile(end < start + '+timeMS+') \n\t{end = new Date().getTime();}\n}\n';
}

// List of hard coded commands 
// *IMPORTANT* any new custom commands will also need to be added here
var hardCodedCommands = {
	// "predicate": null,
	"PDDL2": null,
	"PDDL3": null,
	"PDDL4": null,
	"PDDL5": null,
	"PDDL6": null,
	"PDDL7": null,
};

/**
 * createAllCommands
 * Turns commands from robot into Blockly blocks. Helper function to updateToolboxBlocks in vpddl_index_setup.js
 * @param {Object} commands arrays of each of the command types (ie delete, get, post, put) and their associated API commands.
 * @private
 */
function createAllCommands(commands, level) {	

	let implementedCommands = [];

	// implementedCommands holds all of the Misty commands and stores which Blockly block they belong to
		
	// implementedCommands.push({ "Category": "PDDLCore", "Name": "predicate", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });
	implementedCommands.push({ "Category": "PDDLCore", "Name": "PDDL2", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });
	implementedCommands.push({ "Category": "PDDLCore", "Name": "PDDL3", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });
	implementedCommands.push({ "Category": "PDDLCore", "Name": "PDDL4", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });
	implementedCommands.push({ "Category": "PDDLCore", "Name": "PDDL5", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });
	implementedCommands.push({ "Category": "PDDLCore", "Name": "PDDL6", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });
	implementedCommands.push({ "Category": "PDDLCore", "Name": "PDDL7", "Endpoint": null, "Arguments": [], "CommandCategory": "Current" });

	constructCommandObjects(commands, handleResult, level);

	function handleResult(commandObjects) {
		for (object = 0; object < commandObjects.length; object++) {
			implementedCommands.push(commandObjects[object]);

			if (commandObjects[object].Name == "MoveHead"){
				implementedCommands.push({ "Category": "PDDLCore", "Name": "MoveHead2", "Endpoint": "head", "Arguments": [], "CommandCategory": "Current" });
			} else if (commandObjects[object].Name == "DriveTime"){
				implementedCommands.push({ "Category": "PDDLCore", "Name": "Turn", "Endpoint": "drive/time", "Arguments": [], "CommandCategory": "Current" });
			}
			if (level > 1){
				switch(commandObjects[object].Name){
					case "DriveTime":
						implementedCommands.push({ "Category": "PDDLCore", "Name": "DriveTime2", "Endpoint": "drive/time", "Arguments": [], "CommandCategory": "Current" });
						implementedCommands.push({ "Category": "PDDLCore", "Name": "Turn2", "Endpoint": "drive/time", "Arguments": [], "CommandCategory": "Current" });
					break;

					case "MoveArm":
						implementedCommands.push({ "Category": "PDDLCore", "Name": "MoveArm2", "Endpoint": "arms", "Arguments": [], "CommandCategory": "Current" });
					break;
					
					case "MoveArms":
						implementedCommands.push({ "Category": "PDDLCore", "Name": "MoveArms2", "Endpoint": "arms/set", "Arguments": [], "CommandCategory": "Current" });
					break;

					case "MoveHead":
						implementedCommands.push({ "Category": "PDDLCore", "Name": "MoveHead3", "Endpoint": "head", "Arguments": [], "CommandCategory": "Current" });
					break;

					case "Speak":
						implementedCommands.push({ "Category": "Expression", "Name": "Speak2", "Endpoint": "tts/speak", "Arguments": [], "CommandCategory": "Alpha" });
						break;
				}
			}
		}
		enableButtons();
		constructCategories(implementedCommands, level);
	}
}

/**
 * constructCommandObjects
 * Create command objects with the details needed to create blockly blocks
 * @param {Object} commands contains all the different API commands according to their type (ie delete, get, post, put).
 * @param {Function} callback callback function.
 * @private
 */
function constructCommandObjects(commands, callback, level) {

	// contains type of request as the key for each of the API commands available
	var commandsByRequestType = {
		"POST": commands.post,
		"DELETE": commands.delete,
		"PUT": commands.put,
		"GET": commands.get,
	};

	var commandObjects = [];	// holds each of the Blockly block's Misty commands (format shown below)
	/**************************
	 * Category
	 * Name
	 * Endpoint
	 * Arguments
	 * CommandCategory
	 * RequestType
	 *************************/

	for (var key in commandsByRequestType) {	// key is the request type (ie POST, DELETE, PUT, GET)
		var sublist = commandsByRequestType[key];	// array containing each of the API commands for the current key
		for (var x = 0; x < sublist.length; x++) {
			let thisCommand = sublist[x];
			if(level == 5){
					// This is where the commands are put into each of the blockly blocks
					let commandObject = {
						"Category": thisCommand.apiCommand.apiCommandGroup,
						"Name": thisCommand.apiCommand.name,
						"Endpoint": thisCommand.endpoint,
						"Arguments": thisCommand.apiCommand.arguments,
						"CommandCategory": thisCommand.apiCommand.category,
						"RequestType": key
					};
					commandObjects.push(commandObject);
			} else if (level <= 4){
				if (implemented.includes(thisCommand.baseApiCommand)) {
					// This is where the commands are put into each of the blockly blocks
					let commandObject = {
						"Category": thisCommand.apiCommand.apiCommandGroup,
						"Name": thisCommand.apiCommand.name,
						"Endpoint": thisCommand.endpoint,
						"Arguments": thisCommand.apiCommand.arguments,
						"CommandCategory": thisCommand.apiCommand.category,
						"RequestType": key
					};
					commandObjects.push(commandObject);
				}
			}
		}
	}
	parseArguments(commandObjects, callback);
}

/**
 * parseArguments
 * Breaks apart the Misty commands and converts them into a usable format within the Blockly blocks
 * @param {array} commandObjects contains all the information for the Blockly blocks and each of the Misty commands they contain
 * @param {Function} callback callback function.
 * @private
 */
function parseArguments(commandObjects, callback) {
	commandObjects.forEach(function (command) {
		if (command.Arguments) {
			var commandArguments = command.Arguments;	// the current command we want to parse
			var argNames = Object.keys(commandArguments); 	// stores the current Misty command name (eg. "volume" for the command to set volume)
			var argArray = Array.from(argNames, x => commandArguments[x]);		// stores the details related to the current command
			var args = [];
			argArray.forEach(function (arg) {
				let type = "";
				var bTypes = Object.keys(blocklyTypes(0,0,0));		// gets the different types of variables that go into fields of Blockly boxes from blocklyTypes function
				for (i=0; i < bTypes.length; i++) {
					if (arg["getValueType"].indexOf(bTypes[i]) > -1)
					{
						type = bTypes[i];
						break;
					}
				};
				arg["getValueType"].substring(arg["getValueType"].lastIndexOf("System.") + 7, arg["getValueType"].indexOf(","));
				// this is what allows the user to enter in appropriate values for the different Misty commands in Blockly
				let argument = {
					"Name": arg.name,
					"Type": type,
					"Value": arg.Value
				};
				args.push(argument);	// keeps a running array of each of these commands in this new user friendly format
			});
			command.Arguments = args; 	// updates command.Arguments to hold the Misty commands in this new format to be used by the Blockly interface
		}
	});
	callback(commandObjects);
}

/**
 * constructCategories
 * Create an array of categories, each containing an array of its commands
 * @param {array} commnadObjects contains all of the Misty commands and the Blockly block they belong to.
 * @private
 */
function constructCategories(commandObjects, level) {
	var commandGroupOfEachCommand = commandObjects.map(x => x.Category);
	var commandGroups = [];
	var categoryArray = [];

	for (const key of commandGroupOfEachCommand) {
		if (!commandGroups[key]) {
			commandGroups[key] = new Array;
			categoryArray.push(key);
		}
	}

	for (var i = 0; i < categoryArray.length; i++) {
		for (var j = 0; j < commandObjects.length; j++) {
			commandObjects[j].Category === categoryArray[i] ? commandGroups[categoryArray[i]].push(commandObjects[j]) : null;
		}
	}
	updateMistyBlocks(commandGroups, categoryArray, level);
}

/**
 * updateMistyBlocks
 * Adds tabs and blocks to the blockly toolbox and displays the blocks in the browser
 * @param {array} commandGroups 2D array of Blockly command objects.
 * @param {array} categories contains all Blockly blocks that we wish to display.
 */

function updateMistyBlocks(commandGroups, categories, level) {
	var colours = ["#339933", "#FBBD0B", "#D11149", "#4285F4", "#990099", "#6B09EE", "#F17105", "#1A8FE3", "#9966FF"];
	var blocklyColours = [153, 45, 344, 218, 344, 266, 28, 206, 260];
	var usedColors = []; 

	while (toolbox.childNodes[4]) {
		toolbox.removeChild(toolbox.childNodes[4]);
	}
	for (var i = 0; i < categories.length; i++) {
		var categoryTab = document.createElement("category");
		categoryTab.setAttribute("name", categories[i]);
		switch(categories[i]){
			case 'PDDLCore':
				categoryTab.setAttribute("colour", colours[1]);
				usedColors.push(blocklyColours[1]);
				break;
			default:
				categoryTab.setAttribute("colour", colours[i]);
		}
		//categoryTab.setAttribute("colour", colours[i]);

		let commandGroup = commandGroups[categories[i]];
		for (var j = 0; j < commandGroup.length; j++) {
			addBlock(commandGroup[j], categoryTab, usedColors[i], level);
		}
		toolbox.appendChild(categoryTab);
	}
	workspace.updateToolbox(toolbox); 	// displays the rest of the Blockly blocks on the screen (after Blockly Blocks, Variables, Functions already displayed)
}

/**
 * addBlock
 * Adds a block to Blockly based on a command
 * @param {Object} commandObject contains information about a command for a block that is to be added.
 * @param {category} categoryTab the specific tab where this new block belongs
 * @param {int} colour the colour of the block.
 * @private
 */
function addBlock(commandObject, categoryTab, colour, level) {
	// The first block to get added is BrowseToImageFile from my testing
	// This is where we initialize tools the things we need the first block to get added
	var legacyCommands = Object.keys(hardCodedCommands);
	var blockName = commandObject.Name;
	var endpoint = commandObject.Endpoint;
	var commandCategory = commandObject.CommandCategory;
	var requestType = commandObject.RequestType;
	var args = commandObject.Arguments;
	var newBlock = document.createElement("block");

	newBlock.setAttribute("type", blockName);
	newBlock.setAttribute("disabled", false);
	categoryTab.appendChild(newBlock);

	// This is where the magic happens and new blocks actually get added other than those already contained in Blockly Blocks, Variables, and Functions or Legacy Blocks
	if (!arrayContains(legacyCommands, blockName)) { 	
		// Gives Blockly the information it needs to know about the blocks (behind the scenes)
		Blockly.Blocks[blockName] = {
			init: function () {
				this.setColour(colour);
				var dummy = this.appendDummyInput();
				dummy.appendField(blockName);

				for (var k = 0; k < args.length; k++) {
					let fieldValue = "FIELD_" + blockName + "_" + args[k].Name;
					let fieldTypes = blocklyTypes(args[k].Value, -100, 100);
					let fieldType = fieldTypes[args[k].Type];
					if (args[k].Type === "String") {
						dummy.appendField(new Blockly.FieldTextInput(args[k].Name), fieldValue);
					} else {
						dummy.appendField(args[k].Name);
						dummy.appendField(fieldType, fieldValue);
					}
				}
				this.setPreviousStatement(true, null);
				this.setNextStatement(true, null);
				this.setOutput(false);
				//this.setTooltip(blockName);
				
				// Adds tool tips for blocks not in Legacy Blocks
				switch (blockName) {

					/***********************************
					 * ASSETS
					 **********************************/

					///////////////////////
					// DeleteAudio
					///////////////////////
					case "DeleteAudio": 	// this is where it is, not in legacy blocks
						this.setTooltip("Deletes an audio file from the Misty");
						break;

					///////////////////////
					// DeleteImage
					///////////////////////
					case "DeleteImage": 	// this is where it is, not in legacy blocks
						this.setTooltip("Deletes an image file from the Misty");
						break;

					///////////////////////
					// GetAudioFile
					///////////////////////
					case "GetAudioFile": 
						this.setTooltip("Retrieves an audio file from the Misty based on its filename");
						break;

					/***********************************
					 * PDDLCore
					 **********************************/
	
					///////////////////////
					// PDDL1
					///////////////////////
/*
					case "PDDL1": 	// this is where it is, not in legacy blocks
						this.setTooltip("PDDL1 construct");
						break;
*/

					///////////////////////
					// Drive
					///////////////////////
					case "DriveXXX": 	
						this.setTooltip("Drives Misty at a specified linear velocity (between -100 and 100) and a specified angular velocity (between -100 and 100) ***WARNING: can NOT be the last block in a project (must be followed by Stop or some other block)***");
						break;

					///////////////////////
					// Halt
					///////////////////////
					case "Halt": 	
						this.setTooltip("Stops all motor controllers on the Misty (ie drive, head, arms)");
						break;

					///////////////////////
					// DriveTrack
					///////////////////////
					case "DriveTrack": 	
						this.setTooltip("Drives Misty based on specified speeds for Misty's individual tracks (-100 for full speed backward and 100 for full speed forward) ***WARNING: can NOT be the last block in a project (must be followed by Stop or some other block)***");
						break;

					///////////////////////
					// Stop
					///////////////////////
					case "Stop": 	
						this.setTooltip("Stops Misty's drive motors. If checkbox is unchecked, Misty stops and disengages drive motors. If checkbox is checked, Misty stops and keeps drive motors engaged to hold her current position if on a slope (this can be bad for the lifetime of Misty's drive motors). Try to keep box unchecked when possible.");
						break;

					/***********************************
					 * SYSTEM
					 **********************************/

					///////////////////////
					// SetDefualtVolume
					///////////////////////
					case "SetDefaultVolume": 	
						this.setTooltip("Sets Misty's default volume from range 1-100");
						break;

					///////////////////////
					// PerformSystemUpdate
					///////////////////////
					case "PerformSystemUpdate": 	
						this.setTooltip("Downloads and installs a system update onto the Misty if one is available");
						break;

					///////////////////////
					// ConnectToSavedWifi
					///////////////////////
					case "ConnectToSavedWifi": 	
						this.setTooltip("Connects to a saved network according to the specified network name");
						break;

					///////////////////////
					// ConnectWiFi
					///////////////////////
					case "ConnectWiFi": 	
						this.setTooltip("Connects to a new network according to the specified network name and password");
						break;

					///////////////////////
					// ForgetWifi
					///////////////////////
					case "ForgetWifi": 	
						this.setTooltip("Deletes information about a specified network from Misty's list of saved networks");
						break;

					///////////////////////
					// GetAvailableWifiNetworks
					///////////////////////
					case "GetAvailableWifiNetworks": 	
						this.setTooltip("Obtains a list of local wifi networks");
						break;

					///////////////////////
					// GetBatteryLevel
					///////////////////////
					case "GetBatteryLevel": 	
						this.setTooltip("Obtains Misty's current battery level");
						break;


					///////////////////////
					// GetSavedWifiNetworks
					///////////////////////
					case "GetSavedWifiNetworks": 	
						this.setTooltip("Obtains list of Misty's saved Wifi networks");
						break;

					/***********************************
					 * BACKPACK
					 **********************************/

					///////////////////////
					// WriteSerial
					///////////////////////
					case "WriteSerial": 	
						this.setTooltip("Sends a specified data message from Misty to an external device connected to the UART serial port");
						break;

					///////////////////////
					// GetSerialSensorValues
					///////////////////////
					case "GetSerialSensorValues": 	
						this.setTooltip("Obtains a list of the most recent messages Misty has received through the UART serial port");
						break;

					/***********************************
					 * NAVIGATION
					 **********************************/

					///////////////////////
					// StopSlamStreaming
					///////////////////////
					case "StopSlamStreaming": 	
						this.setTooltip("Closes the data stream and turns off the laser in Misty's Occipital Structure Core depth sensor");
						break;

					///////////////////////
					// RenameSlamMap
					///////////////////////
					case "RenameSlamMap": 	
						this.setTooltip("Renames an existing slam map (ie Key) to a new specified name (ie Name)");
						break;

					///////////////////////
					// SetCurrentSlamMap
					///////////////////////
					case "SetCurrentSlamMap": 	
						this.setTooltip("Sets the specified map to be the active map for tracking and relocalization");
						break;

					///////////////////////
					// SetSlamIrExposureAndGain
					///////////////////////
					case "SetSlamIrExposureAndGain": 	
						this.setTooltip("Sets the exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor");
						break;

					///////////////////////
					// SetSlamVisibleExposureAndGain
					///////////////////////
					case "SetSlamVisibleExposureAndGain": 	
						this.setTooltip("Sets the exposure and gain settings for the fisheye camera in the Occipital Structure Core depth sensor");
						break;

					///////////////////////
					// StartSlamStreaming
					///////////////////////
					case "StartSlamStreaming": 	
						this.setTooltip("Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping");
						break;

					///////////////////////
					// DeleteSlamMap
					///////////////////////
					case "DeleteSlamMap": 	
						this.setTooltip("Deletes a specified map");
						break;

					///////////////////////
					// GetSlamMaps
					///////////////////////
					case "GetSlamMaps": 	
						this.setTooltip("Obtains a list of keys and names for Misty's existing maps");
						break;

					///////////////////////
					// GetCurrentSlamMap
					///////////////////////
					case "GetCurrentSlamMap": 	
						this.setTooltip("Obtains the key for the currently active map");
						break;

					///////////////////////
					// GetSlamIrExposureAndGain
					///////////////////////
					case "GetSlamIrExposureAndGain": 	
						this.setTooltip("Obtains the current exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor");
						break;

					///////////////////////
					// GetSlamVisibleExposureAndGain
					///////////////////////
					case "GetSlamVisibleExposureAndGain": 	
						this.setTooltip("Obtains the current exposure and gain settings for the fisheye camera in the Occipital Structure Core depth sensor");
						break;

					/***********************************
					 * EXPRESSION
					 **********************************/

					///////////////////////
					// ClearDisplayText
					///////////////////////
					case "ClearDisplayText": 	
						this.setTooltip("Force clears an error message from Misty's display");
						break;

					///////////////////////
					// StartKeyPhraseRecognition
					///////////////////////
					case "StartKeyPhraseRecognition": 	
						this.setTooltip("Starts Misty listening for the 'Hey, Misty!' key phrase and records any speech she detects after recognizing the key phrase. The recording will be saved under filename: capture_HeyMisty.wav. ***NOTE: Misty's chest LED pulses blue when recording or listening for key phrase. Also, this command is still in Beta, so may not always perform as expected.***");
						break;

					///////////////////////
					// StopKeyPhraseRecognition
					///////////////////////
					case "StopKeyPhraseRecognition": 	
						this.setTooltip("Stops Misty listening for the 'Hey Misty!' key phrase");
						break;

					/***********************************
					 * PERCEPTION
					 **********************************/

					///////////////////////
					// CancelFaceTraining
					///////////////////////
					case "CancelFaceTraining": 	
						this.setTooltip("Halts face training that is currently in progress");
						break;

					///////////////////////
					// StartFaceDetection
					///////////////////////
					case "StartFaceDetection": 	
						this.setTooltip("Misty initiates detecting faces in her line of vision and assigns each detected face a random ID");
						break;

					///////////////////////
					// StartFaceRecognition
					///////////////////////
					case "StartFaceRecognition": 	
						this.setTooltip("Misty begins recognizing faces she sees that she has already detected ***WARNING: must have previously used StartFaceDetection for this to work***");
						break;

					///////////////////////
					// StartFaceTraining
					///////////////////////
					case "StartFaceTraining": 	
						this.setTooltip("Misty begins learning a face and assigns it a specified name ***NOTE: takes about 15 seconds and automatically stops when complete***");
						break;

					///////////////////////
					// StartRecordingAudio
					///////////////////////
					case "StartRecordingAudio": 	
						this.setTooltip("Misty starts recording audio and saves it to her local storage according to the specified FileName as a .wav file");
						break;

					///////////////////////
					// StopFaceDetection
					///////////////////////
					case "StopFaceDetection": 	
						this.setTooltip("Misty stops detecting faces");
						break;

					///////////////////////
					// StopFaceRecognition
					///////////////////////
					case "StopFaceRecognition": 	
						this.setTooltip("Misty stops recognizing faces");
						break;

					///////////////////////
					// StopRecordingAudio
					///////////////////////
					case "StopRecordingAudio": 	
						this.setTooltip("Misty stops recording audio");
						break;

					///////////////////////
					// ForgetFaces
					///////////////////////
					case "ForgetFaces": 	
						this.setTooltip("Removes the records of a specified trained face from Misty's memory");
						break;

					///////////////////////
					// GetKnownFaces
					///////////////////////
					case "GetKnownFaces": 	
						this.setTooltip("Obtains a list of the names of Misty trained faces ");
						break;

					/***********************************
					 * SKILLS
					 **********************************/

					///////////////////////
					// DeleteSkill
					///////////////////////
					case "DeleteSkill": 	
						this.setTooltip("Removes the files associated with specified skill from Misty's memory");
						break;

				}
			}
		};

		// Gives Blockly the JavaScript it needs to visibly update the site with a useable block
		Blockly.JavaScript[blockName] = function (block) {
			const payload = {};
			for (const arg of args) {
				var input = block.getFieldValue("FIELD_" + blockName + "_" + arg.Name);
				payload[arg.Name] = parseInt(input) ? parseInt(input) : input;
			}
			var code;
			if (requestType === "GET") {
				if (!payload["Command"] || payload["Command"] === "Command") {
					code = "sendGetRequestToEngine(\"" + endpoint + "\",\"" + ip + "\");";
				} else {
					newEndpoint = "help?command=" + payload["Command"].toLowerCase();
					code = "sendGetRequestToEngine(\"" + newEndpoint + "\",\"" + ip + "\");";
				}
			} else {
				code = "sendPostRequestToEngine(\"" + endpoint + "\",\"" + ip + "\"," + JSON.stringify(payload) + ");";
			}
			return code;
		};
	} else {
		legacyBlocks(commandObject, blockName, newBlock, args, colour, endpoint, level);
		
	}
}

/**
 * legacyBlocks
 * Responsible for the hard-coded blocks
 * @param {Object} block object with attributes for arguments, category, command category, endpoint, and name.
 * @param {String} blockName name of block.
 * @param {block} newBlock object containing attributes that specify the blockName and set disabled equal to false.
 * @param {array} args list of arguments.
 * @param {int} colour RGB value for colour of block.
 * @param {String} endpoint point of entry on robot.
 * @private
 * 
 * GENERIC TEMPLATE FOR LEGACY BLOCK: 
 *********************************************************************************************************************************************************************************
 * case "DriveTime":
 * 
 *	   // Initialize fieldValues as an empty array
 *     var fieldValues = [];
 *     
 *     // Append arguments to the array of fieldValues
 *     for (var z = 0; z < args.length; z++) {
 *	       fieldValues.push(fieldValue + "_" + args[z].Name);
 *	   }
 *	   
 *	   // Set up the format of the block in the Blocky IDE
 *	   Blockly.Blocks["DriveTime"] = {
 *	       init: function () {
 *			   
 *			   // Set the colour of this block
 *	           this.setColour(colour);
 *	           
 *	           // Append a dummy input row
 *	           // This example dummy input looks like "Move [FIELD_DriveTime_Direction] at a speed of [FIELD_DriveTime_Velocity] (0 to 100) for a duration of [FIELD_DriveTime_TimeMs] ms"
 *	           this.appendDummyInput()
 *				   // Append a field to this input
 *	               .appendField("Move ")
 *	               
 *	               // Append a dropdown field to this input 
 *	               // This example field is named FIELD_DriveTime_Direction so it can be referenced later
 *	               .appendField(new Blockly.FieldDropdown([["Forward", "F"], ["Backward", "B"], ["Left", "L"], ["Right", "R"]]), "FIELD_DriveTime_Direction")
 *	               
 *	               // Append a field to this input
 *	               .appendField("at a speed of")
 *	               
 *	               // Append a number field to this input
 *	               // This example field is named FIELD_DriveTime_Velocity so it can be referenced later
 *	               .appendField(new Blockly.FieldNumber(25, 0, 100, 1), "FIELD_DriveTime_Velocity")
 *	               
 *	               // Append a field to this input
 *	               .appendField("(0 to 100) for a duration of")
 *	               
 *	               // Append a number field to this input
 *	               // This example field is named FIELD_DriveTime_TimeMs so it can be referenced later
 *	               .appendField(new Blockly.FieldNumber(500, 100, 10000, 100), "FIELD_DriveTime_TimeMs")
 *	               
 *	               // Append a field to this input
 *	               .appendField("ms");
 *	               
 *	           // Set whether this block can chain onto the bottom another block
 *	           this.setPreviousStatement(true, null);
 *	           
 *	           // Set whether another block can chain onto the bottom of this block
 *	           this.setNextStatement(true, null);
 *	           
 *	           // Set the message displayed by this block's tooltip
 *	           this.setTooltip("DriveTime");
 *	           
 *	           // Set the url of this block's help page
 *	           this.setHelpUrl("DriveTime");
 *	           
 *	           // TODO: find DriveTime help page in Misty Blockly documentation and link to it with setHelpUrl() and test
 *	           
 *	       }
 *	   };
 *	   
 *	   // Give the block functionality
 *	   Blockly.JavaScript["DriveTime"] = function (block) {
 *	   
 *		   // Store the value of the field labeled FIELD_DriveTime_Direction
 *	       var direction = block.getFieldValue("FIELD_DriveTime_Direction");
 *	       
 *	       // Store the value of the field labeled FIELD_DriveTime_Velocity
 *	       // Before doing so, this value is converted from a string to an integer
 *	       var velocity = parseInt(block.getFieldValue("FIELD_DriveTime_Velocity"));
 *	       
 *	       // Store the value of the field labeled FIELD_DriveTime_TimeMs
 *	       // Before doing so, this value is converted from a string to an integer
 *	       var time = parseInt(block.getFieldValue("FIELD_DriveTime_TimeMs"));
 *	       
 *	       // Initialize a payload
 *	       var payload = null;
 *	       
 *	       // If the direction is "L" for Left or "R" for Right
 *	       //     If the direction is "L"
 *	       //         Set the angularVelocity equal to positive velocity
 *	       //     Else (direction is "R")
 *	       //         Set the angularVelocity equal to negative velocity
 *	       // Else (direction is not "L" or "R")
 *	       //     Set angularVelocity to 0
 *	       var angularVelocity = direction === "L" || direction === "R" ? (direction === "L" ? velocity : -velocity) : 0;
 *	       
 *	       // If the angularVelocity is 0
 *	       //     If the direction is "F" for Forward
 *	       //         Set the linearVelocity equal to positive velocity
 *	       //     Else (direction is "B" for Backwards)
 *	       //         Set the linearVelocity equal to negative velocity
 *	       // Else (angularVelocity is not 0)
 *	       //     Set linearVelocity to 0
 *	       var linearVelocity = angularVelocity === 0 ? (direction === "F" ? velocity : -velocity) : 0;
 *	       
 *	       // Set the payload to an object with attributes for linearVelocity, angularVelocity, and timeMs
 *	       payload = {
 *	           "LinearVelocity": linearVelocity,	//-100 - 100
 *	           "AngularVelocity": angularVelocity,	//-100 - 100
 *	           "TimeMs": time						//Milliseconds
 *	       };
 *	       
 *	       // Use stringify to make a string representation of the payload
 *	       // Concatenate a JavaScript command as a string, using the robot's endpoint and ip address and the payload
 *	       // The definition of sendPostRequestToEngine() can be found under vpddl_dispatcher.js
 *	       var code = "sendPostRequestToEngine(\"" + endpoint + "\",\"" + ip + "\"," + JSON.stringify(payload) + ");";
 *	       
 *	       // Return the string of request to the robot
 *	       return code;
 *	   };
 *	   break;
 ********************************************************************************************************************************************************************************* 
 */
function legacyBlocks(block, blockName, newBlock, args, colour, endpoint, level) {
	let fieldValue = "FIELD_" + blockName;
	switch (blockName) {
		///////////////////////
		// Pause Code
		///////////////////////
		// case "predicatea":
		// 	Blockly.Blocks['predicatea'] = {
		// 		init: function() {
		// 			var nameField = new Blockly.FieldTextInput('',
		// 				Blockly.Procedures.rename);
		// 			nameField.setSpellcheck(false);
		// 		  	this.appendDummyInput()
		// 			  	.appendField(nameField, "NAME");
		// 		  	this.appendStatementInput("NAME")
		// 			  	.setCheck(null)
		// 			  	.appendField("params");
		// 		  	this.setPreviousStatement(true, "predicatea");
		// 		  	this.setNextStatement(true, "predicatea");
		// 		  	this.setColour(300);
		// 			this.setTooltip("");
		// 	   		this.setHelpUrl("");
		// 	   		this.arguments_ = [];
		// 		},
		// 		/**
		// 		 * Return the signature of this procedure definition.
		// 		 * @return {!Array} Tuple containing three elements:
		// 		 *     - the name of the defined procedure,
		// 		 *     - a list of all its arguments,
		// 		 *     - that it DOES NOT have a return value.
		// 		 * @this Blockly.Block
		// 		 */
		// 		getProcedureDef: function() {
		// 		  return [this.getFieldValue('NAME'), this.arguments_, false];
		// 		},
		// 		callType_: 'procedures_pddlpredicates'
		// 	};

		// 	Blockly.Blocks['procedures_pddlpredicates'] = {
		// 		/**
		// 		 * Block for calling a procedure with no return value.
		// 		 * @this Blockly.Block
		// 		 */
		// 		init: function() {
		// 		  this.appendDummyInput('TOPROW')
		// 			  .appendField(this.id, 'NAME');
		// 		  this.setPreviousStatement(true);
		// 		  this.setNextStatement(true);
		// 		  this.setColour(100);
		// 		  // Tooltip is set in renameProcedure.
		// 		  this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
		// 		  this.arguments_ = [];
		// 		  this.quarkConnections_ = {};
		// 		  this.quarkIds_ = null;
		// 		},
		// 		/**
		// 		 * Returns the name of the procedure this block calls.
		// 		 * @return {string} Procedure name.
		// 		 * @this Blockly.Block
		// 		 */
		// 		getProcedureCall: function() {
		// 		  // The NAME field is guaranteed to exist, null will never be returned.
		// 		  return /** @type {string} */ (this.getFieldValue('NAME'));
		// 		},
		// 		/**
		// 		 * Notification that a procedure is renaming.
		// 		 * If the name matches this block's procedure, rename it.
		// 		 * @param {string} oldName Previous name of procedure.
		// 		 * @param {string} newName Renamed procedure.
		// 		 * @this Blockly.Block
		// 		 */
		// 		renameProcedure: function(oldName, newName) {
		// 		  if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
		// 			this.setFieldValue(newName, 'NAME');
		// 			this.setTooltip(
		// 				(this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
		// 				 Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
		// 				.replace('%1', newName));
		// 		  }
		// 		},
		// 		/**
		// 		 * Create XML to represent the (non-editable) name and arguments.
		// 		 * @return {!Element} XML storage element.
		// 		 * @this Blockly.Block
		// 		 */
		// 		// mutationToDom: function() {
		// 		//   var container = document.createElement('mutation');
		// 		//   container.setAttribute('name', this.getProcedureCall());
		// 		//   for (var i = 0; i < this.arguments_.length; i++) {
		// 		// 	var parameter = document.createElement('arg');
		// 		// 	parameter.setAttribute('name', this.arguments_[i]);
		// 		// 	container.appendChild(parameter);
		// 		//   }
		// 		//   return container;
		// 		// },
		// 		/**
		// 		 * Parse XML to restore the (non-editable) name and parameters.
		// 		 * @param {!Element} xmlElement XML storage element.
		// 		 * @this Blockly.Block
		// 		 */
		// 		// domToMutation: function(xmlElement) {
		// 		//   var name = xmlElement.getAttribute('name');
		// 		//   this.renameProcedure(this.getProcedureCall(), name);
		// 		// },
		// 		/**
		// 		 * Procedure calls cannot exist without the corresponding procedure
		// 		 * definition.  Enforce this link whenever an event is fired.
		// 		 * @param {!Blockly.Events.Abstract} event Change event.
		// 		 * @this Blockly.Block
		// 		 */
		// 		onchange: function(event) {
		// 		  if (!this.workspace || this.workspace.isFlyout) {
		// 			// Block is deleted or is in a flyout.
		// 			return;
		// 		  }
		// 		//   if (event.type == Blockly.Events.BLOCK_CREATE &&
		// 		// 	  event.ids.indexOf(this.id) != -1) {
		// 		// 	// Look for the case where a procedure call was created (usually through
		// 		// 	// paste) and there is no matching definition.  In this case, create
		// 		// 	// an empty definition block with the correct signature.
		// 		// 	var name = this.getProcedureCall();
		// 		// 	var def = Blockly.Procedures.getDefinition(name, this.workspace);
		// 		// 	if (def && (def.type != this.defType_ ||
		// 		// 		JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
		// 		// 	  // The signatures don't match.
		// 		// 	  def = null;
		// 		// 	}
		// 		// 	if (!def) {
		// 		// 	  Blockly.Events.setGroup(event.group);
		// 		// 	  /**
		// 		// 	   * Create matching definition block.
		// 		// 	   * <xml>
		// 		// 	   *   <block type="procedures_defreturn" x="10" y="20">
		// 		// 	   *     <mutation name="test">
		// 		// 	   *       <arg name="x"></arg>
		// 		// 	   *     </mutation>
		// 		// 	   *     <field name="NAME">test</field>
		// 		// 	   *   </block>
		// 		// 	   * </xml>
		// 		// 	   */
		// 		// 	  var xml = goog.dom.createDom('xml');
		// 		// 	  var block = goog.dom.createDom('block');
		// 		// 	  block.setAttribute('type', this.defType_);
		// 		// 	  var xy = this.getRelativeToSurfaceXY();
		// 		// 	  var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
		// 		// 	  var y = xy.y + Blockly.SNAP_RADIUS * 2;
		// 		// 	  block.setAttribute('x', x);
		// 		// 	  block.setAttribute('y', y);
		// 		// 	  var mutation = this.mutationToDom();
		// 		// 	  block.appendChild(mutation);
		// 		// 	  var field = goog.dom.createDom('field');
		// 		// 	  field.setAttribute('name', 'NAME');
		// 		// 	  field.appendChild(document.createTextNode(this.getProcedureCall()));
		// 		// 	  block.appendChild(field);
		// 		// 	  xml.appendChild(block);
		// 		// 	  Blockly.Xml.domToWorkspace(xml, this.workspace);
		// 		// 	  Blockly.Events.setGroup(false);
		// 		// 	}
		// 		//   } else 
		// 		  if (event.type == Blockly.Events.BLOCK_DELETE) {
		// 			// Look for the case where a procedure definition has been deleted,
		// 			// leaving this block (a procedure call) orphaned.  In this case, delete
		// 			// the orphan.
		// 			var name = this.getProcedureCall();
		// 			var def = Blockly.Procedures.getDefinition(name, this.workspace);
		// 			if (!def) {
		// 			  Blockly.Events.setGroup(event.group);
		// 			  this.dispose(true, false);
		// 			  Blockly.Events.setGroup(false);
		// 			}
		// 		  }
		// 		},
		// 		/**
		// 		 * Add menu option to find the definition block for this call.
		// 		 * @param {!Array} options List of menu options to add to.
		// 		 * @this Blockly.Block
		// 		 */
		// 		customContextMenu: function(options) {
		// 		//   var option = {enabled: true};
		// 		//   option.text = 'Predicates';
		// 		//   var name = this.getProcedureCall();
		// 		//   var workspace = this.workspace;
		// 		//   option.callback = function() {
		// 		// 	var def = Blockly.Procedures.getDefinition(name, workspace);
		// 		// 	def && def.select();
		// 		//   };
		// 		//   options.push(option);
		// 		},
		// 		defType_: 'predicate'
		// 	};

		// 	Blockly.JavaScript["predicate"] = function (block) {
		// 		var code = 'predicate: I am placeholder - Replace me with PDDL syntax';
		// 		return code;
		// 	};

		// 	break;

		case "PDDL2":
			Blockly.Blocks["PDDL2"] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField(new Blockly.FieldTextInput("action_name"), "NAME");
			    this.appendStatementInput("params")
			        .setCheck(null)
			        .appendField("parameters");
			    this.appendValueInput("pre")
			        .setCheck(null)
			        .appendField("preconditions");
			    this.appendValueInput("eff")
			        .setCheck(null)
			        .appendField("effects");
			    this.setPreviousStatement(true, null);
			    this.setNextStatement(true, null);
			    this.setColour(230);
				 this.setTooltip("");
				 this.setHelpUrl("");
			  }
			};

			Blockly.JavaScript["PDDL2"] = function (block) {
				var code = 'PDDL_Action_Placeholder';
				return code;
			};

			break;

		case "PDDL3":
			Blockly.Blocks["PDDL3"] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField(new Blockly.FieldTextInput("predicate_name"), "NAME");
			    this.appendStatementInput("NAME")
			        .setCheck("type")
			        .appendField("parameters");
			    this.setPreviousStatement(true, "predicate");
			    this.setNextStatement(true, "predicate");
			    this.setColour(230);
			 this.setTooltip("basic PDDL predicate");
			 this.setHelpUrl("");
			  }
			};                      		

			Blockly.JavaScript["PDDL3"] = function (block) {
				var code = 'PDDL_Predicative_Placeholder';
				return code;
			};

			break;

		case "PDDL4":
			Blockly.Blocks["PDDL4"] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField(new Blockly.FieldTextInput("type_name"), "NAME");
			    this.setInputsInline(false);
			    this.setPreviousStatement(true, null);
			    this.setNextStatement(true, null);
			    this.setColour(230);
			 this.setTooltip("");
			 this.setHelpUrl("");
			  }
			};

			Blockly.JavaScript["PDDL4"] = function (block) {
				var code = 'PDDL_TypeName_Placeholder';
				return code;
			};

			break;

		case "PDDL5":
			Blockly.Blocks["PDDL5"] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField("holding_key");
			    this.setOutput(true, "Boolean");
			    this.setColour(165);
			 this.setTooltip("");
			 this.setHelpUrl("");
			  }
			};

			Blockly.JavaScript["PDDL5"] = function (block) {
				var code = 'PDDL_HoldingKey_Placeholder';
				return code;
			};

			break;

		case "PDDL6":
			Blockly.Blocks["PDDL6"] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField("door_open");
			    this.setOutput(true, "Boolean");
			    this.setColour(165);
			 this.setTooltip("");
			 this.setHelpUrl("");
			  }
			};

			Blockly.JavaScript["PDDL6"] = function (block) {
				var code = 'PDDL_DoorOpen_Placeholder';
				return code;
			};

			break;

		case "PDDL7":
			Blockly.Blocks["PDDL7"] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField("found_key");
			    this.setOutput(true, "Boolean");
			    this.setColour(165);
			 this.setTooltip("");
			 this.setHelpUrl("");
			  }
			};

			Blockly.JavaScript["PDDL7"] = function (block) {
				var code = 'PDDL_FoundKey_Placeholder';
				return code;
			};

			break;	
	}
}


/*
Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
      "message0": 'length of %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};


Blockly.Blocks['string_length'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length of');
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip('Returns number of letters in the provided text.');
    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
  }
};


function pddlBlocks() {
	Blockly.Blocks['string_length_my'] = {
	  init: function() {
	    this.appendValueInput('VALUE')
	        .setCheck('String')
	        .appendField('length of');
	    this.setOutput(true, 'Number');
	    this.setColour(160);
	    this.setTooltip('Returns number of letters in the provided text.');
	    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	  }
	};
}

*/