/**
 * This file is VisualPDDL API JSON file
 * The site utilizes this JSON file to get commands to populate the Blockly framework
 *
 * MODIFIED:
 *    By team of VisualPDDL project (JUN-2021)
 *
 * ORIGIN:
 *    Apache 2.0 License - Copyright 2020 Misty Robotics
 *    Created/Revised April 2020 by Matthew Hageman, Caden Kulp and Caleb Richardson 
 *
 */

var vpddlAPI = {
    "result": {
        "get": [
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": ""
                        },
                        "base64": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Base64",
                            "ordinalNumber": 1,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetAudioFile",
                    "name": "GetAudioFile",
                    "resultType": "Misty.HomeRobot.Api.Commands.ResponseObjects.AudioResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetAudioFile",
                "endpoint": "audio"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetCameraData",
                    "name": "GetCameraData",
                    "resultType": "Misty.HomeRobot.Robot.CameraInformation, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetCameraData",
                "endpoint": "camera"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "SlamGetNavigationDiagnostics",
                    "name": "GetSlamNavigationDiagnostics",
                    "resultType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamGetNavigationDiagnostics",
                "endpoint": "slam/diagnostics"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Events",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetWebsocketVersion",
                    "name": "GetWebsocketVersion",
                    "resultType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetWebsocketVersion",
                "endpoint": "websocket/version"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "SlamGetMaps",
                    "name": "GetSlamMaps",
                    "resultType": "System.Collections.Generic.IList`1[[Misty.HomeRobot.MapIdentifier, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamGetMaps",
                "endpoint": "slam/map/ids"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamGetDepthImage",
                    "name": "TakeDepthPicture",
                    "resultType": "Misty.HomeRobot.Robot.DepthImageInformation, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SlamGetDepthImage",
                "endpoint": "cameras/depth"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "base64": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Base64",
                            "ordinalNumber": 0,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamGetVisibleImage",
                    "name": "TakeFisheyePicture",
                    "resultType": "Misty.HomeRobot.Api.Commands.ResponseObjects.ImageResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SlamGetVisibleImage",
                "endpoint": "cameras/fisheye"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "GetVideoFile",
                    "name": "GetVideoFile",
                    "resultType": "Misty.HomeRobot.Services.Api.Commands.ResponseObjects.VideoResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetVideoFile",
                "endpoint": "video"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetAvailableWifiNetworks",
                    "name": "GetAvailableWifiNetworks",
                    "resultType": "System.Collections.Generic.List`1[[Misty.HomeRobot.Services.Communication.WiFiNetworkScanResult, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetAvailableWifiNetworks",
                "endpoint": "networks/scan"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetBatteryLevel",
                    "name": "GetBatteryLevel",
                    "resultType": "Misty.HomeRobot.Robot.SensoryMessages.BatteryChargeMessage, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetBatteryLevel",
                "endpoint": "battery"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetDeviceInformation",
                    "name": "GetDeviceInformation",
                    "resultType": "Misty.HomeRobot.Robot.RobotDeviceInformation, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetDeviceInformation",
                "endpoint": "device"
            },

            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": ""
                        },
                        "base64": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Base64",
                            "ordinalNumber": 1,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetImage",
                    "name": "GetImage",
                    "resultType": "Misty.HomeRobot.Api.Commands.ResponseObjects.ImageResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetImage",
                "endpoint": "images"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetLearnedFaces",
                    "name": "GetKnownFaces",
                    "resultType": "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetLearnedFaces",
                "endpoint": "faces"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetListOfAudioFiles",
                    "name": "GetAudioList",
                    "resultType": "System.Collections.Generic.List`1[[Misty.HomeRobot.Api.Commands.ResponseObjects.AudioDataResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetListOfAudioFiles",
                "endpoint": "audio/list"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetListOfImages",
                    "name": "GetImageList",
                    "resultType": "System.Collections.Generic.IList`1[[Misty.HomeRobot.Api.Commands.ResponseObjects.ImageDataResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetListOfImages",
                "endpoint": "images/list"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "date": {
                            "getValueType": "System.DateTime, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Date",
                            "ordinalNumber": 0,
                            "value": "2019-09-24T00:00:00Z"
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetLogFile",
                    "name": "GetLogFile",
                    "resultType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetLogFile",
                "endpoint": "logs"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetManufacturingModeEnabled",
                    "name": "GetManufacturingModeEnabled",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetManufacturingModeEnabled",
                "endpoint": "manufacturing/enabled"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 35000,
                    "commandType": "Information",
                    "id": "SlamGetMap",
                    "name": "GetMap",
                    "resultType": "Misty.HomeRobot.OccupancyGrid, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SlamGetMap",
                "endpoint": "slam/map"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetRunningSkills",
                    "name": "GetRunningSkills",
                    "resultType": "System.Collections.Generic.List`1[[Misty.HomeRobot.Api.Commands.ResponseObjects.RunningSkillResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetRunningSkills",
                "endpoint": "skills/running"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetSavedWifiNetworks",
                    "name": "GetSavedWifiNetworks",
                    "resultType": "System.Collections.Generic.List`1[[Misty.HomeRobot.Services.Communication.WiFiNetworkConfiguration, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetSavedWifiNetworks",
                "endpoint": "networks"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Backpack",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetSerialSensorValues",
                    "name": "GetSerialSensorValues",
                    "resultType": "System.Collections.Generic.IList`1[[System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetSerialSensorValues",
                "endpoint": "serial"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetSkills",
                    "name": "GetSkills",
                    "resultType": "System.Collections.Generic.List`1[[Misty.HomeRobot.Skills.IRobotSkill, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetSkills",
                "endpoint": "skills"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetStoreUpdateAvailable",
                    "name": "GetStoreUpdateAvailable",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetStoreUpdateAvailable",
                "endpoint": "system/updates"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Events",
                    "arguments": {
                        "websocketClass": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "WebsocketClass",
                            "ordinalNumber": 0,
                            "value": ""
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "GetWebsocketHelp",
                    "name": "GetWebsocketNames",
                    "resultType": "System.Collections.Generic.List`1[[Misty.HomeRobot.Api.Commands.ResponseObjects.WebSocketHelpResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "GetWebsocketHelp",
                "endpoint": "websockets"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "x": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "X",
                            "ordinalNumber": 0,
                            "value": 0
                        },
                        "y": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Y",
                            "ordinalNumber": 1,
                            "value": 0
                        },
                        "minGap": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "MinGap",
                            "ordinalNumber": 2,
                            "value": 0.0
                        },
                        "wallCostDistance": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "WallCostDistance",
                            "ordinalNumber": 3,
                            "value": 0.0
                        },
                        "unknownIsOpen": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "UnknownIsOpen",
                            "ordinalNumber": 4,
                            "value": false
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 60000,
                    "commandType": "Information",
                    "id": "SlamGetPath",
                    "name": "GetSlamPath",
                    "resultType": "System.Collections.Generic.IList`1[[Misty.HomeRobot.GridCell, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamGetPath",
                "endpoint": "slam/path"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "SlamGetStatus",
                    "name": "GetSlamStatus",
                    "resultType": "Misty.HomeRobot.Robot.SensoryMessages.SlamStatus, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SlamGetStatus",
                "endpoint": "slam/status"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {},
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "GetBlinkSettings",
                    "name": "GetBlinkSettings",
                    "resultType": "Misty.HomeRobot.Api.Commands.ResponseObjects.BlinkImageSettingsResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "GetBlinkSettings",
                "endpoint": "blink/settings"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamGetCurrentMap",
                    "name": "GetCurrentSlamMap",
                    "resultType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamGetCurrentMap",
                "endpoint": "slam/map/current"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamGetIrExposureAndGain",
                    "name": "GetSlamIrExposureAndGain",
                    "resultType": "Misty.HomeRobot.ExposureAndGain, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SlamGetIrExposureAndGain",
                "endpoint": "slam/settings/ir"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamGetVisibleExposureAndGain",
                    "name": "GetSlamVisibleExposureAndGain",
                    "resultType": "Misty.HomeRobot.ExposureAndGain, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SlamGetVisibleExposureAndGain",
                "endpoint": "slam/settings/visible"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {
                        "base64": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Base64",
                            "ordinalNumber": 0,
                            "value": false
                        },
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "width": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Width",
                            "ordinalNumber": 2,
                            "value": null
                        },
                        "height": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Height",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "displayOnScreen": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "DisplayOnScreen",
                            "ordinalNumber": 4,
                            "value": false
                        },
                        "overwriteExisting": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "OverwriteExisting",
                            "ordinalNumber": 5,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 35000,
                    "commandType": "Action",
                    "id": "TakePicture",
                    "name": "TakePicture",
                    "resultType": "Misty.HomeRobot.Api.Commands.ResponseObjects.ImageResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "TakePicture",
                "endpoint": "cameras/rgb"
            }
        ],
        "post": [
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "components": {
                            "getValueType": "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Components",
                            "ordinalNumber": 0,
                            "value": []
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "PerformTargetedUpdate",
                    "name": "PerformTargetedUpdate",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "PerformTargetedUpdate",
                "endpoint": "system/update/component"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "core": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Core",
                            "ordinalNumber": 0,
                            "value": false
                        },
                        "sensoryServices": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "SensoryServices",
                            "ordinalNumber": 1,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "RestartRobot",
                    "name": "RestartRobot",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "RestartRobot",
                "endpoint": "reboot"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "volume": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Volume",
                            "ordinalNumber": 0,
                            "value": -1
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SetDefaultVolume",
                    "name": "SetDefaultVolume",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetDefaultVolume",
                "endpoint": "audio/volume"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Events",
                    "arguments": {
                        "version": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Version",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SetWebsocketVersion",
                    "name": "SetWebsocketVersion",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetWebsocketVersion",
                "endpoint": "websocket/version"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Backpack",
                    "arguments": {
                        "message": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Message",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "MessageStreamWrite",
                    "name": "WriteSerial",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "MessageStreamWrite",
                "endpoint": "serial"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "on": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "On",
                            "ordinalNumber": 0,
                            "value": false
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SetFlashlight",
                    "name": "SetFlashlight",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetFlashlight",
                "endpoint": "flashlight"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamStopStreaming",
                    "name": "StopSlamStreaming",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamStopStreaming",
                "endpoint": "slam/streaming/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StartRecordingVideo",
                    "name": "StartRecordingVideo",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StartRecordingVideo",
                "endpoint": "video/record/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StopRecordingVideo",
                    "name": "StopRecordingVideo",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StopRecordingVideo",
                "endpoint": "video/record/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "PerformSystemUpdate",
                    "name": "PerformSystemUpdate",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "PerformSystemUpdate",
                "endpoint": "system/update"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamReset",
                    "name": "ResetSlam",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamReset",
                "endpoint": "slam/reset"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {
                        "skill": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Skill",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "CancelSkill",
                    "name": "CancelSkill",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "CancelSkill",
                "endpoint": "skills/cancel"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "ClearDisplayText",
                    "name": "ClearDisplayText",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "ClearDisplayText",
                "endpoint": "text/clear"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "networkId": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "NetworkId",
                            "ordinalNumber": 0,
                            "value": 0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "ConnectToSavedWifi",
                    "name": "ConnectToSavedWifi",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "ConnectToSavedWifi",
                "endpoint": "networks"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "networkName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "NetworkName",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "password": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Password",
                            "ordinalNumber": 1,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SetNetworkConnection",
                    "name": "ConnectWiFi",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetNetworkConnection",
                "endpoint": "networks/create"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {
                        "skill": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Skill",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "method": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Method",
                            "ordinalNumber": 1,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "RunSkill",
                    "name": "RunSkill",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "RunSkill",
                "endpoint": "skills/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "data": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Data",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "immediatelyApply": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "ImmediatelyApply",
                            "ordinalNumber": 2,
                            "value": false
                        },
                        "overwriteExisting": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "OverwriteExisting",
                            "ordinalNumber": 3,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SaveAudioAssetToRobot",
                    "name": "SaveAudio",
                    "resultType": "System.Collections.Generic.IList`1[[Misty.HomeRobot.Api.Commands.ResponseObjects.IAssetResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SaveAudioAssetToRobot",
                "endpoint": "audio"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "data": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Data",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "width": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Width",
                            "ordinalNumber": 2,
                            "value": null
                        },
                        "height": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Height",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "immediatelyApply": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "ImmediatelyApply",
                            "ordinalNumber": 4,
                            "value": false
                        },
                        "overwriteExisting": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "OverwriteExisting",
                            "ordinalNumber": 5,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SaveImageAssetToRobot",
                    "name": "SaveImage",
                    "resultType": "System.Collections.Generic.IList`1[[Misty.HomeRobot.Api.Commands.ResponseObjects.IAssetResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SaveImageAssetToRobot",
                "endpoint": "images"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {
                        "file": {
                            "getValueType": "System.Byte[], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "File",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "overwriteExisting": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "OverwriteExisting",
                            "ordinalNumber": 1,
                            "value": true
                        },
                        "uniqueId": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "UniqueId",
                            "ordinalNumber": 2,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 60000,
                    "commandType": "Configuration",
                    "id": "SaveSkillFiles",
                    "name": "SaveSkillFiles",
                    "resultType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SaveSkillFiles",
                "endpoint": "skills"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "blink": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Blink",
                            "ordinalNumber": 0,
                            "value": false
                        }
                    },
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SetBlinking",
                    "name": "SetBlinking",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetBlinking",
                "endpoint": "blink"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "revertToDefault": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "RevertToDefault",
                            "ordinalNumber": 0,
                            "value": false
                        },
                        "closedEyeMinMs": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "ClosedEyeMinMs",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "closedEyeMaxMs": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "ClosedEyeMaxMs",
                            "ordinalNumber": 2,
                            "value": null
                        },
                        "openEyeMinMs": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "OpenEyeMinMs",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "openEyeMaxMs": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "OpenEyeMaxMs",
                            "ordinalNumber": 4,
                            "value": null
                        },
                        "blinkImages": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "BlinkImages",
                            "ordinalNumber": 5,
                            "value": null
                        }
                    },
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SetBlinkSettings",
                    "name": "SetBlinkSettings",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetBlinkSettings",
                "endpoint": "blink/settings"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "revertToDefault": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "RevertToDefault",
                            "ordinalNumber": 0,
                            "value": false
                        },
                        "ledEnabled": {
                            "getValueType": "System.Nullable`1[[System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "LEDEnabled",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "keyPhraseEnabled": {
                            "getValueType": "System.Nullable`1[[System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "KeyPhraseEnabled",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "keyPhraseFile": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "KeyPhraseFile",
                            "ordinalNumber": 4,
                            "value": null
                        }
                    },
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SetNotificationSettings",
                    "name": "SetNotificationSettings",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SetNotificationSettings",
                "endpoint": "notification/settings"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "key": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Key",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "name": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Name",
                            "ordinalNumber": 1,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamRenameMap",
                    "name": "RenameSlamMap",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamRenameMap",
                "endpoint": "slam/map/rename"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "key": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Key",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamSetCurrentMap",
                    "name": "SetCurrentSlamMap",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamSetCurrentMap",
                "endpoint": "slam/map/current"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "exposure": {
                            "getValueType": "System.Single, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Exposure",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "gain": {
                            "getValueType": "System.Single, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Gain",
                            "ordinalNumber": 1,
                            "value": 0.0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamSetIrExposureAndGain",
                    "name": "SetSlamIrExposureAndGain",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamSetIrExposureAndGain",
                "endpoint": "slam/settings/ir"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "exposure": {
                            "getValueType": "System.Single, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Exposure",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "gain": {
                            "getValueType": "System.Single, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Gain",
                            "ordinalNumber": 1,
                            "value": 0.0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamSetVisibleExposureAndGain",
                    "name": "SetSlamVisibleExposureAndGain",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamSetVisibleExposureAndGain",
                "endpoint": "slam/settings/visible"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {
                        "skill": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Skill",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "eventName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "EventName",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "payload": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Payload",
                            "ordinalNumber": 2,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "TriggerSkillEvent",
                    "name": "TriggerSkillEvent",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "TriggerSkillEvent",
                "endpoint": "skills/event"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "bumpSensorsEnabled": {
                            "getValueType": "System.Collections.Generic.Dictionary`2[[System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "BumpSensorsEnabled",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "timeOfFlightThresholds": {
                            "getValueType": "System.Collections.Generic.Dictionary`2[[System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "TimeOfFlightThresholds",
                            "ordinalNumber": 1,
                            "value": null
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "UpdateBaseHazardManagementSettings",
                    "name": "UpdateBaseHazardManagementSettings",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "UpdateBaseHazardManagementSettings",
                "endpoint": "hazard/updatebasesettings"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "CancelFaceTraining",
                    "name": "CancelFaceTraining",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "CancelFaceTraining",
                "endpoint": "faces/training/cancel"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "alpha": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Alpha",
                            "ordinalNumber": 1,
                            "value": 1.0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "ChangeDisplayImage",
                    "name": "DisplayImage",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "ChangeDisplayImage",
                "endpoint": "images/display"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "red": {
                            "getValueType": "System.Byte, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Red",
                            "ordinalNumber": 0,
                            "value": 0
                        },
                        "green": {
                            "getValueType": "System.Byte, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Green",
                            "ordinalNumber": 1,
                            "value": 0
                        },
                        "blue": {
                            "getValueType": "System.Byte, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Blue",
                            "ordinalNumber": 2,
                            "value": 0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "ChangeLED",
                    "name": "ChangeLED",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "ChangeLED",
                "endpoint": "led"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "linearVelocity": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=null",
                            "name": "LinearVelocity",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "angularVelocity": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=null",
                            "name": "AngularVelocity",
                            "ordinalNumber": 1,
                            "value": 0.0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "DriveXXX",
                    "name": "DriveXXX",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "DriveXXX",
                "endpoint": "drive"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "linearVelocity": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "LinearVelocity",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "angularVelocity": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "AngularVelocity",
                            "ordinalNumber": 1,
                            "value": 0.0
                        },
                        "timeMs": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "TimeMs",
                            "ordinalNumber": 2,
                            "value": 0
                        },
                        "degree": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Degree",
                            "ordinalNumber": 3,
                            "value": 0.0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "DriveTime",
                    "name": "DriveTime",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "DriveTime",
                "endpoint": "drive/time"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "destination": {
                            "getValueType": "System.Collections.Generic.List`1[[Misty.HomeRobot.GridCell, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Destination",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "DriveToLocation",
                    "name": "DriveToLocationActionPlan",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "DriveToLocation",
                "endpoint": "drive/coordinates"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "path": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Path",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "velocity": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Velocity",
                            "ordinalNumber": 1,
                            "value": 0.0
                        },
                        "fullSpinDuration": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FullSpinDuration",
                            "ordinalNumber": 2,
                            "value": 0.0
                        },
                        "waypointAccuracy": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "WaypointAccuracy",
                            "ordinalNumber": 3,
                            "value": 0.0
                        },
                        "rotateThreshold": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "RotateThreshold",
                            "ordinalNumber": 4,
                            "value": 0.0
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "FollowPath",
                    "name": "FollowPath",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "FollowPath",
                "endpoint": "drive/path"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "motorMask": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "MotorMask",
                            "ordinalNumber": 0,
                            "value": 65535
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "Halt",
                    "name": "Halt",
                    "resultType": "Misty.HomeRobot.Brain.MotorControlCommand, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "Halt",
                "endpoint": "halt"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "leftTrackSpeed": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "LeftTrackSpeed",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "rightTrackSpeed": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "RightTrackSpeed",
                            "ordinalNumber": 1,
                            "value": 0.0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "LocomotionTrack",
                    "name": "DriveTrack",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "LocomotionTrack",
                "endpoint": "drive/track"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "arm": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Arm",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "position": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Position",
                            "ordinalNumber": 1,
                            "value": 0.0
                        },
                        "velocity": {
                            "getValueType": "System.Nullable`1[[System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Velocity",
                            "ordinalNumber": 2,
                            "value": null
                        },
                        "duration": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Duration",
                            "ordinalNumber": 3,
                            "value": 0.0
                        },
                        "units": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Units",
                            "ordinalNumber": 4,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "MoveArm",
                    "name": "MoveArm",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "MoveArm",
                "endpoint": "arms"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "leftArmPosition": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "LeftArmPosition",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "rightArmPosition": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "RightArmPosition",
                            "ordinalNumber": 1,
                            "value": 0.0
                        },
                        "leftArmVelocity": {
                            "getValueType": "System.Nullable`1[[System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "LeftArmVelocity",
                            "ordinalNumber": 2,
                            "value": null
                        },
                        "rightArmVelocity": {
                            "getValueType": "System.Nullable`1[[System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "RightArmVelocity",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "duration": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Duration",
                            "ordinalNumber": 4,
                            "value": 0.0
                        },
                        "units": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Units",
                            "ordinalNumber": 5,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "MoveArms",
                    "name": "MoveArms",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "MoveArms",
                "endpoint": "arms/set"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "pitch": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Pitch",
                            "ordinalNumber": 0,
                            "value": 0.0
                        },
                        "roll": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Roll",
                            "ordinalNumber": 1,
                            "value": 0.0
                        },
                        "yaw": {
                            "getValueType": "System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Yaw",
                            "ordinalNumber": 2,
                            "value": 0.0
                        },
                        "velocity": {
                            "getValueType": "System.Nullable`1[[System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Velocity",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "duration": {
                            "getValueType": "System.Nullable`1[[System.Double, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Duration",
                            "ordinalNumber": 4,
                            "value": null
                        },
                        "units": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Units",
                            "ordinalNumber": 5,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "MoveHead",
                    "name": "MoveHead",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "MoveHead",
                "endpoint": "head"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "volume": {
                            "getValueType": "System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Volume",
                            "ordinalNumber": 1,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "PlayAudioClip",
                    "name": "PlayAudioClip",
                    "resultType": "Misty.HomeRobot.Robot.AudioActionCommand, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "PlayAudioClip",
                "endpoint": "audio/play"
            },
            {
                "apiCommand":{
                    "apiCommandGroup": "Expression",
                    "arguments":{
                        "text":{
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Text",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "flush":{
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Flush",
                            "ordinalNumber": 1,
                            "value": false
                        },
                        "utteranceId":{
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "UtteranceId",
                            "ordinalNumber": 2,
                            "value": null
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "Speak",
                    "name": "Speak",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "Speak",
                "endpoint": "tts/speak"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Requests",
                    "arguments": {
                        "method": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Method",
                            "ordinalNumber": 0,
                            "value": null
                        },
                        "resource": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Resource",
                            "ordinalNumber": 1,
                            "value": null
                        },
                        "authorizationType": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "AuthorizationType",
                            "ordinalNumber": 2,
                            "value": null
                        },
                        "token": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Token",
                            "ordinalNumber": 3,
                            "value": null
                        },
                        "arguments": {
                            "getValueType": "System.Byte, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Arguments",
                            "ordinalNumber": 4,
                            "value": 0
                        },
                        "save": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Save",
                            "ordinalNumber": 5,
                            "value": false
                        },
                        "apply": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Apply",
                            "ordinalNumber": 6,
                            "value": false
                        },
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 7,
                            "value": null
                        },
                        "contentType": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "ContentType",
                            "ordinalNumber": 8,
                            "value": null
                        }
                    },
                    "category": "Alpha",
                    "commandTimeout": 60000,
                    "commandType": "Action",
                    "id": "SendExternalRequest",
                    "name": "SendExternalRequest",
                    "resultType": "Misty.HomeRobot.Api.ApiRequestGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "SendExternalRequest",
                "endpoint": "request"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamStartMapping",
                    "name": "StartMapping",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamStartMapping",
                "endpoint": "slam/map/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamStartStreaming",
                    "name": "StartSlamStreaming",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamStartStreaming",
                "endpoint": "slam/streaming/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamStartTracking",
                    "name": "StartTracking",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamStartTracking",
                "endpoint": "slam/track/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamStopMapping",
                    "name": "StopMapping",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamStopMapping",
                "endpoint": "slam/map/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {},
                    "category": "Alpha",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "SlamStopTracking",
                    "name": "StopSlamTracking",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamStopTracking",
                "endpoint": "slam/track/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StartFaceDetection",
                    "name": "StartFaceDetection",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StartFaceDetection",
                "endpoint": "faces/detection/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StartFaceRecognition",
                    "name": "StartFaceRecognition",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StartFaceRecognition",
                "endpoint": "faces/recognition/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {
                        "faceId": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FaceId",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StartFaceTraining",
                    "name": "StartFaceTraining",
                    "resultType": "Misty.HomeRobot.Api.Commands.ResponseObjects.StartFaceTrainingResponse, Misty.HomeRobot.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "StartFaceTraining",
                "endpoint": "faces/training/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StartKeyPhraseRecognition",
                    "name": "StartKeyPhraseRecognition",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StartKeyPhraseRecognition",
                "endpoint": "audio/keyphrase/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StartRecordingAudio",
                    "name": "StartRecordingAudio",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StartRecordingAudio",
                "endpoint": "audio/record/start"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "PDDLCore",
                    "arguments": {
                        "hold": {
                            "getValueType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Hold",
                            "ordinalNumber": 0,
                            "value": false
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "Stop",
                    "name": "Stop",
                    "resultType": "Misty.HomeRobot.Kinematics.CommandGroup, Misty.HomeRobot, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
                },
                "baseApiCommand": "Stop",
                "endpoint": "drive/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StopFaceDetection",
                    "name": "StopFaceDetection",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StopFaceDetection",
                "endpoint": "faces/detection/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StopFaceRecognition",
                    "name": "StopFaceRecognition",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StopFaceRecognition",
                "endpoint": "faces/recognition/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Expression",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StopKeyPhraseRecognition",
                    "name": "StopKeyPhraseRecognition",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StopKeyPhraseRecognition",
                "endpoint": "audio/keyphrase/stop"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {},
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "StopRecordingAudio",
                    "name": "StopRecordingAudio",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "StopRecordingAudio",
                "endpoint": "audio/record/stop"
            }
        ],
        "delete": [
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "networkId": {
                            "getValueType": "System.Int32, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "NetworkId",
                            "ordinalNumber": 0,
                            "value": 0
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Information",
                    "id": "ForgetWifi",
                    "name": "ForgetWifi",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "ForgetWifi",
                "endpoint": "networks"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "DeleteAudioAssetFromRobot",
                    "name": "DeleteAudio",
                    "resultType": "System.Collections.Generic.IList`1[[System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "DeleteAudioAssetFromRobot",
                "endpoint": "audio"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Assets",
                    "arguments": {
                        "fileName": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FileName",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "DeleteImageAssetFromRobot",
                    "name": "DeleteImage",
                    "resultType": "System.Collections.Generic.IList`1[[System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]], System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "DeleteImageAssetFromRobot",
                "endpoint": "images"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Skills",
                    "arguments": {
                        "skill": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Skill",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "DeleteSkill",
                    "name": "DeleteSkill",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "DeleteSkill",
                "endpoint": "skills"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "System",
                    "arguments": {
                        "blinkImages": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "BlinkImages",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Beta",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "RemoveBlinkMappings",
                    "name": "RemoveBlinkMappings",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "RemoveBlinkMappings",
                "endpoint": "blink/images"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Navigation",
                    "arguments": {
                        "key": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "Key",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Configuration",
                    "id": "SlamDeleteMap",
                    "name": "DeleteSlamMap",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "SlamDeleteMap",
                "endpoint": "slam/map"
            },
            {
                "apiCommand": {
                    "apiCommandGroup": "Perception",
                    "arguments": {
                        "faceId": {
                            "getValueType": "System.String, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e",
                            "name": "FaceId",
                            "ordinalNumber": 0,
                            "value": null
                        }
                    },
                    "category": "Current",
                    "commandTimeout": 20000,
                    "commandType": "Action",
                    "id": "ClearLearnedFaces",
                    "name": "ForgetFaces",
                    "resultType": "System.Boolean, System.Private.CoreLib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e"
                },
                "baseApiCommand": "ClearLearnedFaces",
                "endpoint": "faces"
            }
        ],
        "put": []
    },
    "status": "Success"
}