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

## Diff. between `require` and `import`

With `require` you only can import predefined libaries. You can't include files with this method anymore.

```js
const React = require("react");
// or
import React from "react";
```

old way to import files

```js
const { Component } = require("!conf/Component.jsx");
// or
import { Component } from "!conf/Component.jsx";
```

> Please do not use this, use `include` instead.

---

Using `include` way more stable and supports more including types like

- `*.js`
- `*.jsx`
- `*.json`
- `*.yaml`
- `*.yml`
- `*.ini`
- `*.prop`
- `*.properties`

```js
const { Component } = include("Component.jsx");

// to ignore cwd restrictions
const properties = include(`/data/adb/modules/${modid}/module.prop`, {
  isolate: false,
});

const { id, name, author } = properties;
```

## Defaut functions and variables

There are some default functions and variables that makes the development easier..

> These functions make also usage of the ModConf services.

### `modid`

Types

```ts
declare const modid: string;
```

Usage

```js
log.i(modid);
```

### `modpath`

Types

```ts
// Depends how ModFS is configured
declare function modpath(path: string): string;
```

Usage

```js
const properties = include(modpath("module.prop"), { isolate: false });

const { id, name, author } = properties;
```

Will print

```
/data/adb/modules/<ID>/module.prop
```

### `confpath`

Types

```ts
// Depends how ModFS is configured
declare function confpath(path: string): string;
```

Usage

```js
const properties = include(confpath("Component.jsx"), { isolate: false });

const { id, name, author } = properties;
```

Will print

```
/data/adb/modules/<ID>/system/share/mmrl/config/<ID>/Component.jsx
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
