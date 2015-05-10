var buttons = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var _ = require("sdk/l10n").get;
var abstraction = require("./abstraction");
var tabs = require("sdk/tabs");
var { setTimeout, clearTimeout } = require("sdk/timers");

var screenshots = require("./screenshot");
var service = require("./service");

var button = buttons.ToggleButton({
    id: "red-button",
    label: _("product_name"),
    icon: {
        "16": "./images/icon-16.png",
        "32": "./images/icon-32.png"
        //"64": "./images/icon-64.png" TODO: Add icon-64
    },
    onChange: handleChange
});

var panel;

function handleChange(state) {
    if (state.checked) {

        var imageDataUri = screenshots.captureTab();
        var tabUri = screenshots.getCurrentURI();

        const panelWidth = 350;
        panel = panels.Panel({
            contentURL: self.data.url("new_panel.html"),
            contentScriptFile: [
                self.data.url("js/page-script.js")
            ],
            width: panelWidth,
            height: 600,
            onHide: handleHide
        });

        panel.show({
            position: button
        });
        var reports = abstraction.getReports();

        panel.port.emit('init', {
            screenshot: imageDataUri,
            url: tabUri,
            strings: {
                comment_field_placeholder: _('comment_field_placeholder'),
                passcode_placeholder: _('passcode_placeholder'),
                close_button: _('close_button'),
                sending: _('sending'),
                send_button: _('send_button'),
                no_report_code: _('no_report_code')
            },
            reports: reports
        });
        panel.port.on('close', function () {
            handleHide();
        });
        panel.port.on('heightChanged', function (height) {
            panel.resize(panelWidth, height + 20);
        });

        panel.port.on('postReport', function (report) {
            service.postReport(report, function (response) {
                panel.port.emit('postReportSuccess', response);
                if (report.code) {
                    setTimeout(function () {
                        tabs.open({url: 'http://redbutton.org.il/casenumberintro?id=' + response + '&code=' + report.code + ''});
                    }, 3000);
                }
            }, function (error) {
                panel.port.emit('postReportError', error);
            });
        });
        panel.port.on('viewReport', function (report) {
            tabs.open({
                url: "http://redbutton.org.il/redbuttonstatus/",
                onReady: function (tab) {
                    tab.attach({
                        contentScriptFile: [
                            self.data.url("js/jquery-2.1.3.min.js"),
                            self.data.url("js/content-script.js")
                        ],
                        contentScriptOptions: report
                    });
                }
            });
        })
    }
}

function handleHide() {
    button.state('window', {checked: false});
    panel.destroy();
}