# Module Configure

- TODO

## Available libaries

- `@mmrl/ui`
- `@mmrl/hooks`
- `@mmrl/sufile`
- `@mmrl/terminal`
- `@mmrl/shell`
- `@mmrl/buildconfig`
- `@mmrl/os`
- `@mmrl/providers`
- `@mui/material`
- `@mui/icons-material`
- `react`

## Diff. between `require` and `import`

With `require` you only can import predefined libaries, you can't includes files with this method anymore.

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

> Please do not use this, use `import` instead.

---

Using `import` way more stable and supports more including types like

- `*.js`
- `*.jsx`
- `*.json`
- `*.ini`
- `*.prop`
- `*.properties`

```js
const { Component } = import("Component.jsx");

// to ignore cwd restrictions
const properties = import(`/data/adb/modules/${modid}/module.prop`, {
  ignoreCwd: true,
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
console.log(modid);
```

### `modpath`

Types

```ts
declare function modpath(path: string): string;
```

Usage

```js
const properties = import(modpath("module.prop"), { ignoreCwd: true });

const { id, name, author } = properties;
```

Will print

```
/data/adb/modules/<ID>/module.prop
```

> Depends how ModConf is configured

### `confpath`

Types

```ts
declare function confpath(path: string): string;
```

Usage

```js
const properties = import(confpath("Component.jsx"), { ignoreCwd: true });

const { id, name, author } = properties;
```

Will print

```
/data/adb/modules/<ID>/system/share/mmrl/config/<ID>/Component.jsx
```

