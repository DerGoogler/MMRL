# Window

Here is the window API documentated, restricted.

## `.open`

This is currently the only method avaiable here

```js
const windowFeatures = "left=100,top=100,width=320,height=320";
window.open(
  "https://www.mozilla.org/",
  "mozillaWindow",
  windowFeatures
);
```

Android supports a additional feature `color`

```js
const windowFeatures = "color=#ffffff";
window.open("https://www.mozilla.org/", "mozillaWindow", windowFeatures);
```
