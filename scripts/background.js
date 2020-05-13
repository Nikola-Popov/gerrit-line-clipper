'use strict';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const lineNumber = request.lineNumber;
        const file = request.file;

        if (file.endsWith(javaSuffix)) {
            sendResponse({ message: `${toFullPath(file)}:${lineNumber}` });
        } else {
            sendResponse({ message: `${file}` });
        }
    }
);
