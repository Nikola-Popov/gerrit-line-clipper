'use strict';

const settings = {
    FILE_PATHS: "pathsCheckbox",
    LINE_NUMBERS: "lineNumbersCheckbox"
};

const saveSettings = (event) => {
    const checkboxSettings = {
        id: event.target.id,
        checked: event.target.checked
    };

    chrome.storage.local.set(checkboxSettings, function () {
        console.log("Successfully stored settings: ", checkboxSettings);
    });
    document.getElementById(checkboxSettings.id).checked = checkboxSettings.checked;
};

const handleSettingsChange = async (checkboxSelector) => {
    const checkbox = await elementReady(checkboxSelector);
    checkbox.addEventListener('change', saveSettings);
};

handleSettingsChange(`#${settings.FILE_PATHS}`);
handleSettingsChange(`#${settings.LINE_NUMBERS}`);
