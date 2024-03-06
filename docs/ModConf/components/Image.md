# Image API

When you want to use images that stored on your device then you can use the `<Image />` component to access them

## Setup

```js
import { Image } from "@mmrl/ui";
```

## Usage

```js
import React from "react"
import { useActivity } from "@mmrl/hooks"
import { Image, Page, Toolbar } from "@mmrl/ui";

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
    return (
        <Page renderToolbar={RenderToolbar}>
            <Image src="/sdcard/image.png" type="image/png" />
            <br />
            <Image src="https://picsum.photos/536/354" />
            <h1>Disable opening</h1>
            <Image src="https://picsum.photos/536/354" noOpen />
        </Page>
    );
}

export default App
```

## API

| Attr        | Required | Type      |
| ----------- | -------- | --------- |
| `src`       | Yes      | `string`  |
| `type`      | No       | `string`  |
| `shadow`    | No       | `number`  |
| `title`     | No       | `string`  |
| `noOpen`    | No       | `boolean` |
| `modFSAdds` | No       | `object`  |
| `sx`        | No       | `SxProps` |
