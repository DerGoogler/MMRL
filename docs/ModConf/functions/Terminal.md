# Terminal

With this class you can inplant your own terminal like MMRL's installer

> [!IMPORTANT]
> In MMRL V2.18.17 and above, `Terminal` will be a global part of **ModConf**

## Usage

```js
const myTerminal = new Terminal({
  // working dir
  cwd: "/data/local",
});

// set env vars
myTerminal.env = {
  TMPDIR: "/data/local/tmp",
};

// get results
myTerminal.onLine = (line) => {
  console.log(line);
};

// get results
myTerminal.onError = (line) => {
  console.error(line);
};


// get exit code
myTerminal.onExit = (code) => {
  console.log("Exit code:", code);
};

// start terminal
myTerminal.exec('echo "Hello, world!"');
```

> Check out [InstallTerminalV2Activity.tsx](https://github.com/DerGoogler/MMRL/blob/master/Website/src/activitys/InstallTerminalV2Activity.tsx) for advanced usage
