'use strict';

const handleLineNumbersCheckboxChange = async () => {
    const lineNumbersCheckbox = await elementReady("#lineNumbersCheckbox");
    lineNumbersCheckbox.addEventListener('change', event => {
        chrome.runtime.sendMessage({ isLineNumbersEnabled: event.target.checked }, onMessageReceiveCopyClipboard);
    });

};
handleLineNumbersCheckboxChange();

