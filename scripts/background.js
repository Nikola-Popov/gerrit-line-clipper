'use strict';

const javaSuffix = ".java";
const mavenFileStructurePattern = "src/(main|test)/java";
const sourcePattern = "src/";
const sapCorePreffixPattern = "com/sap/core";
const forwardSlashPattern = /\//g;

function isMavenStructured(path) {
    return path.search(mavenFileStructurePattern) !== -1;
}

function toIDEPathIfNeccessary(path) {
    let idePath = path;
    idePath = idePath.trim();
    if (isMavenStructured(idePath)) {
        idePath = idePath.slice(idePath.search(mavenFileStructurePattern));
    } else {
        idePath = idePath.slice(idePath.lastIndexOf(sourcePattern));
    }
    idePath = idePath.slice(idePath.indexOf(sapCorePreffixPattern));
    idePath = idePath.replace(forwardSlashPattern, ".");

    idePath = idePath.substring(0, idePath.lastIndexOf(javaSuffix));

    return idePath;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const lineNumber = request.lineNumber;
        const file = request.file;

        if (file.endsWith(javaSuffix)) {
            sendResponse({ message: `${toIDEPathIfNeccessary(file)}:${lineNumber}` });
        } else {
            sendResponse({ message: `${file}` });
        }
    }
);
