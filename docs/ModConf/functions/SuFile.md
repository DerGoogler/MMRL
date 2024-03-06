# SuFile

Here will you learn, how `SuFile` works in MMRL.

> [!NOTE]
> `SuFile` is a global part in ModConf. No need to import it.

## Reading files

Files can easily be read within MMRL, it returns a empty string if the file does not exists.

```js
const mkprop = new SuFile("/data/adb/modules/mkshrc/module.prop");
console.log(mkprop.read());
```

## Check for existing

It you want to make sure that your file exists

```js
const mkprop = new SuFile("/data/adb/modules/mkshrc/module.prop");

if (mkprop.exist()) {
  console.log("File exist!");
} else {
  // stops ModConf
  throw new Error("File does not exist!");
}
```

## Writing files

Be careful with this function, changes that are made can't be restored.

```js
SuFile.write("/sdcard/file_test.txt", "foo");
// new SuFile("/sdcard/file_test.txt").write("foo")
```

## Listing files

You also able to list whole folders.

```js
const modules = new SuFile("/data/adb/modules");

if (modules.exist()) {
  console.log(modules.list());
} else {
  throw new Error("Modules folder does not exist");
}
```

It also possible to change the delimiter

```js
modules.list(";"); // other than ","
```

## Get last modified date

```js
const mkprop = new SuFile("/data/adb/modules/mkshrc/module.prop");
console.log(mkprop.lastModified());
```

## Deleting files

```js
const file = new SuFile("/sdcard/file_test.txt");

if (file.delete()) {
  console.log("Successful deleted");
} else {
  console.log("Something went wrong");
}

// deleting recursive
file.deleteRecursive(); // void
```

## Creating files and folders

This method can multiple things like creating files, folders and parent folders

```js
const hello = new SuFile.create("/sdcard/hello.txt");

// create a file (default)
hello.create(); // hello.create(SuFile.NEW_FILE)

// create a folder
hello.create(SuFile.NEW_FOLDER);

// create folder with parent folders
hello.create(SuFile.NEW_FOLDERS);
```

## Access native methods

```js
const native = new SuFile.create("/sdcard/hello.txt");
native.interface;
```
