# What is ModConf?

ModConf stands for **Module Configuration**, this feature in MMRL allows you to create dynamic configuration pages for individual modules. Essentially, it provides a way to customize how information about a module is displayed within the MMRL app.

Think of it like this: By default, MMRL might display basic details about a module, like its name and description. With ModConf, developers of modules can create custom pages that show additional information relevant to their specific module. This could include things like:

- Screenshots or icons for the module
- Detailed descriptions of what the module does and its functionalities
- Configuration options specific to the module
- Verification details to ensure the module's authenticity
- Dependency information, listing other modules required for this one to function

While MMRL itself doesn't directly create these ModConf pages, it provides the framework for developers to implement them for their modules.

## Getting started

Your `index.jsx` needs to be placed inside `<MODDIR>/system/usr/share/mmrl/config/<MODID>/index.jsx`.

Simple starter:

```jsx
import React from "react";
import { Page } from "@mmrl/ui";

export default () => {
  return <Page>Test</Page>;
};
```

> [!IMPORTANT]
> Always wrap your content with `<Page></Page>` otherwise your page won't start corretly

## Available libaries

See [`libs.ts`](https://github.com/DerGoogler/MMRL/blob/master/Website/src/components/ModConfView/libs.ts) to see all usable modules

## How it works

With `require` you can import predefined libaries or your files

```js
const React = require("react");
// or
import React from "react";
```

----

Supported file types:

- `*.js`
- `*.jsx`
- `*.json`
- `*.yaml`
- `*.yml`
- `*.ini`
- `*.prop`
- `*.properties`

```js
import { Component } from "Component" // .jsx

const properties = require(path.resolve(__moddirname, "module.prop"))

const { id, name, author } = properties;
```

## Defaut functions and variables

There are some default functions and variables that makes the development easier..

> These functions make also usage of the ModConf services.

### `__idname` (former `modid`)

Types

```ts
declare const __idname: string;
```

### `__modpath` (new)

Types

```ts
declare const __modpath: string;
```


### `__filename` (new)

Types

```ts
declare const __filename: string;
```

### `__dirname` (former `modpath`)

Types

```ts
declare const __dirname: string;
```

# Blacklisted functions

- `eval()`
- `document.write()`
- `document.writeln()`
- `decodeURI()`
- `decodeURIComponent()`
- `endodeURI()`
- `encodeURIComponent()`
- `atob()`
- `bota()`

These function will throw a `IsolatedEvalError` and your config will stop immediately after calling the function

# Code Server

Make conf development easier with code-server

## Requirements

- [Systemless Mkshrc](https://github.com/Magisk-Modules-Alt-Repo/mkshrc)
- [Systemless Node.js](https://github.com/Magisk-Modules-Alt-Repo/node)
- [Code Server](https://github.com/Googlers-Repo/code-server)

> You can get everthing on MMRL except Code Server

```shell
# start code server
code-server 
```

Or use the risky way

```shell
ln -s `which code-server` /data/adb/service.d/code-server
```
