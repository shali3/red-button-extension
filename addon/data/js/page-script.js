/**
 * This script should take of all communication between firefox and the report app.
 */

function sendMessage(messageName, data) {
    window.postMessage({message: messageName, data: data}, window.location.origin);
}

self.port.on('init', function (data) {
    sendMessage('screenshot', data.screenshot);
    sendMessage('tabUrl', data.tabUrl);
    sendMessage('reports', data.reports);
});