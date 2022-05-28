# Dev API

## Code

### Create prompt

```ts
new AlertBuilder()
  .setMessage("Custom repo")
  .setPromptCallback((input: string) => {
    if (tools.validURL(input)) {
      prefManager.setPref("repo", input);
      ons.notification.alert("Repo changed, please refresh the app");
    } else {
      ons.notification.alert("Invalid input");
    }
  })
  .showPrompt();
```

### Run native Android shell

```ts
import Shell from "@Builders/ShellBuilder";

Shell.cmd("su -V").exec();
```

### Show toast

```ts
import Toast from "@Builders/Toast";

Toast.makeText("Hellow", Toast.LENGTH_LONG).show();
```

## Managment

### Bump version

```bash
# Run in main dir
python3 update.py
```

### Bulding website

> Run in /Website dir

```bash
# Build dev
make dev

# Build production
make prod

# Build licenses
make licenses

# Install debug apk with bundled website
make openApp
```
