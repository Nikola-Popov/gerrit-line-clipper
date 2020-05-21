'use strict';

const tickImage = new Image(12, 12);
tickImage.src = chrome.extension.getURL("/images/tick.png");
tickImage.title = "Copied";

const tickLine = (cell) => {
  cell.appendChild(tickImage);
};

const findCellBySide = (cells, sideClassSelector) => {
  for (let i = 0; i < cells.length; i++) {
    let currentCell = cells.item(i);
    if (currentCell.classList.contains("lineNum") && currentCell.classList.contains(sideClassSelector)) {
      return currentCell;
    }
  }
};

const fetchLineNumber = (cell) => {
  const lineNumber = cell.innerText;
  if (!lineNumber) {
    lineNumber = cell.attributes["data-line-number"].value;
  }
  return lineNumber;
};

const fetchFilePath = (selectedTableRow) => {
  const expandableList = document.querySelector("#container");
  if (expandableList) {
    while (selectedTableRow.classList.value !== "stickyArea style-scope gr-file-list") {
      selectedTableRow = selectedTableRow.parentElement;
    }
    return selectedTableRow.querySelector("div").attributes["data-path"].value;
  } else {
    return document.querySelector("#triggerText").innerText;
  }
};

const onLineSelect = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const selectedTableRow = mutation.target;
      const cells = selectedTableRow.cells;
      if (!cells) {
        return;
      }
      const cell = selectedTableRow.classList.contains("target-side-right") ? findCellBySide(cells, "right") : findCellBySide(cells, "left");
      if(!cell) {
        return;
      }
      tickLine(cell);

      const lineNumber = fetchLineNumber(cell);
      const file = fetchFilePath(selectedTableRow);
      copyBasedOnSettings(lineNumber, file);
    }
  }
};

const observer = new MutationObserver(onLineSelect);
const observeLines = () => {
  const diffTables = document.querySelectorAll("#diffTable");
  for (let diffTable of diffTables) {
    const diffTableRows = diffTable.tBodies;
    for (let row of diffTableRows) {
      observer.observe(row, { attributes: true, subtree: true });
    }
  }
};

new MutationObserver(() => {
  observeLines();
}).observe(document.body, { subtree: true, childList: true });

let dynamicSettings;
loadSettings(settingsKeys, (loadedSettings) => {
  dynamicSettings = loadedSettings;
});

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
