[bun]: https://bun.sh/

# Dev setup

Requirements;

- [Bun][bun] v0.1.0
- Brain

## Install all packages

```
bun install
```

## Adding an package

```
bun add googlers-tools
```

## Remove an package

```
bun remove googlers-tools
```

## Run an action/script from package.json

```
bun run dev
```

# Dev API

## File system

```ts
fs.readFile("data/shdialog"); // or
new fs("data/shdialog").readFile();
```
