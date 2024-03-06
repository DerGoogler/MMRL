# Config Localization

## Setup

```js
import { useStrings } from "@mmrl/hooks"
import { StringsProvider } from "@mmrl/providers"
```

## Usage

```jsx
import React from "react";
import { Page, Toolbar } from "@mmrl/ui";
import { useStrings, useActivity } from "@mmrl/hooks"
import { StringsProvider } from "@mmrl/providers"


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
    const { strings } = useStrings()

    return (
        <Page renderToolbar={RenderToolbar}>
            {strings("hello")}
        </Page>
    );
}

export default () => {
    return (
        <StringsProvider data={{
            en: { hello: "Hello" },
            de: { hello: "Hallo" }
        }}>
            <App />
        </StringsProvider>
    )
}
```
