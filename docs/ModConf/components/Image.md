# Image API

When you want to use images that stored on your device then you can use the `<Image />` component to access them

## Setup

```js
import { Image } from "@mmrl/ui";
```

## Usage

```js
function App() {
  // type is actually not required
  return (
    <Page>
      <Image src="/sdcard/image.png" type="image/png" />
    </Page>
  );
}
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
