# Colored Native Navbar Example

```js
import React from "react";
import { Page, Toolbar, BottomToolbar } from "@mmrl/ui";
import { Box } from "@mui/material";

// web handler
const bottomInsets = os.isAndroid ? view.getWindowBottomInsets() : 23;

const RenderToolbar = () => {
  return (
    <Toolbar
      modifier="noshadow"
      sx={{
        background: "rgb(188,2,194)",
        background:
          "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)",
      }}
    >
      <Toolbar.Center>Custom Native Navbar</Toolbar.Center>
    </Toolbar>
  );
};

const RenderBottomToolbar = () => {
  return (
    <BottomToolbar
      sx={{
        height: bottomInsets,
        background: "rgb(188,2,194)",
        background:
          "linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%)",
      }}
    />
  );
};

export default () => {
  return (
    <Page
      sx={{
        p: 1,
        bottom: `${bottomInsets}px !important`,
      }}
      renderToolbar={RenderToolbar}
      renderBottomToolbar={RenderBottomToolbar}
    >
      <Box
        component="h4"
        sx={{
          position: "absolute",
          left: "50%",
          top: "calc(50% - 56px)",
          textAlign: "center",
          WebkitTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
      >
        Hello, world!
      </Box>
    </Page>
  );
};
```
