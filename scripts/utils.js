'use strict';

Object.filter = (obj, predicate) =>
    Object.fromEntries(Object.entries(obj).filter(predicate));

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

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
const elementReady = (selector) => {
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