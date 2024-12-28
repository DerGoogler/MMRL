# `MMRLInterface` Documentation

## Overview
The `MMRLInterface` class provides various system-related functionalities from Android to JavaScript running in a WebView. This interface allows JavaScript to access details such as the manager information, window insets, light or dark mode status. Additionally, it provides methods for sharing text content.

### Access Control and Module ID Sanitization
The `MMRLInterface` is accessed from JavaScript via the module ID, which is sanitized before use. Any characters in the module ID that do not match the regex pattern `[a-zA-Z0-9._-]` are replaced with an underscore (`_`).

The regex used to sanitize the module ID is as follows:
```regex
[^a-zA-Z0-9._-]
```
This means that characters like spaces or special symbols will be replaced with an underscore (`_`).


## Methods

### `<sanitizedModId>.getManager()`
This property provides information about the manager, including its name, version name, and version code, formatted as a JSON string.

#### Returns:
- `String`: A JSON string containing the manager's name, version name, and version code.

#### Example:
```javascript
var managerInfo = $mmrl_wpd.getManager();
console.log(managerInfo); // JSON: {"name":"manager_name", "versionName":"manager_version", "versionCode":123}
```

---

### `<sanitizedModId>.getMmrl()`
This property provides information about the MMRL application, including its application ID, version name, and version code, formatted as a JSON string.

#### Returns:
- `String`: A JSON string containing the application ID, version name, and version code.

#### Example:
```javascript
var mmrlInfo = $mmrl_wpd.getMmrl();
console.log(mmrlInfo); // JSON: {"name":"application_id", "versionName":"mmrl_version", "versionCode":456}
```

---

### `<sanitizedModId>.getHasAccessToFileSystem()`
This property indicates whether the JavaScript code has access to the file system (FS API) on the device.

#### Returns:
- `Boolean`: `true` if access to the file system is allowed, `false` otherwise.

#### Example:
```javascript
var hasAccess = $mmrl_wpd.getHasAccessToFileSystem();
console.log(hasAccess); // true or false
```

---

### `<sanitizedModId>.getHasAccessToAdvancedKernelSuAPI()`
This property indicates whether the JavaScript code has access to the Advanced Kernel Su API (KSU API) on the device.

#### Returns:
- `Boolean`: `true` if access to the advanced kernel Su API is allowed, `false` otherwise.

#### Example:
```javascript
var hasKsuAccess = $mmrl_wpd.getHasAccessToAdvancedKernelSuAPI();
console.log(hasKsuAccess); // true or false
```

---

### `<sanitizedModId>.getWindowTopInset()`
This property returns the top window inset (the height of the status bar or any other system UI components at the top of the screen).

#### Returns:
- `Number`: The height of the top inset in pixels.

#### Example:
```javascript
var topInset = $mmrl_wpd.getWindowTopInset();
console.log(topInset); // e.g., 24 (height in pixels)
```

---

### `<sanitizedModId>.getWindowBottomInset()`
This property returns the bottom window inset (the height of the navigation bar or other system UI components at the bottom of the screen).

#### Returns:
- `Number`: The height of the bottom inset in pixels.

#### Example:
```javascript
var bottomInset = $mmrl_wpd.getWindowBottomInset();
console.log(bottomInset); // e.g., 48 (height in pixels)
```

---

### `<sanitizedModId>.isLightNavigationBars()`
This property checks if the navigation bars are displayed with a light appearance.

#### Returns:
- `Boolean`: `true` if the navigation bars are light, `false` if they are dark.

#### Example:
```javascript
var isLightNavBars = $mmrl_wpd.isLightNavigationBars();
console.log(isLightNavBars); // true or false
```

---

### `<sanitizedModId>.isDarkMode()`
This property checks if the system is in dark mode.

#### Returns:
- `Boolean`: `true` if the system is in dark mode, `false` if it is in light mode.

#### Example:
```javascript
var isDarkMode = $mmrl_wpd.isDarkMode();
console.log(isDarkMode); // true or false
```

---

### `<sanitizedModId>.setLightNavigationBars(isLight: boolean)`
This method allows you to set the appearance of the navigation bars to light or dark.

#### Parameters:
- `isLight`: A boolean value (`true` for light, `false` for dark) indicating the desired appearance of the navigation bars.

#### Example:
```javascript
$mmrl_wpd.setLightNavigationBars(true); // Set navigation bars to light appearance
```

---

### `<sanitizedModId>.isLightStatusBars()`
This property checks if the status bars are displayed with a light appearance.

#### Returns:
- `Boolean`: `true` if the status bars are light, `false` if they are dark.

#### Example:
```javascript
var isLightStatusBars = $mmrl_wpd.isLightStatusBars();
console.log(isLightStatusBars); // true or false
```

---

### `<sanitizedModId>.setLightStatusBars(isLight: boolean)`
This method allows you to set the appearance of the status bars to light or dark.

#### Parameters:
- `isLight`: A boolean value (`true` for light, `false` for dark) indicating the desired appearance of the status bars.

#### Example:
```javascript
$mmrl_wpd.setLightStatusBars(false); // Set status bars to dark appearance
```

---

### `<sanitizedModId>.getSdk()`
This property returns the current SDK version of the device.

#### Returns:
- `Number`: The SDK version code of the device.

#### Example:
```javascript
var sdkVersion = $mmrl_wpd.getSdk();
console.log(sdkVersion); // e.g., 30 (Android 11)
```

---

### `<sanitizedModId>.shareText(text: string)`
This method allows you to share text content.

#### Parameters:
- `text`: A string containing the text to be shared.

#### Example:
```javascript
$mmrl_wpd.shareText("Hello, world!"); // Share the text "Hello, world!"
```

---

### `<sanitizedModId>.shareText(text: string, type: string)`
This method allows you to share text content with a specified MIME type.

#### Parameters:
- `text`: A string containing the text to be shared.
- `type`: A string representing the MIME type (e.g., "text/plain").

#### Example:
```javascript
$mmrl_wpd.shareText("Hello, world!", "text/plain"); // Share as plain text
```
