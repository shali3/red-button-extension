const { getURI,getTabContentWindow, getActiveTab } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');


function captureTab() {
    let tab = getActiveTab(getMostRecentBrowserWindow());
    let contentWindow = getTabContentWindow(tab);
    let { document } = contentWindow;

    let w = contentWindow.innerWidth;
    let h = contentWindow.innerHeight;
    let x = contentWindow.scrollX;
    let y = contentWindow.scrollY;

    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

    canvas.width = w;
    canvas.height = h;

    let ctx = canvas.getContext('2d');

    ctx.drawWindow(contentWindow, x, y, w, h, '#000');
    let dataURL = canvas.toDataURL();

    canvas = null;

    return dataURL;
}

function getCurrentURI() {
    let tab = getActiveTab(getMostRecentBrowserWindow());
    return getURI(tab);
}

exports.captureTab = captureTab;
exports.getCurrentURI = getCurrentURI;