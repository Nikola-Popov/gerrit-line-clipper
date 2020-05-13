'use strict';

const settings = {
    FILE_PATHS: "pathsCheckbox",
    LINE_NUMBERS: "lineNumbersCheckbox"
};

const handleSettingsChange = async (checkboxSelector) => {
    const checkbox = await elementReady(checkboxSelector);
    checkbox.addEventListener('change', event => {
        chrome.runtime.sendMessage({
            id: event.target.id,
            checked: event.target.checked
        });
    });
};

handleSettingsChange(`#${settings.FILE_PATHS}`);
handleSettingsChange(`#${settings.LINE_NUMBERS}`);
