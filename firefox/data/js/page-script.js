/**
 * This script should take of all communication between firefox and the report app.
 */


function onMessageFromApp(event) {
    if (event.data && event.data.from === 'app') {
        var message = event.data.message;
        var data = event.data.data;
        //alert('sending message ' + message);
        self.port.emit(message, data); // Sends the message to the background page.
    }
}
window.addEventListener('message', onMessageFromApp);

function sendMessageToApp(messageName, data) {
    window.postMessage({from: 'script', message: messageName, data: data}, window.location.origin);
}

function registerListenerFromBackground(messageName) {
    self.port.on(messageName, function (data) {
        sendMessageToApp(messageName, data);
    });
}
self.port.on('init', function (data) {
    sendMessageToApp('screenshot', data.screenshot);
    sendMessageToApp('tabUrl', data.tabUrl);
    sendMessageToApp('reports', data.reports);
});

registerListenerFromBackground('postReportSuccess');
registerListenerFromBackground('postReportError');
