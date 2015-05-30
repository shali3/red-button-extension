var buttons = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var _ = require("sdk/l10n").get;
var tabs = require("sdk/tabs");
var { setTimeout, clearTimeout } = require("sdk/timers");

var listeners = require('./listeners');

var button = buttons.ToggleButton({
    id: "red-button",
    label: _("productName"),
    icon: {
        "16": "./images/icons/16.png",
        "32": "./images/icons/32.png",
        "64": "./images/icons/64.png"
    },
    onChange: handleChange
});

var panel;

function handleChange(state) {
    if (state.checked) {

        const panelWidth = 350;
        panel = panels.Panel({
            contentURL: './popup/index.html',
            contentScriptFile: ['./js/popup-messaging.js'],
            width: panelWidth,
            height: 600,
            onHide: handleHide
        });

        panel.show({
            position: button
        });

        panel.port.on('message', function (request) {
            if (request.message && listeners[request.message]) {
                var listener = listeners[request.message];

                listener(request.data, function (data) {
                        sendResponse(request.id, data);
                    },
                    function (error) {
                        sendError(request.id, error);
                    });
            }
            else {
                sendError(request.id, request.message ? 'Message Not Found' : 'Message should be specified');
            }
        })
    }
}

listeners.close = handleHide;

function sendResponse(id, data) {
    panel.port.emit('response', {id: id, data: data});
}

function sendError(id, error) {
    panel.port.emit('response', {id: id, error: error});
}

function handleHide(data, resolve) {
    button.state('window', {checked: false});
    panel.destroy();
    resolve();
}