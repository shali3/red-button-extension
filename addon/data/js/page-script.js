/**
 * This script should take of all communication between firefox and the report app.
 */


function onMessage(event) {
    if (event.data && event.data.from === 'app') {
        var message = event.data.message;
        var data = event.data.data;
        if (listener[message]) {
            if (listener[message]) {
                listener[message](data);
            }
        }
    }
}
function sendMessage(messageName, data) {
    window.postMessage({from: 'script', message: messageName, data: data}, window.location.origin);
}

window.addEventListener('message', onMessage);
self.port.on('init', function (data) {
    sendMessage('screenshot', data.screenshot);
    sendMessage('tabUrl', data.tabUrl);
    sendMessage('reports', data.reports);
});

var listener = {
    close: function () {
        self.port.emit('close', null);
    }
};