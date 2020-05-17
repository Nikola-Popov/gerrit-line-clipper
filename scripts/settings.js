'use strict';

const settings = {
    FILE_PATH: { id: "pathsCheckbox", checked: true },
    LINE_NUMBER: { id: "lineNumbersCheckbox", checked: false }
};

const settingsKeys = Object.keys(settings);

function modifyPopupCheckboxes(loadedSettings) {
    Object.values(loadedSettings).forEach((value) => {
        document.getElementById(value.id).checked = value.checked;
    });
};

function findSettingsById(id) {
    return Object.filter(settings, ([key, value]) => value.id === id);
};

const loadSettings = ((keys, callback) => {
    chrome.storage.local.get(keys, callback);
});

const saveSettings = (event) => {
    const checkboxSettings = findSettingsById(event.target.id);
    Object.values(checkboxSettings)[0].checked = event.target.checked;

    chrome.storage.local.set(checkboxSettings, () => {
        console.log("Successfully stored settings: ", checkboxSettings);
    });
};

const handleSettingsChange = async (checkboxSelector) => {
    const checkbox = await elementReady(checkboxSelector);
    checkbox.addEventListener('change', saveSettings);
};

handleSettingsChange(`#${settings.FILE_PATH.id}`);
handleSettingsChange(`#${settings.LINE_NUMBER.id}`);

(() => {
    document.addEventListener("DOMContentLoaded", () => {
        loadSettings(settingsKeys, modifyPopupCheckboxes);
    });
})();