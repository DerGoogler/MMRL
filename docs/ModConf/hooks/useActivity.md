# Activity Managment

Simple manage multiple activities with this hook.

## Setup

```js
import { useActivity } from "@mmrl/hooks";
```

## Usage

```js
import React from "react";
import { useActivity } from "@mmrl/hooks";
import { Page, Toolbar } from "@mmrl/ui";
import { Button } from "@mui/material";

function RenderToolbar() {
  const { context, extra } = useActivity()
  const { title = "Default" } = extra
  return (
    <Toolbar modifier="noshadow">
      <Toolbar.Left>
        <Toolbar.BackButton onClick={context.popPage} />
      </Toolbar.Left>
      <Toolbar.Center>{title}</Toolbar.Center>
    </Toolbar>
  )
}

function App() {
  const { context } = useActivity();

  const handleOpen = () => {
    context.pushPage({
      component: NewPage,
      // don't forget this!
      key: "MyNewPage",
      // if your page has props
      props: {},
      // push any object here
      extra: {
        title: "Hello",
      },
    });
  };

  return (
    <Page renderToolbar={RenderToolbar}>
      <Button variant="contained" onClick={handleOpen}>Push</Button>
    </Page>
  );
}

const allowBack = false;

function NewPage() {
  return (
    <Page
      // if you want override the back event
      onDeviceBackButton={(e) => {
        if (allowBack) {
          e.callParentHandler();
        }
      }}
      renderToolbar={RenderToolbar}
    >
      Try to use your back button
    </Page>
  );
}

export default App
```
