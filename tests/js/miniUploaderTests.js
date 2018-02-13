/* global fluid, jqUnit, projectTemplate */

(function ($, fluid) {

    "use strict";

    // Basic non-IoC synchronous test
    jqUnit.test("Test message content", function () {
        var projectComponent = sjrk.miniUploader("#sjrk-mini-uploader");
        jqUnit.expect(0);        
    });

    // // Basic non-IoC asyc test
    // jqUnit.asyncTest("Test message content", function () {
    //     jqUnit.expect(1);
    //
    //     sjrk.miniUploader({
    //         listeners: {
    //             "onAnnounceComplete.testMessageContent": {
    //                 "this": "jqUnit",
    //                 "method": "assertEquals",
    //                 "args": ["Test message has expected content", "Hello, world", "{that}.model.message"]
    //             },
    //             "onAnnounceComplete.testDone": {
    //                 "this": "jqUnit",
    //                 "method": "start",
    //                 "priority": "after:testMessageContent"
    //             }
    //         }
    //     });
    // });
    //
    // // Basic IoC test structure
    //
    // fluid.defaults("sjrk.miniUploaderTester", {
    //     gradeNames: ["fluid.test.testCaseHolder"],
    //     modules: [{
    //         name: "Test the sjrk.miniUploader component.",
    //         tests: [{
    //             name: "Test message content and changes.",
    //             sequence: [{
    //                 listener: "sjrk.miniUploaderTester.testMessageContent",
    //                 "event": "{projectComponentTest projectComponent}.events.onCreate",
    //                 args: ["{projectComponent}", "Hello, world"]
    //             }]
    //         }]
    //     }]
    // });
    //
    // fluid.defaults("projectTemplate.tests.projectComponentTest", {
    //     gradeNames: ["fluid.test.testEnvironment"],
    //     components: {
    //         projectComponent: {
    //             type: "sjrk.miniUploader",
    //             createOnEvent: "{projectComponentTester}.events.onTestCaseStart"
    //         },
    //         projectComponentTester: {
    //             type: "sjrk.miniUploaderTester"
    //         }
    //     }
    // });
    //
    // sjrk.miniUploaderTester.testMessageContent = function (component, expectedMessage) {
    //     jqUnit.assertEquals("Test message has expected content", expectedMessage, component.model.message);
    // };
    //
    // projectTemplate.tests.projectComponentTest();

})(jQuery, fluid);
