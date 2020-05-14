'use strict';

chrome.storage.onChanged.addListener((changes) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, changes);
    });
});
