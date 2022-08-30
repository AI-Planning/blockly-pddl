/**
 * This file initializes the setup for VisualPDDL
 *
 * MODIFIED:
 *    By team of VisualPDDL project (JUN-2021)
 *
 * ORIGIN:
 *    Apache 2.0 License - Copyright 2020 Misty Robotics
 *    Created/Revised April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson 
 *
 */

var ip = "";
var ipAddress = "";
var lastIPReported = Date.now();
var instanceOfBrowseInMistyTabblockName;
// Alert to to tell users that the robot is not responding
var disconnectedAlert;
var abortScript = false;

var GetListOfImages = [];
var GetListOfAudioFiles = [];
var level = 1; // 2;
var robotVersion = 2;
var connectingAnimation = '<svg id="connecting-animation" data-name="Layer 1" style="height: 50%; position: absolute; top: 20%; right: 30%; z-index:1000;" viewBox="0 0 1285 725">';
connectingAnimation += '<rect class="cls-1" x="382" y="335" width="95" height="95"/><rect class="cls-2" x= "596" y= "335" width= "95" height="95"/><rect class="cls-3" x= "797" y= "335" width= "95" height="95"/>';
connectingAnimation += '</svg>';


/**
 * $(document).ready
 * This block of code won't run until jQuery detects that the document is "ready"
 * Deals with the initial set up of the misty blockly site.
 */
$(document).ready(function () {
	bindEvents();
	//var starterCommands = JSON.parse(robot.result);
	var starterCommands = vpddlAPI.result;

	setLevelCommands(level);
	listOfImages.push(["No files", ""]);
	listOfAudioFiles.push(["No files", ""]);
	createAllCommands(starterCommands, level);
});


// More initialization
var options = {
	toolbox: toolbox,
	collapse: true,
	comments: true,
	disable: true,
	maxBlocks: Infinity,
	trashcan: true,
	horizontalLayout: false,
	toolboxPosition: "start",
	css: true,
	media: "Content/media/",
	rtl: false,
	scrollbars: true,
	sounds: true,
	oneBasedIndex: false,
	grid: {
		spacing: 20,
		length: 1,
		colour: "#888",
		snap: true
	},
	zoom: {
		controls: true,
		wheel: false,
		startScale: 1.0,
		maxScale: 3.0,
		minScale: 0.3,
		scaleSpeed: 1.2
	}
};
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv, options);

/**
* Construct the blocks required by the flyout for the colours category.
* @param {!Blockly.Workspace} workspace The workspace this flyout is for.
* @return {!Array.<!Element>} Array of XML block elements.
*/
function coloursFlyoutCallback(workspace) {
	// Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
	var colourList = ['#4286f4', '#ef0447'];
	var xmlList = [];
	if (Blockly.Blocks['colour_picker']) {
		for (var i = 0; i < colourList.length; i++) {
			var blockText = '<block type="colour_picker">' +
				'<field name="COLOUR">' + colourList[i] + '</field>' +
				'</block>';
			var block = Blockly.Xml.textToDom(blockText);
			xmlList.push(block);
		}
	}
	xmlList.push(block);
	return xmlList;
};


/**
* loadBlocklyBlocksXMLperLevel()
* handles loads and updates of XML files that define Blockly blocks for different levels
*/
function loadBlocklyBlocksXMLperLevel(file,level) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  var myResponseText = this.responseText;
      document.getElementById("toolbox").innerHTML = this.responseText;
	}
	var starterCommands = vpddlAPI.result;

	setLevelCommands(level);
	createAllCommands(starterCommands, level);
  }
  xmlhttp.open("GET", file, true);
  xmlhttp.responseType = 'text';
  xmlhttp.overrideMimeType('text');
  xmlhttp.send();
}


/**
* change
* changes the level when the user selects a different level from the dropdown and resets the commands accordingly
* @private
*/
function change(){
  //gets the level from the dropdown

        // eng-r: 22-JUN-2021 - hiding 'level' at UI
//	var level_pulldown = document.getElementById("level");  //  smh - renamed to avoid masking global 'level'
//	var val = level_pulldown.options[level_pulldown.selectedIndex].value;

        val= "Beginner";  // override         
  
  //sets the value for level based on the text in the dropdown
	if (val == "Beginner") {
		level = 1;
		loadBlocklyBlocksXMLperLevel("Content/LevelXML/beginner.xml",level);
	} else if (val == "Standard") {
		level = 2;
		loadBlocklyBlocksXMLperLevel("Content/LevelXML/standard.xml",level);
	} else if (val == "Advanced") { //Advanced
		level = 3;
		loadBlocklyBlocksXMLperLevel("Content/LevelXML/advanced.xml",level);
	} else if (val == "Expert") { //Expert, only available by url
		level = 4;
		loadBlocklyBlocksXMLperLevel("Content/LevelXML/advanced.xml",level);
	}

}

/**
 * bindEvents
 * This function removes and reassigns event handlers for specific HTML elements upon webpage creation to make the page work
 * @private
 */
function bindEvents() {
	// .unbind() removes a previously attached event handler from the selected element
	// .on() attaches an event handler function for one or more events to the selected element

	// Remove the previously attached click event handler attached to the element with id="connect-to-robot"
	// Attach a new click event handler to the same element that will execute the addressChanged() function every time the element is clicked
	$("#connect-to-robot").unbind("click").on('click', addressChanged);

	// Attach a new click event handler to the element with id="abort-script" that will execute the abortFunction() function every time the element is clicked
	$("#abort-script").on("click", abortFunction);

	// Attach a new click event handler to the element with id="show-javascript" that will execute the showJavaScript() function every time the element is clicked
	$("#show-python").on('click', showPython);

	// Attach a new click event handler to the element with id="run-script" that will execute the runJavaScript() function every time the element is clicked
	$("#run-script").on('click', runJavaScript);

	// Remove the previously attached click event handler attached to the element with id="browse-files"
	$("#browse-files").unbind('click').on('click', openFilePicker);

	// Get the element with the toolbox id and save it as the toolbox variable
	var toolbox = document.getElementById('toolbox');
}


/**
 * disableButtons
 * Disable the following buttons: show-javascript, browse-files, export-session, help
 * @private
 */
function disableButtons() {
	// Disable the button with id="show-javascript" by giving it the CSS class "disabled"
	$("#show-python").addClass("disabled");

	// Disable the button with id="browse-files" by giving it the CSS class "disabled"
	$("#browse-files").addClass("disabled");

	// Disable the button with id="export-session" by giving it the CSS class "disabled"
	$("#export-session").addClass("disabled");

	// Disable the button with id="help" by giving it the CSS class "disabled"
	$("#help").addClass("disabled");
}


/**
 * enableButtons
 * Enable the following buttons: show-javascript, browse-files, export-session, help
 * @private
 */
function enableButtons() {
	// Enable the button with id="show-javascript" by giving it the CSS class "disabled"
	$("#show-python").removeClass("disabled");

	// Enable the button with id="browse-files" by giving it the CSS class "disabled"
	$("#browse-files").removeClass("disabled");

	// Enable the button with id="export-session" by giving it the CSS class "disabled"
	$("#export-session").removeClass("disabled");

	// Enable the button with id="export-session" by giving it the CSS class "disabled"
	$("#help").removeClass("disabled");
}


/**
 * addressChanged
 * This function handles what to do if the robot's address has been changed. See tabbed line below for a deeper explanation.
 *     Connects to the robot using the new ip address, uses information on the robot to update list of not defined skills and the blocks the toolbox uses
 * @param {Object} e an event.
 * @private
 */
function addressChanged(e) {

	e.preventDefault(); // prevent the default action of event e from being triggered
	e.stopPropagation(); // prevent event e from bubbling up the document object model tree, so that parent handlers can stay notified of the event

	// Set the html content of the element with id="connect-to-robot" to "Connecting..."
	// Activate the same element by giving it the CSS class "active"
	$("#connect-to-robot").html("Connecting...").addClass("active");

	// Set input to the retrived value of the element with the id "ip-address"
	var input = $("#ip-address").val();
	ip = input;

	// If the ip address isn't blank
	if (ip !== "")
	{
		// Get information from the new ip (the sendGetRequestToEngine function is defined in vpddl_dispatcher.js)
		// Then update the version, redefine list of not defined skills, update toolbox blocks 
		sendGetRequestToEngine("device", ip, function (data)
		{
			// make sure there is an acceptable connection to the robot
			if (data === "timeout") {
				console.log("Timed out while trying to connect to robot");
				return;
			}

			// update version
			let version = data.robotVersion; // global
			let versionArray = version.split("."); // global
			robotVersion = parseInt(versionArray[0]);

			// try to update the toolbox
			try {
				updateToolboxBlocks(input);
			}
			catch (err) {
				console.log("Error updating toolbox blocks:" + err);
			}
		});	
	}
	else
	{
		showToastMessage("IP Address needs to be in the format of ###.###.###.### where ### is a number between 0-255.");
		$("#connect-to-robot").html("Connect").removeClass("active");
	}
}

/**
* setLevelCommands
* sets the blockly commands to be displayed based on the current level 
* @param {int} level: the current level selected
* @private
*
*/
function setLevelCommands(level){
	//sets the base beginner commands to be included at all levels
	var apiCommands = beginner.beginnerCommands;
	implemented = [];

	var numApiCommandsForLevel = apiCommands.length;

	for(var i = 0; i < numApiCommandsForLevel; i++){
		implemented.push(apiCommands[i].apiCommand.baseApiCommand);
	}


	if(level >= 2){ //if the level is standard or higher adds the standard commands
		apiCommands = standard.standardCommands;
		numApiCommandsForLevel = apiCommands.length;
		for(var i = 0; i < numApiCommandsForLevel; i++){
			implemented.push(apiCommands[i].apiCommand.baseApiCommand);
		}
	}
	if(level >= 3){ //if the level is advanced or higher adds the advanced commands
		apiCommands = advanced.advancedCommands;
		numApiCommandsForLevel = apiCommands.length;
		for(var i = 0; i < numApiCommandsForLevel; i++){
			implemented.push(apiCommands[i].apiCommand.baseApiCommand);
		}
	}
	if(level == 4){ //if the level is expert adds the expert commands
		apiCommands = expert.expertCommands;
		numApiCommandsForLevel = apiCommands.length;
		for(var i = 0; i < numApiCommandsForLevel; i++){
			implemented.push(apiCommands[i].apiCommand.baseApiCommand);
		}
	}
}


/**
 * updateToolboxBlocks
 * (Re)create all commands passing the filter, update the audio list, then update the image list
 * @param {Object} input not used.
 * @private
 */
function updateToolboxBlocks(input) {	

	var commands;

	// Insert connectingAnimation at the start of blocklyDiv
	$(connectingAnimation).prependTo('#blocklyDiv');

	// Get information from the new ip (the sendGetRequestToEngine function is defined in vpddl_dispatcher.js)
	// Then update the version, redefine list of not defined skills, update toolbox blocks 
	sendGetRequestToEngine("help", ip, function (result) {

		// make sure there is an acceptable connection to the robot
		if (result === "timeout") {
			showToastMessage("Robot does not seem to be responding.");
			startWorker(); // display status of connection process
		} else if (result === "error") {
			showToastMessage("This robot does not seem to be on line. Do you have the correct ip address?");
		}

		else {
			//commands = JSON.parse(result);
			commands = result;
			openWebsocket();
			startWorker(); // display status of connection process

			// Update the image list, then the audio list, before creating all commands (which would require knowledge of both images and audio for certain commands)
			updateImageList(function () {
				updateAudioList(function () {
					createAllCommands(commands, level);
				});
			});
		}
	});
}


/**
 * validateIPAddress
 * 
 * @param {Object} input .
 * @return {String} ip, a string of the form "XXX.XXX.XXX.XXX" where XXX is an integer from 0 to 255.
 * @private
 */
function validateIPAddress(input) {
	// Right now we only except ip addresses.
	// Addresses will be of the form XXX.XXX.XXX.XXX where XXX is an integer from 0 to 255

	var ipNumbers = input.split('.');
	var ipNums = new Array(4);
	var ip = "";

	// make sure there are four parts (seperated by 3 periods) to the ip address 
	if (ipNumbers.length !== 4) {
		return "";
	}

	// range check each part of the address
	for (let i = 0; i < 4; i++) {
		ipNums[i] = parseInt(ipNumbers[i]);
		if (ipNums[i] < 0 || ipNums[i] > 255) {
			return "";
		}
	}

	// recombine the parts into a string, seperating each part with periods all done withing the string
	ip = ipNums.join('.');
	return ip;
}


/**
 * openWebsocket
 * Opens a two-way interactive communication session between the robot and the website
 * @private
 */
function openWebsocket() {

	// Give the robot a connection to run on
	const socket = new WebSocket('ws://' + ip + ':80/pubsub');

	// Set the operation to subscribe
	var msg = {
		"#id": "1",
		"Operation": "subscribe",
		"Type": "SelfState",
		"DebounceMs": 1000,
		"EventName": "checkConnection",
		"Message": "",
		"ReturnProperty": "LocalIPAddress"
	};

	// Send the message to the webseite
	var message = JSON.stringify(msg);
	socket.onopen = function (event) {
		socket.send(message);
	};

	socket.onmessage = function (event) {
		var theDataObject = JSON.parse(event.data);
		ipAddress = theDataObject.message;
		lastIPReported = Date.now();
	};
}


/**
 * workerFunction
 * Keeps a worker object alive, checking in 5 second intervals whether to perform postMessage
 * @private
 */
async function workerFunction() {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	while (true) {
		// workerFunction pauses for 5 seconds before doing postMessage which carries out the its onmessage event handler defined in startWorker()
		await sleep(5000);
		postMessage(true);
	}
}


/**
 * startWorker
 * Starts a new worker object to check and display the status of the connection process between the robot and the website
 *    This worker will set the #connect-to-robot element to display that the robot is either connected or still trying to connect
 *    In the event where the trying-to-connect process times out, then this element will show there is no current connection to a robot and the worker will terminate
 * @private
 */
function startWorker() {
	if (typeof Worker !== "undefined") {

		if (typeof worker === "undefined") {
			// Create a new Blob object that carries workerFunction as a string in its data, use this Blob object to create new URL code, then create a new worker object from this URL
			worker = new Worker(URL.createObjectURL(new Blob(["(" + workerFunction.toString() + ")()"], { type: 'text/javascript' })));
		}

		// start a port connection for the worker so it can communicate with the website
		worker.onmessage = function (data) {

			// Keep track of how long the worker has been going
			var timeElapsed = Date.now() - lastIPReported;

			// If the ip address is blank 
			if (ipAddress === "") {
				// Try to reconnect
				$("#connect-to-robot").html("Connect").removeClass("disabled").addClass("active");
				showToastMessage("Attempting to re-establish connection with robot...");
				disableButtons();

				// Terminate worker if it hasn't gained connection with the robot within 10 seconds
				if (timeElapsed > 10000) {
					$("#connect-to-robot").html("Connect").removeClass("active");
					showToastMessage("Robot has stopped responding. You will need to connect again.");
					stopWorker();
				}
			} else { // ip address is valid
				// Display "Connected" on the # connect-to-robot button
				$("#connect-to-robot").html("Connected").addClass("disabled");

				// Enable the buttons again
				enableButtons();
			}
			ipAddress = "";
		};
	}
}


/**
 * stopWorker
 * Terminate a worker object, and set it to undefined
 * @private
 */
function stopWorker() {
	if (worker) {
		worker.terminate();
	}
	worker = undefined;
}


/**
 * sleep
 * Pause for a specified time interval. 
 * @param {int} ms milliseconds.
 * @private
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * showToastMessage
 * Displays appropriate error message at the bottom of the window
 * @param {String} message appropriate error message to be displayed
 * @param {int} timeInMs time used as part of the await promise chain
 * @private
 */
async function showToastMessage(message, timeInMs = 4000) {
	if (message) {
		var element = document.getElementById("toast");
		var snackbar = $('#toast').html(message);
		element.className = "show";
		await sleep(timeInMs);		// allows for time buffer specified by timeInMs
		element.className = element.className.replace("show", "");
	}
}

/**
 * showJavaScript
 * Generates JavaScript from ther user's blockly program and displays it
 * @private
 */
function showJavaScript() {
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	var textWindow = window.open("", "MsgWindow", "width=500, height=400");		// establishes window size
	textWindow.document.body.innerHTML = "<div style=\"white-space:pre-wrap\">" + code + "</div>";	// formats window
	console.log(code);		// writes the message contained in "code" to the console, useful for testing
}	

/**
 * abortFunction
 * Terminates the current script
 * @private
 */
function abortFunction() {
	abortScript = true;
	$("#run-script").toggleClass("run-abort");
	$("#abort-script").toggleClass("run-abort");
}

/**
 * highlightBlock
 * Highlights the currently executing block in the workspace
 * @param {String} id current block that we want to highlight
 * @private
 */
function highlightBlock(id) {
	workspace.highlightBlock(id);
}

/**
 * exportBlocklySession
 * Converts the blockly file to plain text and saves it
 * @private
 */
function exportBlocklySession() {
	var name ="blockly.txt";
	var xml = Blockly.Xml.workspaceToDom(workspace);	// encodes the block block tree (blocks contained in "workspace") to XML
	var text = Blockly.Xml.domToText(xml);	// converts a DOM structure (tree of XML nodes in "xml") into plain text
	if (text.length === 0) {
		window.alert("There is nothing to save");
		return;
	}
	download(name, text);
}

/**
 * importBlocklySession
 * Converts the file reader object to usable blocks on the workspace, used to reload a previously saved Blockly program
 * @private
 */
function importBlocklySession() {
	workspace.clear();
	var file = $("#selectedFile").files[0];
	var reader = new FileReader();
	reader.onload = function () {	// this function executes immediately when reader object is loaded
		var text = reader.result;	// stores the reader object as an XML string
		var xml = Blockly.Xml.textToDom(text);	// converts that XML string to DOM object
		Blockly.Xml.domToWorkspace(xml, workspace);		// decodes that XML DOM object and creates blocks on the workspace
	};
	reader.readAsText(file);
	$("#selectedFile").value = "";
}

/**
 * download
 * Takes the user's blocks in the browser, creates JavaScript code based on those blocks, and downloads/saves it to the client
 * @param {String} filename the file we wish to download
 * @param {String} text plain text version of XML nodes
 * @private
 */
function download(filename, text) {
	if (window.navigator.userAgent.indexOf("Edge") > -1) {
		// a Blob is a file-like object of immutable, raw data
		var blob = new Blob([text], { type: "text/plain"}); 	// creates a Blob object of plain text
		window.navigator.msSaveOrOpenBlob(blob, "blockly.txt");
	} else {	// case where "Edge" is never found in the string userAgent
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);		// adds the new element just created as a child of the html body

		element.click();	// simulates a click when the user moves the mouse over the element
		document.body.removeChild(element);		// removes that new element from the body when users mouse is over it
	}
}

/**
 * restoreBlocklySession
 * Restores Blockly blocks from local browser storage
 * @private
 */
function restoreBlocklySession() {
	BlocklyStorage.restoreBlocks(workspace);
}

/**
 * updateAudioList
 * Creates and populates list of audio commands received from the robot
 * @param {Function} callback callback function
 * @private
 */
function updateAudioList(callback) {
	sendGetRequestToEngine("audio/list", ip, function (result) {	// result variable filled when results are returned from the robot
		listOfAudioFiles = [];
		if (result.status === "error" || result === "error") {		// if there was some error getting the results from the robot
			listOfAudioFiles.push("Output not supported", "");
		} else if (!result.length) {		// if there were no results returned from the robot
			listOfAudioFiles.push(["No files", ""]);
		} else {
			for (i = 0; i < result.length; i++) {
				var fileName = [result[i].name, result[i].name];
				listOfAudioFiles.push(fileName);
			}
		}
	});
	if (callback) {
		callback();
	}
}

/**
 * updateImageList
 * Creates and populates list of image commands received from the robot
 * @param {Function} callback callback function
 * @private
 */
function updateImageList(callback) {
	sendGetRequestToEngine("images/list", ip, function (result) {	// result variable filled when results are returned from the robot
		listOfImages = [];
		if (result.status === "error" || result === "error") {	// if there was some error getting the results from the robot
			listOfImages.push(["Output not supported", ""]);
		} else if (!result.length) { 		// if there were no results returned from the robot
			listOfImages.push(["No files", ""]);
		} else {
			for (i = 0; i < result.length; i++) {
				var fileName = [result[i].name, result[i].name];
				listOfImages.push(fileName);
				if (!result[i].userAddedAsset) {
					SystemImageList.push(result[i].name);
				}
			}
		}
	});
	if (callback) {
		callback();		// call the callback function if there is one
	}
}

var myInterpreter = null;
/**
 * runJavaScript
 * creates the JavaScript code for the Blockly program in the workspace and passes both it and the initialization function (initFunc) defined in this code to the JavaScript interpreter
 * @param {Event} e some event we wish to pass in (could be submitting a form or loading a new URL)
 * @private
 */
function runJavaScript(e) {		
	e.preventDefault(); 	// cancels execution of the event e
	disableButtons();
	$("#run-script").toggleClass("run-abort");
	$("#abort-script").toggleClass("run-abort");

	Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';	// highlights the currently executing block as the code runs
	// next two lines generates Javascript in the workspace so it can be easily executed in the destination web page
	Blockly.JavaScript.addReservedWords('highlightBlock', 'sendGetRequestToEngineWrapper', 'sendPostRequestToEngineWrapper', 'sendDeleteRequestToEngineWrapper', 'sleep');
	var code = Blockly.JavaScript.workspaceToCode(workspace);

	var initFunc = function (interpreter, scope) {
		/**
	 	* Wrappers for sending different requests to the Misty
	 	* 
	 	* GET: used to request data from the Misty
		* POST: used to send data to the Misty server
		* DELETE: used to delete a specified resource
		*/
		var sendGetRequestToEngineWrapper = interpreter.createAsyncFunction(function (endpoint, ip, callback) {
			return sendGetRequestToEngine(endpoint, ip, callback);
		});
		interpreter.setProperty(scope, 'sendGetRequestToEngine', sendGetRequestToEngineWrapper);

		var sendPostRequestToEngineWrapper = interpreter.createAsyncFunction(function (endpoint, ip, payload, callback) {
			return sendPostRequestToEngine(endpoint, ip, payload, callback);
		});
		interpreter.setProperty(scope, 'sendPostRequestToEngine', sendPostRequestToEngineWrapper);

		var sendDeleteRequestToEngineWrapper = interpreter.createAsyncFunction(function (endpoint, ip, callback) {
			return sendDeleteRequestToEngine(endpoint, ip, callback);
		});
		interpreter.setProperty(scope, 'sendDeleteRequestToEngine', sendDeleteRequestToEngineWrapper);

		var waitForMsWrapper = interpreter.createAsyncFunction(function (pauseDuration, callback) {
			return setTimeout(callback, pauseDuration);
		});	
		interpreter.setProperty(scope, 'waitForMs', waitForMsWrapper);
		
		// Wrappers for different Blockly functionality
		var updateAudioListWrapper = interpreter.createNativeFunction(function () {
			return updateAudioList();
		});
		interpreter.setProperty(scope, 'updateAudioList', updateAudioListWrapper);

		var updateImageListWrapper = interpreter.createNativeFunction(function () {
			return updateImageList();
		});
		interpreter.setProperty(scope, 'updateImageList', updateImageListWrapper);

		var alertWrapper = interpreter.createNativeFunction(function (text) {
			return alert(text);
		});
		interpreter.setProperty(scope, 'alert', alertWrapper);

		var highlightBlockWrapper = interpreter.createNativeFunction(function (id) {
			id = id ? id.toString() : '';
			return interpreter.createPrimitive(highlightBlock(id));
		});
		interpreter.setProperty(scope, 'highlightBlock', highlightBlockWrapper);
	};
	myInterpreter = new Interpreter(code, initFunc);

	/**
	 * nextStep
	 * Determines whether we need to abort the script or set an appropriate timeout
	 */
	function nextStep() {
		if (abortScript) {
			alert("Script aborted");
			abortScript = false;
			enableButtons();
			return;
		}
		if (myInterpreter.step()) {
			window.setTimeout(nextStep, 20);
		}
		else {
			workspace.highlightBlock(null);
			enableButtons();
			abortScript = false;
			$("#run-script").toggleClass("run-abort");
			$("#abort-script").toggleClass("run-abort");		
		}
	}
	nextStep();

	//TODO: implement synchronous calls using code below...
	//if (myInterpreter.step() && myInterpreter.pa) {
	//	myInterpreter.pa = false;
	//}
}

/**
 * arrayContains
 * Used to check if certain commands are found within a set of commands (specifically used for checking set of legacy commands)
 * @param {Array} array set of things we are checking within 
 * @param {String} val2match the thing we want to check if it exists within the array set
 * @private
 */
function arrayContains(array, val2match) {
	if (array.length === 0) {
		return false;
	}
	else {
		for (var k = 0; k < array.length; k++) {
			if (array[k] === val2match) {
				return true;
			}
		}
		return false;
	}
}
