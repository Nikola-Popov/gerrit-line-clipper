'use strict';

const handleLineNumbersCheckboxChange = async () => {
    const lineNumbersCheckbox = await elementReady("#lineNumbersCheck");
    lineNumbersCheckbox.addEventListener('change', event => {
        chrome.runtime.sendMessage({ isLineNumbersEnabled: event.target.checked }, onMessageReceiveCopyClipboard);
    });

};
handleLineNumbersCheckboxChange();


/**
 * MIT Licensed
 * Author: jwilson8767
 * 
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
function elementReady(selector) {
    return new Promise((resolve, reject) => {
        let el = document.querySelector(selector);
        if (el) { resolve(el); }
        new MutationObserver((mutationRecords, observer) => {
            Array.from(document.querySelectorAll(selector)).forEach((element) => {
                resolve(element);
                observer.disconnect();
            });
        })
            .observe(document.documentElement, {
                childList: true,
                subtree: true
            });
    });
}