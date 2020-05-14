# Gerrit Line Clipper
Google Chrome extension that allows you to copy the currently selected line in Gerrit to the clipboard for easy paste in IDE!
Just click on the selected line in Gerrit.

## Usage
In Eclipse IDE, hitting **CMD + SHIFT + v** (on MacOS) or **CTRL + SHIFT + v** (on the other OSs) directly navigates you to the current line in the file taking into the account the input stored in your clipboard.

---

#### Modify the manifest:
In order to make the scripts run only in your gerrit, change <all_urls> in the [manifest.json](manifest.json) with your gerrit url (i.e https://my.gerrit.com/c/*)
```javascript
"matches": [ "<all_urls>" ]
```
