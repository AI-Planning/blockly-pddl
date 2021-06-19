/**
 * -----------------------------------------------------------------------------------------------
 * misty_levels.js
 * This file groups the API commands into different levels of Blockly blocks.
 * On Blockly, you can select a level (beginner, standard, advanced, or expert) and you will have 
 * access to the blocks specified for that level as well as any lesser level.
 * This ensures that Blockly is as complicated/simple as the user wants to make it.
 * Created April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson 
 * -----------------------------------------------------------------------------------------------
 */

var beginner = {
    "beginnerCommands": [
        {
         "apiCommand": {
            "apiCommandGroup": "Assets",
            "baseApiCommand": "GetListOfAudioFiles"
            }
        },
        {
        "apiCommand": {
            "apiCommandGroup": "Assets",
            "baseApiCommand": "GetListOfImages"
            }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "PauseCode"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "MoveHead"
                }
        },  
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "MoveHead2"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "MoveArm"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "MoveArms"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "DriveTime"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "Stop"
                }
        }, 
        {
            "apiCommand": {
                "apiCommandGroup": "System",
                "baseApiCommand": "SetDefaultVolume"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Expression",
                "baseApiCommand": "ChangeDisplayImage"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Expression",
                "baseApiCommand": "ChangeLED"
                }
        }, 
        {
            "apiCommand": {
                "apiCommandGroup": "Expression",
                "baseApiCommand": "PlayAudioClip"
                }
        },
        {
            "apiCommand": {
                "apiCommandGroup": "Expression",
                "baseApiCommand": "Speak"
                }
        }
        ]
}

var standard = { //currently the same as beginner with the exception of puzzle piece blocks specified in mistyblocks
    "standardCommands": [
    
    ]
}

var advanced =  {
    "advancedCommands": [
		{
            "apiCommand": {
                "apiCommandGroup": "Movement",
                "baseApiCommand": "Drive"
                }
        }, 
		{
		"apiCommand": {
			"apiCommandGroup": "Movement",
			"baseApiCommand": "LocomotionTrack"
			
			}
        }, 
		{
         "apiCommand": {
            "apiCommandGroup": "Expression",
            "baseApiCommand": "ClearDisplayText"
            }
        },
		{
            "apiCommand": {
               "apiCommandGroup": "Expression",
               "baseApiCommand": "StartKeyPhraseRecognition"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Expression",
               "baseApiCommand": "StopKeyPhraseRecognition"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "CancelFaceTraining"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "StartFaceDetection"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "StartFaceRecognition"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "StartFaceTraining"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "StartRecordingAudio"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "StopFaceDetection"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "StopRecordingAudio"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "ClearLearnedFaces"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Perception",
               "baseApiCommand": "GetLearnedFaces"
               }
        },
        {
         "apiCommand": {
            "apiCommandGroup": "Assets",
            "baseApiCommand": "BrowseToImageFile"
            }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Assets",
               "baseApiCommand": "BrowseToAudioFile"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Assets",
               "baseApiCommand": "SaveAudioAssetToRobot"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Assets",
               "baseApiCommand": "SaveImageAssetToRobot"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Assets",
               "baseApiCommand": "DeleteAudioAssetFromRobot"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Assets",
               "baseApiCommand": "DeleteImageAssetFromRobot"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Assets",
               "baseApiCommand": "GetAudioFile"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Movement",
               "baseApiCommand": "Halt"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Backpack",
               "baseApiCommand": "MessageStreamWrite"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Backpack",
               "baseApiCommand": "GetSerialSensorValues"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamStopStreaming"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamRenameMap"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamSetCurrentMap"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamSetIrExposureAndGain"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamSetVisibleExposureAndGain"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamStartStreaming"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamDeleteMap"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamGetMaps"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamGetCurrentMap"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamGetIrExposureAndGain"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Navigation",
               "baseApiCommand": "SlamGetVisibleExposureAndGain"
               }
        }
        ]

}

var expert = {
    "expertCommands": [ 
        {
         "apiCommand": {
            "apiCommandGroup": "System",
            "baseApiCommand": "PerformSystemUpdate"
            }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "ConnectToSavedWifi"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "SetNetworkConnection"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "ForgetWifi"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "GetAvailableWifiNetworks"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "GetBatteryLevel"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "GetHelp"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "GetManufacturingModeEnabled"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "System",
               "baseApiCommand": "GetSavedWifiNetworks"
               }
        },
        {
            "apiCommand": {
               "apiCommandGroup": "Skills",
               "baseApiCommand": "DeleteSkill"
               }
        },
        ]

}