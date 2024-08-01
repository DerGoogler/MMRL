# ModConf Standalone

ModConf Standalone nearly supports everything from the normal ModConf.

## Getting started

Create `/data/adb/mmrl/modconf/<MODID>/modconf.json` with the following content

```json
{
  "id": "<MODID>",
  "name": "Your name",
  "description": "your description",
  "main": "<MCALONECWD>/src/index.jsx",
  "cwd": "<MCALONECWD>/src"
}
```

### `modconf.json` fields

| Key           | Required                  | Description                                                                                                                     |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | Yes                       | The `id` should always match the folder name otherwise it won't show up                                                         |
| `name`        | Optional                  | Used to display the name                                                                                                        |
| `description` | Optional                  | Use to display the description and that it does                                                                                 |
| `main`        | No                        | Here can you set your own index file. Useful when you have a `src` folder.<br/><blockquote>ModFS supported</blockquote>         |
| `cwd`         | No (yes if `main` is set) | It is required to use `cwd` if `main` is set to ensure the the imports are working<br/><blockquote>ModFS supported</blockquote> |

## Index file

As above decribed you can set your own index path

`src/index.jsx`

```jsx
import React from "react";
import { Page } from "@mmrl/ui";

export default () => {
  return <Page>Test</Page>;
};
```
