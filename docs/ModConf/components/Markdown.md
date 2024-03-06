# Image API

Component to display markdown code

## Setup

```js
import { Markdown } from "@mmrl/ui";
```

## Usage

```js
import React from "react";
import { useActivity } from "@mmrl/hooks";
import { Markdown, Page, Toolbar } from "@mmrl/ui";

function RenderToolbar() {
  const { context, extra } = useActivity();
  const { title = "Default" } = extra;
  return (
    <Toolbar modifier="noshadow">
      <Toolbar.Left>
        <Toolbar.BackButton onClick={context.popPage} />
      </Toolbar.Left>
      <Toolbar.Center>{title}</Toolbar.Center>
    </Toolbar>
  );
}

function App() {
  return (
    <Page sx={{ p: 1 }} renderToolbar={RenderToolbar}>
      <Markdown>{`
# Heading 1

Hello, world!
    `}</Markdown>
    </Page>
  );
}

export default App;
```

## API

| Attr       | Required | Type              |
| ---------- | -------- | ----------------- |
| `children` | Yes      | `React.ReactNode` |
| `fetch`    | No       | `url\|string`     |
