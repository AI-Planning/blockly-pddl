/**
 * -----------------------------------------------------------------------------------------------
 * GetHelp.js
 * This file gets information from the robot about its skills and puts that information into an easy-to-parse format.
 * This file is usually used to get GET, PUT, and STATUS info about the robot's full current set of API commands.
 * This can be done by passing in "help" as the endpoint parameter in the function getHelp().
 * (If you want to get more specific details about a single command instead, pass in "?command=" followed by the name of the command.
 * This last feature isn't really used currently, but it exists.)
* Revised March 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson (added comments throughout)
 * -----------------------------------------------------------------------------------------------
 */

/**
 * getHelp
 * Is used to retrieve info from the robot about API commands stored on the robot
 *    If this function is called with "help" as the endpoint, then it returns get, post, and status info about every API command on the robot in a JSON obj.
 *    If this is function is called with "?command=" included in the endpoint, then it returns robust info about that particular API command in a JSON obj.
 * @param {String} endpoint specific api point of entry.
 * @param {String} robotIP the robot's IP address.
 * @param {function} callback a specific function we want to pass in with an unknown type.
 * @private
 */
function getHelp(endpoint, robotIP, callback) {

    const url = `http://${robotIP}/api/${endpoint}`;
    
    if (endpoint === 'help') {
        // Print a list of available API endpoints to the console log with get, post, and status info

        // Display list of available API endpoints
        const searchTerm = 'API endpoints';

        return fetch(url) // turns the url into a response object
            .then(response => response.json()) // convert json file to a usable json object
            .then(data => { // call another function named data using arrow function notation
                // we want only one part of response from misty
                //const resultObject = JSON.parse(data.result);
				const resultObject = data.result;

                // format the result obj so we can read it; we only want to know the get, post, and status of all API endpoints
                const readableResult = {
                    get: getReadableResultFromArray(resultObject.get),
                    post: getReadableResultFromArray(resultObject.post),
                    status: data.status
                };

                // Print a list of all API endpoints to the console as readable results
                console.log(`GetHelp: ${searchTerm}\n`, readableResult);

                // if a callback function was passed in as an argument to getHelp
                if (callback) {
                    // Call the function synchronously using the result obj
                    callback(data.result);
                }
            })
            .catch(err => console.log(err))    

    } else if (endpoint.includes('?command=')) {
        // Searches for information a particular API enpoint, not all of them at once 

        // Divides up the endpoint into different commands
        const urlParts = endpoint.split('?command=');
        const searchTerm = urlParts[1];

        return fetch(url) // turns the url into a response object
            .then(response => response.json()) // convert json file to a usable json object
            .then(data => { // call another function named data using arrow function notation

                // connstruct a usable Javascript object from the json string
                const resultObject = JSON.parse(data.result);

                // get a readable result from that object
                const readableResult = getReadableResultFromObject(resultObject);

                // print results to console
                console.log(`GetHelp: ${searchTerm}\n`, readableResult);

                // if a callback function was passed in as an argument to getHelp
                if (callback) {
                    // Call the function synchronously using the result obj
                    callback(data.result);
                }
            })
            .catch(err => console.log(err))
    }
}

/**
 * getReadableResultsFromArray
 * Helper function to getHelp. Useful for retrieving info about endpoints concerning get and post into usable array
 * @param {array} array either resultObject.get or resultObject.post
 * @private
 */
function getReadableResultFromArray(array) {

    // Reformat passed in array inside readableInformation variable
    const readableInformation = array.map((apiEndpoint) => {


        const { endpoint, baseApiCommand, apiCommand } = apiEndpoint;
        const { apiCommandGroup, commandType, id, name, resultType, arguments } = apiCommand;

        return {
            [endpoint]: { baseApiCommand, endpoint, apiCommandGroup, commandType, id, name, resultType, arguments }
        }

    });

    return readableInformation;
}


/**
 * getReadableResultsFromObject
 * Helper function to getHelp. Reformats an object down into an array of endpoints
 * @param {Object} object an object containing information about stored enpoints.
 * @private
 */
function getReadableResultFromObject(object) {

    const readableInformation = {}; // Initialize a new object with nothing in it as a storage location for readable info

        // Iterate through requests contained in passed-in object, storing information about commands into readableInformation
        for (requestMethod in object) {
           
            const { endpoint, baseApiCommand, apiCommand } = object[requestMethod];
            const { apiCommandGroup, commandType, id, name, resultType, arguments } = apiCommand;

            // Reformatting
            readableInformation[requestMethod] = {
                [endpoint]: { baseApiCommand, endpoint, apiCommandGroup, commandType, id, name, resultType, arguments }
            }
        }

    return readableInformation;
}