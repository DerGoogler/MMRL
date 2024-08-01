# SuZip

Here will you learn, how `SuZip` works in MMRL. It has the same style as `SuFile`

> [!NOTE]
> `SuZip` is a global part in ModConf. No need to import it.
>
> Unstable class!

## Reading files

```js
const mkprop = new SuZip("file.zip", "path/to/file");
console.log(mkprop.read());
```

## Check for existing

```js
const mkprop = new SuZip("file.zip", "path/to/file");

if (mkprop.exist()) {
  console.log("File exist!");
} else {
  // stops ModConf
  throw new Error("File does not exist!");
}
```

## Listing files

```js
const modules = new SuZip("file.zip", "path/to/file");

if (modules.exist()) {
  // path is ignored here
  console.log(modules.list());
} else {
  throw new Error("Modules folder does not exist");
}
```

## Access native methods

```js
const native = new SuZip("file.zip", "path/to/file");
native.interface;
```
