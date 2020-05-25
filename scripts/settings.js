'use strict';

const settings = {
    FILE_PATH: { id: "pathsSettings", checked: true },
    LINE_NUMBER: { id: "lineNumbersSettings", checked: false }
};

const settingsKeys = Object.keys(settings);

function slideSwitches(loadedSettings) {
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

const loadSettingsOrDefault = () => {
    const loadedSettings = loadSettings(settingsKeys, (loadedSettings) => {
        return loadedSettings;
    });

    if (loadedSettings) {
        return loadedSettings;
    }

    return settings;
};

const saveSettings = (event) => {
    const switchEvent = event[0];
    const switchSettings = findSettingsById(switchEvent.id);
    Object.values(switchSettings)[0].checked = switchEvent.checked;

    chrome.storage.local.set(switchSettings, () => {
        console.log("Successfully stored settings: ", switchSettings);
    });
};

const handleSettingsChange = async (switchSelector) => {
    const selectedSwitch = await elementReady(switchSelector);
    $(function () {
        $(selectedSwitch).change(function () {
            saveSettings($(this));
        })
    });
};

handleSettingsChange(`#${settings.FILE_PATH.id}`);
handleSettingsChange(`#${settings.LINE_NUMBER.id}`);

(async () => {
    document.addEventListener("DOMContentLoaded", () => {
        loadSettings(settingsKeys, slideSwitches);
    });
})();