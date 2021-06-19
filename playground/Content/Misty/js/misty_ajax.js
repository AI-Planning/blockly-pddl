/**
 * -----------------------------------------------------------------------------------------------
 * misty_ajax.js
 * This file sends POST, GET, and DELETE requests to the robot. 
 * Revised April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson (added comments throughout)
 * -----------------------------------------------------------------------------------------------
 */

/**
 * sendPostRequestToRobot
 * Sends a request to upload data to Misty, change system settings, or make Misty do something
 * @param {String} endpoint The API endpoint the command is being sent to
 * @param {String} ip The ip address of the robot being connected to 
 * @param {Object} payload The command being delivered to the robot
 * @param {function} callback The callback function for the request
 * @param {String} dataType Specifies the content type for the post request
 * @private
 */
function sendPostRequestToRobot(endpoint, ip, payload, callback, dataType = "application/json") {

	var url = "http://" + ip + "/api/" + endpoint;

	$.ajax({
		type: "POST",
		url: url,
		headers: {
			"Accept": dataType,
			"Content-Type": dataType,
			"Access-Control-Allow-Origin": "*"
		},
		data: JSON.stringify(payload.a),
		dataType: "json",
		async: true,
		timeout: 20000,
		success: function (data) {
			console.log(`POST Request to: ${endpoint}\n`, data)
		},
		error: function (request, status, err) {
			if (status === "timeout") {
				console.log("timeout");
			}
			else {
				console.log(err);
			}
		},
		complete: function (request, status) {
			var result = "";
			try {
				var response = request.responseJSON;
				result = response.result;
				console.log("Result: " + result);
			}
			catch (err) {
				console.log(err);
			}
			if (callback !== null) {
				console.log(callback);
				callback(result);
			}
		}
	});
}

/**
 * sendGetRequestToRobot
 * Sends a request to Misty obtain a system or user uploaded file stored on Misty
 * @param {String} endpoint The API endpoint the command is being sent to
 * @param {String} ip The ip address of the robot being connected to 
 * @param {function} callback The callback function for the request
 * @private
 */
function sendGetRequestToRobot(endpoint, ip, callback) {

	var url = "http://" + ip + ":80/api/" + endpoint;

	if (endpoint.includes('help')) {

		if (callback) {
			getHelp(endpoint, ip, callback);
		} else {
			getHelp(endpoint, ip);
		}
	}

	else {
		$.ajax({
			type: "GET",
			url: url,
			dataType: "json",
			async: true,
			timeout: 15000,
			success: function (data) {
				console.log(`GET Request to: ${endpoint}\n`, data);
			},
			error: function (request, status, err) {
				if (status === "timeout") {
					if ($("#connecting-animation")) {
						$("#connecting-animation").remove();
					}
					disableButtons();
				}
			},
			complete: function (request, status) {
				var result = "";
				if ($("#connecting-animation")) {
					$("#connecting-animation").remove();
				}
				try {

					var response = request.responseJSON;
					result = response.result;
				}
				catch (err) {
					$("#connect-to-robot").html("Connect").removeClass("active").removeClass("disabled");
					callback(status);
				}
				if (callback !== null) {
					callback(result);
				}
			}
		});
	}
}

/**
 * sendDeleteRequestToRobot
 * Sends a request to Misty to uninstall skills, delete on of Misty's image, audio, or video files, or clear system settings
 * @param {String} endpoint The API endpoint the command is being sent to
 * @param {String} ip The ip address of the robot being connected to 
 * @param {function} callback The callback function for the request
 * @private
 */
function sendDeleteRequestToRobot(endpoint, ip, callback) {

	var url = "http://" + ip + ":80/api/" + endpoint;
	
	$.ajax({
		type: "DELETE",
		url: url,
		dataType: "json",
		async: true,
		timeout: 15000,
		success: function (data) {
			console.log(`DELETE Request to: ${endpoint}\n`, data);
		},
		error: function (request, status, err) {
			if (status === "timeout") {
				if ($("#connecting-animation")) {
					$("#connecting-animation").remove();
				}
				disableButtons();
			}
		},
		complete: function (request, status) {
			var result = "";
			if ($("#connecting-animation")) {
				$("#connecting-animation").remove();
			}
			try {

				var response = request.responseJSON;
				result = response.result;
			}
			catch (err) {
				$("#connect-to-robot").html("Connect").removeClass("active").removeClass("disabled");
				callback(status);
			}
			if (callback !== null) {
				callback(result);
			}
		}
	});
}