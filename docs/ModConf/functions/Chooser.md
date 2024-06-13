# Chooser

File picker, even mutiple files

> [!IMPORTANT]
> In MMRL V2.18.17 and above, `Chooser` will be a global part of **ModConf**

## Usage

```js
const chooseModule = new Chooser("application/zip");

chooseModule.onChose = (files) => {
  if (Chooser.isSuccess(files)) {
    console.log(files);
  }
};

chooseModule.getFiles();
```
