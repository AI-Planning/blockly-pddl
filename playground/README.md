# VisualPDDL with Blockly - Playground

To see how it works, open [HTML](index.html) in your browser.

## General Notes

1. The **VisualPDDL with Blockly** Ecosystem inherits HTML/JavaScript/CSS and APP's Workspace layout (with Blockly script running capability) from 
[Misty Robotics]((https://github.com/MistyCommunity)) Community Edition [![Google Blockly](https://tinyurl.com/built-on-Blockly)](https://github.com/google/blockly) 

# Known Issues
* Access to XMLHttpRequest at (e.g.) 'advanced.xml' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: 
http, data, chrome, chrome-extension, chrome-untrusted, https.
	* see loadBlocklyBlocksXMLperLevel() in change() in [here](Content/Misty/js/vpddl_index_setup.js)



