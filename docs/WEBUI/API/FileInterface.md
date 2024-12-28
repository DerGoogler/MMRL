# `FileInterface` Documentation

## Overview
The `FileInterface` class provides access to Android file operations from JavaScript running in a WebView. This class allows JavaScript to interact with files on the Android device, enabling file reading, writing, listing, and deletion, along with size and status queries.

### Access Control
The `FileInterface` is only accessible if the user has granted the necessary permissions. Before any file-related operations can be performed, the user must approve the access. Once granted, the methods in `FileInterface` become available for JavaScript code in the WebView.

### Module ID Sanitization
To access the `FileInterface`, a sanitized module ID is used. The method `sanitizeModIdWithFile()` is used to ensure that every WebView uses the same access point.

```kotlin
fun sanitizeModIdWithFile(input: String): String {
    return if (input.length >= 2) {
        input[0].uppercase() + input[1].toString()
    } else if (input.isNotEmpty()) {
        input[0].uppercase()
    } else {
        ""
    }
}
```

For example, the module ID `"mmrl_wpd"` would be sanitized to `"$MmFile"`. Play with this code sample [online](https://pl.kotl.in/uHiACLNTQ)


## Methods

### `<sanitizedModId>.read(path: string)`
Reads the contents of a file located at the specified `path`. This method returns the content as a string.

#### Parameters:
- `path`: A string representing the file path on the Android device.

#### Returns:
- `String`: The content of the file as text, or `null` if an error occurs.

#### Example:
```javascript
var content = $MmFile.read("/path/to/file.txt");
console.log(content);
```

---

### `<sanitizedModId>.read(path: string, bytes: boolean)`
Reads the contents of a file at the specified `path`. If `bytes` is `true`, the method returns the content as a Base64-encoded string. If `bytes` is `false`, the content is returned as plain text.

#### Parameters:
- `path`: A string representing the file path on the Android device.
- `bytes`: A boolean flag indicating whether to return the content as a Base64-encoded string (`true`) or as plain text (`false`).

#### Returns:
- `String`: The Base64-encoded file content if `bytes` is `true`, or the plain text content if `bytes` is `false`. Returns `null` if an error occurs.

#### Example:
```javascript
var base64Content = $MmFile.read("/path/to/image.png", true);
console.log(base64Content);  // Base64-encoded string
```

---

### `<sanitizedModId>.write(path: string, data: string)`
Writes the specified `data` to a file at the given `path`. If the file already exists, it will be overwritten.

#### Parameters:
- `path`: A string representing the file path on the Android device.
- `data`: A string containing the content to write to the file.

#### Returns:
- `void`: No return value.

#### Example:
```javascript
$MmFile.write("/path/to/output.txt", "Hello, world!");
```

---

### `<sanitizedModId>.readAsBase64(path: string)`
Reads the content of a file at the specified `path` and returns it as a Base64-encoded string.

#### Parameters:
- `path`: A string representing the file path on the Android device.

#### Returns:
- `String`: The Base64-encoded file content, or `null` if an error occurs.

#### Example:
```javascript
var base64Content = $MmFile.readAsBase64("/path/to/file.pdf");
console.log(base64Content);  // Base64-encoded string
```

---

### `<sanitizedModId>.list(path: string)`
Lists the files and directories in the directory specified by `path`, separated by commas.

#### Parameters:
- `path`: A string representing the directory path.

#### Returns:
- `String`: A comma-separated list of file and directory names.

#### Example:
```javascript
var fileList = $MmFile.list("/path/to/directory");
console.log(fileList);  // "file1.txt,file2.txt,folder1"
```

---

### `<sanitizedModId>.list(path: string, delimiter: string)`
Lists the files and directories in the specified `path` and allows you to customize the delimiter separating the file names.

#### Parameters:
- `path`: A string representing the directory path.
- `delimiter`: A string that will be used to separate the file names in the returned list.

#### Returns:
- `String`: A list of file and directory names, separated by the specified delimiter.

#### Example:
```javascript
var fileList = $MmFile.list("/path/to/directory", "|");
console.log(fileList);  // "file1.txt|file2.txt|folder1"
```

---

### `<sanitizedModId>.size(path: string)`
Gets the size of the file or directory at the specified `path`.

#### Parameters:
- `path`: A string representing the file or directory path.

#### Returns:
- `Number`: The size of the file or directory in bytes.

#### Example:
```javascript
var size = $MmFile.size("/path/to/file.txt");
console.log(size);  // 1024 (size in bytes)
```

---

### `<sanitizedModId>.size(path: string, recursive: boolean)`
Gets the size of the file or directory at the specified `path`. If `recursive` is `true`, the size includes all files in subdirectories (for directories).

#### Parameters:
- `path`: A string representing the file or directory path.
- `recursive`: A boolean flag indicating whether to calculate the size recursively for directories.

#### Returns:
- `Number`: The size in bytes.

#### Example:
```javascript
var totalSize = $MmFile.size("/path/to/directory", true);
console.log(totalSize);  // Total size of all files in the directory
```

---

### `<sanitizedModId>.stat(path: string)`
Gets the status of the file or directory at the specified `path`. This could include properties like the last modified time or size.

#### Parameters:
- `path`: A string representing the file or directory path.

#### Returns:
- `Number`: A numeric value representing the status of the file or directory.

#### Example:
```javascript
var status = $MmFile.stat("/path/to/file.txt");
console.log(status);  // Numeric status value (e.g., last modified timestamp)
```

---

### `<sanitizedModId>.stat(path: string, total: boolean)`
Gets the status of the file or directory at the specified `path`, with an option to include the total status for directories (e.g., combined size of all files within).

#### Parameters:
- `path`: A string representing the file or directory path.
- `total`: A boolean flag indicating whether to return the total status (e.g., total size for directories).

#### Returns:
- `Number`: A numeric value representing the status.

#### Example:
```javascript
var totalStatus = $MmFile.stat("/path/to/directory", true);
console.log(totalStatus);  // Total status value (e.g., combined size of all files)
```

---

### `<sanitizedModId>.delete(path: string)`
Deletes the file or directory at the specified `path`.

#### Parameters:
- `path`: A string representing the file or directory path.

#### Returns:
- `Boolean`: `true` if the file or directory was successfully deleted, `false` otherwise.

#### Example:
```javascript
var success = $MmFile.delete("/path/to/file.txt");
console.log(success);  // true if deleted, false otherwise
```

---

### `<sanitizedModId>.exists(path: string)`
Checks if a file or directory exists at the specified `path`.

#### Parameters:
- `path`: A string representing the file or directory path.

#### Returns:
- `Boolean`: `true` if the file or directory exists, `false` otherwise.

#### Example:
```javascript
var exists = $MmFile.exists("/path/to/file.txt");
console.log(exists);  // true if the file exists, false otherwise
```
