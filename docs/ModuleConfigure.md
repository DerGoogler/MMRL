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

> Please do not use this, use `include` instead.

---

Using `include` way more stable and supports more including types like

- `*.js`
- `*.jsx`
- `*.json`
- `*.ini`
- `*.prop`
- `*.properties`

```js
const { Component } = include("Component.jsx");

// to ignore cwd restrictions
const properties = include(`/data/adb/modules/${modid}/module.prop`, {
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
log.i(modid);
```

### `modpath`

Types

```ts
declare function modpath(path: string): string;
```

Usage

```js
const properties = include(modpath("module.prop"), { ignoreCwd: true });

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
const properties = include(confpath("Component.jsx"), { ignoreCwd: true });

const { id, name, author } = properties;
```

Will print

```
/data/adb/modules/<ID>/system/share/mmrl/config/<ID>/Component.jsx
```

# Setup a page

Small sample to setup a page

```jsx
import React from "react";

import { Page, Toolbar } from "@mmrl/ui";
import { useActivity } from "@mmrl/hooks";

import { Stack } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

const Config = () => {
  const { context } = useActivity();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          {/* Pressing this here will close the editor */}
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>My config</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ height: "100%" }}
      >
        <Timeline position="alternate" sx={{ flexGrow: "unset" }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Repeat</TimelineContent>
          </TimelineItem>
        </Timeline>
      </Stack>
    </Page>
  );
};

export default Config;
```
