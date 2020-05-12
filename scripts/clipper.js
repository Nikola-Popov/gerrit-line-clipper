'use strict';

const tickImage = new Image(12, 12);
tickImage.src = chrome.extension.getURL("/images/tick.png");
tickImage.title = "Copied";

const tickLine = (cells, sideClassSelector) => {
  for (let i = 0; i < cells.length; i++) {
    let currentCell = cells.item(i);
    if (currentCell.classList.contains("lineNum") && currentCell.classList.contains(sideClassSelector)) {
      currentCell.appendChild(tickImage);
    }
  }
};

const onMessageReceiveCopyClipboard = async (response) => {
  try {
    await navigator.clipboard.writeText(response.message);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const fetchFilePath = () => {
  return document.querySelector("#triggerText").innerText;
};

const lineSelectCallback = async (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const selectedTableRow = mutation.target;
      const cells = selectedTableRow.cells;
      selectedTableRow.classList.contains("target-side-right") ? tickLine(cells, "right") : tickLine(cells, "left");

      const lineNumber = selectedTableRow.cells.item(0).attributes["data-line-number"].value;
      const file = fetchFilePath();
      chrome.runtime.sendMessage({ lineNumber, file }, onMessageReceiveCopyClipboard);
    }
  }
};

const observer = new MutationObserver(lineSelectCallback);
const lineObserverCallback = async () => {
  const diffTableChild = await elementReady("#diffTable > tbody:nth-child(2)");
  const diffTableRows = diffTableChild.parentNode.tBodies;
  for (let row of diffTableRows) {
    observer.observe(row, { attributes: true, subtree: true });
  }
};
lineObserverCallback();

new MutationObserver(() => {
  observer.disconnect();
  lineObserverCallback();
}).observe(document.body, { subtree: true, childList: true });

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