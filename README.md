
# Gerrit Line Clipper
Google Chrome extension that allows you to copy the currently selected line in Gerrit to the clipboard for easy paste in IDE!
It supports various options regarding the copy functionality. The extension is best suitable for Java developers who strive to speed up their code reviews. 
Without further ado, just click on the selected line in Gerrit and begin clipping!

---

## Usage
The following table contains the most suitable cases for use of the extension. All the examples below are for the [Eclipse IDE for Enterprise Java Developers](https://www.eclipse.org/ide/) (Version: 2020-03 4.15.0) running on MacOS. But this doesn't limit the functionality of the extension as the the copied to the clipboard content can be paste everywhere.

| ACTION |  COMMAND | SUGGESTED USAGE                    |  NOTES |
| -------------|---------| --------------------------------- |-------------|
| Open Type| <kbd>command</kbd> + <kbd>shift</kbd> + <kbd>t</kbd> |`CLASS PATHS ONLY` | N/A |
| Open Resource | <kbd>command</kbd> + <kbd>shift</kbd> + <kbd>r</kbd> |`FULL FILE PATHS` |All non Java files are selected with full paths by default. Cannot<br/>  be changed currently|
| Open from Clipboard | <kbd>command</kbd> + <kbd>shift</kbd> + <kbd>v</kbd> |`FULL FILE PATHS:LINE NUMBERS` |Eclipse issue - Not working when there is no currently opened tab |
<br/>
## Settings management

| SETTINGS |  OPTIONS |DESCRIPTION                    |  EXAMPLES |
| -------------|---------| ------------------------------ |-------------|
| File paths | - Full paths <br/> - Class paths      |Toggles between full file paths or class paths copying. Applicable only for Java files.<br/> Regular files are always selected as full paths. | - com.dev.package.MyClass <br/> - MyClass|
| Line numbers | - Enabled <br/> - Disabled | When selected, line numbers will be copied and appended to the clipboard as well.<br/> Applies only for Java files.| - :12345|

---

#### Production
In order to make the scripts run only in your gerrit, change
```javascript
"matches": [ "<all_urls>" ]
```
in the [manifest.json](manifest.json) replacing <all_urls> with your gerrit url (for example: "https://my.gerrit.com/c/*").

