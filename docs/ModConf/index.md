# Module Configure (ModConf)

- TODO

## Available libaries

See [`libs.ts`](https://github.com/DerGoogler/MMRL/blob/master/Website/src/components/ConfigureView/libs.ts) to see all usable modules

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