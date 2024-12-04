# WebUI in MMRL

MMRL supports WebUI from KernelSU but it come with some additions for you all!

You can use the app theme with automatic dark mode support. Also it supports window safe insets which you'll have to set youself.

| Dark                                                  | Light                                                  |
| ----------------------------------------------------- | ------------------------------------------------------ |
| <img src="assets/webui/webui-dark.png" width="32%" /> | <img src="assets/webui/webui-light.png" width="32%" /> |

## Setup

To use window safe area insets which you basiclly need here, otherwise your config will move below the status bar

> Why so?  
> It improves the design and it presents a much more "native" feel

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ModConf Compose WebUI</title>
    <!-- Window Safe Area Insets -->
    <link rel="stylesheet" type="text/css" href="/mmrl/insets.css" />
    <!-- App Theme which the user has currently selected -->
    <link rel="stylesheet" type="text/css" href="/mmrl/colors.css" />

    <style>
      body {
        padding-top: var(--window-inset-top);
        padding-bottom: var(--window-inset-bottom);
        background-color: var(--background);
      }

      .scafold {
        padding: 16px;
      }

      .card {
        padding: 16px;
        background-color: var(--surfaceContainer);
        border-radius: 20px;
        span {
          color: var(--inverseSurface);
        }
      }
    </style>
  </head>
  <body>
    <div class="scafold">
      <div class="card">
        <span>Hello from WebUI!</span>
      </div>
    </div>
  </body>
</html>
```

## Check if running in MMRL

You can check if the config runs in MMRL

```js
if (ksu["mmrl"]) {
  console.log("Running in MMRL");
} else {
  console.log("Running not in MMRL");
}
```

Typing

```ts
declare var ksu: ksu;

interface ksu {
  mmrl(): boolean;
}

console.log(ksu.mmrl()); // true or false
```
