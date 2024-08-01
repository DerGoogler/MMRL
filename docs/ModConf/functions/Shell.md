# Shell

Finally the `Shell` API is public!

> [!NOTE] > `Shell` is a global part in ModConf. No need to import it.
> The `Shell` API v2 is currently in the beta

## Execute a normal command

```js
const ls = new Shell("ls");

ls.exec();
```

## Execute with result

```js
const ls = new Shell("ls");

console.log(ls.result());
```

## Get code

```js
const ls = new Shell("ls");

console.log(ls.getCode());
```

## Check if it is successful

```js
const ls = new Shell("ls");

console.log(ls.isSuccess());
```

## Lagecy API

```js
Shell.cmd("ls").exec();
Shell.cmd("ls").result();
Shell.cmd("ls").getCode();
Shell.cmd("ls").isSuccess();
```
