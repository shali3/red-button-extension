/**
 * This script should take of all communication between firefox and the report app.
 */


self.port.on('init', function (data) {
    init_data = data;
    window.postMessage(data, window.location.origin);
});