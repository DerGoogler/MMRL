# Activity Managment

TODO

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

function App() {
  const { context } = useActivtiy();

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
    <Page>
      <Button onClick={handleOpen}>Push</Button>
    </Page>
  );
}

const allowBack = false;

function NewPage() {
  // get here your extras
  const { context, extra } = useActivtiy();

  return (
    <Page
      // if you want override the back event
      onDeviceBackButton={(e) => {
        if (allowBack) {
          e.callParentHandler();
        }
      }}
      renderToolbar={() => {
        return (
          <Toolbar>
            <Toolbar.Left>
              <Toolbar.BackButton onClick={context.popPage} />
            </Toolbar.Left>
            <Toolbar.Center>{extra.title}</Toolbar.Center>
          </Toolbar>
        );
      }}
    >
      Hello World
    </Page>
  );
}
```
