/**
 * This script should take of all communication between firefox and the report app.
 */


function onMessageFromApp(event) {
    var request = event.data;
    if (request && request.from === 'app') {
        self.port.emit('message', request); // Sends the message to the background page.
    }
}

window.addEventListener('message', onMessageFromApp);
self.port.on('response', function (response) {
    window.postMessage({from: 'script', response: response}, window.location.origin);
});

// After everything is loaded we should say hello to the app.
window.postMessage({from: 'script', message: 'hello'}, window.location.origin);
