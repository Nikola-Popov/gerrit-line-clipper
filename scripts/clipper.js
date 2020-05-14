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

const onLineSelect = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const selectedTableRow = mutation.target;
      const cells = selectedTableRow.cells;
      selectedTableRow.classList.contains("target-side-right") ? tickLine(cells, "right") : tickLine(cells, "left");

      const lineNumber = selectedTableRow.cells.item(0).attributes["data-line-number"].value;
      const file = document.querySelector("#triggerText").innerText;

      copyBasedOnSettings(lineNumber, file);
    }
  }
};

const observer = new MutationObserver(onLineSelect);
const observeLines = async () => {
  const diffTableChild = await elementReady("#diffTable > tbody:nth-child(2)");
  const diffTableRows = diffTableChild.parentNode.tBodies;
  for (let row of diffTableRows) {
    observer.observe(row, { attributes: true, subtree: true });
  }
};
observeLines();

new MutationObserver(() => {
  observer.disconnect();
  observeLines();
}).observe(document.body, { subtree: true, childList: true });

const dynamicSettings = settings;

chrome.runtime.onMessage.addListener(
  function (request) {
    const [setting] = Object.keys(request);
    dynamicSettings[setting] = request[setting].newValue;
  }
);

function copyBasedOnSettings(lineNumber, file) {
  if (!isJavaPath(file)) {
    copyToClipboard(file);
    return;
  }

  let path = dynamicSettings.FILE_PATH.checked ? toFullPath(file) : toClassPath(file);
  path = dynamicSettings.LINE_NUMBER.checked ? `${path}:${lineNumber}` : path;

  copyToClipboard(path);
}
