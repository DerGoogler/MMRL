# WebUI in MMRL

MMRL supports WebUI from KernelSU but it come with some additions for you all!

You can use the app theme with automatic dark mode support. Also it supports window safe insets which you'll have to set youself.

| Dark                                                       | Light                                                       |
|------------------------------------------------------------|-------------------------------------------------------------|
| <img src="./../assets/webui/webui-dark.png" width="32%" /> | <img src="./../assets/webui/webui-light.png" width="32%" /> |

## Setup

To use window safe area insets which you basiclly need here, otherwise your config will move behind the status bar

> Why so?  
> It improves the design and it presents a much more "native" feel

#### JavaScript API

> [!IMPORTANT]
> `ksu.spawn` and `ksu.exec` needs to be enabled by the user first. You can check it with `<sanitizedModId>.getHasAccessToAdvancedKernelSuAPI()`.

- [FileInterface](./API/FileInterface.md)
- [MMRLInterface](./API/MMRLInterface.md)
- [KernelSU WebUI](https://kernelsu.org/guide/module-webui.html)
- [KernelSU NPM Package](https://www.npmjs.com/package/kernelsu)


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

      .scaffold {
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
    <div class="scaffold">
      <div class="card">
        <span>Hello from WebUI!</span>
      </div>
    </div>
  </body>
</html>
```

## Launch a WebUI from Shell

```bash
am start -n "com.dergoogler.mmrl/.ui.activity.webui.WebUIActivity" -e MOD_ID "your_id"
```
