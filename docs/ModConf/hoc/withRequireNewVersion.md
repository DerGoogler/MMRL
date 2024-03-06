# Export with a new version requirement

Only shows the page if the requirement is met

## Setup

```js
import { withRequireNewVersion } from "@mmrl/hoc";
```

## Usage

```jsx
import React from "react";
import { Page, Toolbar } from "@mmrl/ui";
import { useActivity } from "@mmrl/hooks";
import { withRequireNewVersion } from "@mmrl/hoc";
import { StringsProvider } from "@mmrl/providers";

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
  return <Page renderToolbar={RenderToolbar}>Lol</Page>;
}

export default withRequireNewVersion({
  versionCode: 21510,
  component: () => {
    return (
      <StringsProvider
        data={{
          en: { hello: "Hello" },
          de: { hello: "Hallo" },
        }}
      >
        <App />
      </StringsProvider>
    );
  },
  // text: "Custom text",
  // title: "Custom title"
});
```

