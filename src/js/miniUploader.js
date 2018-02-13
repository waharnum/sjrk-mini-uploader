/* global fluid */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.miniUploader", {
        gradeNames: ["fluid.viewComponent"],
        events: {
            onMarkupAppended: null,
            onFileListChanged: null
        },
        listeners: {
            "onCreate.appendMarkup": {
                "this": "{that}.container",
                "method": "append",
                "args": ["<div class='sjrkc-mini-uploader-fileInputContainer'></div><div class='sjrkc-mini-uploader-previewer'></div>"]
            },
            "onCreate.fireOnMarkupAppended": {
                func: "{that}.events.onMarkupAppended.fire"
            }
        },
        components: {
            fileInput: {
                type: "sjrk.miniUploader.fileInput",
                container: ".sjrkc-mini-uploader-fileInputContainer",
                createOnEvent: "{miniUploader}.events.onMarkupAppended",
                options: {
                    listeners: {
                        "onFileListChanged.escalate": {
                            func: "{miniUploader}.events.onFileListChanged.fire"
                        }
                    }
                }
            },
            previewer: {
                type: "sjrk.miniUploader.previewer",
                container: ".sjrkc-mini-uploader-previewer",
                createOnEvent: "{miniUploader}.events.onMarkupAppended",
                options: {
                    listeners: {
                        "{miniUploader}.events.onFileListChanged": {
                            func: "{that}.previewFiles",
                            args: "{fileInput}.fileList"
                        }
                    }
                }
            }
        }
    });

    fluid.defaults("sjrk.miniUploader.fileInput", {
        gradeNames: ["fluid.viewComponent"],
        members: {
            fileList: null
        },
        events: {
            onFileListChanged: null
        },
        selectors: {
            fileInput: ".sjrkc-mini-uploader-fileInputContainer-input"
        },
        listeners: {
            "onCreate.appendMarkup": {
                "this": "{that}.container",
                "method": "append",
                "args": ["<input class='sjrkc-mini-uploader-fileInputContainer-input' type='file'></input>"]
            },
            "onCreate.addChangeListener": {
                "this": "{that}.dom.fileInput",
                "method": "change",
                "args": ["{that}.handleFileInputChange"]
            }
        },
        invokers: {
            "handleFileInputChange": {
                funcName: "sjrk.miniUploader.fileInput.handleFileInputChange",
                args: ["{that}", "{that}.dom.fileInput"]
            }
        }
    });

    sjrk.miniUploader.fileInput.handleFileInputChange = function (that, fileInput) {
        var fileList = fileInput[0].files;
        that.fileList = fileList;
        that.events.onFileListChanged.fire();
    };

    fluid.defaults("sjrk.miniUploader.previewer", {
        gradeNames: ["fluid.viewComponent"],
        invokers: {
            previewFiles: {
                funcName: "sjrk.miniUploader.previewer.previewFiles",
                args: ["{that}", "{arguments}.0"]
            }
        },
        listeners: {
            "onCreate.appendMarkup": {
                "this": "{that}.container",
                "method": "append",
                "args": ["<div class='sjrkc-previewer-previewItem'></div>"]
            },
        },
        selectors: {
            previewItem: ".sjrkc-previewer-previewItem"
        },
        strings: {
            previewTemplates: {
                "image": "<img class='sjrkc-previewer-previewItem-image sjrk-previewer-previewItem-image' alt='' src='%objectURL' />"
            }
        }
    });

    sjrk.miniUploader.previewer.previewFiles = function (that, fileList) {
        // FileList is a "pseudo" array
        for(var i=0; i < fileList.length; i++) {
            var currentFile = fileList[i];
            var mimeType = currentFile.type;
            var type = mimeType.split("/")[0];
            var subType = mimeType.split("/")[1];

            if(that.options.strings.previewTemplates[type] || that.options.strings.previewTemplates[subType]) {
                var useTemplate = that.options.strings.previewTemplates[subType] ? that.options.strings.previewTemplates[subType] : that.options.strings.previewTemplates[type];
                var objectURL = URL.createObjectURL(currentFile);
                var previewItemMarkup = fluid.stringTemplate(useTemplate, {objectURL: objectURL});
                that.locate("previewItem").html(previewItemMarkup);
            } else {
                that.locate("previewItem").empty();
            }
        }
    };
})(jQuery, fluid);
