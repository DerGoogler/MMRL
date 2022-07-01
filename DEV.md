# Dev API

## File system

```ts
fs.readFile("data/shdialog"); // or
new fs("data/shdialog").readFile();
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

# Install NPM modules
make npm i=findbyview

# Build licenses
make licenses

# Install debug apk with bundled website
make openApp
```
