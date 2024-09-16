# Module File System (ModFS)

**ModFS** is a core component that provides a flexible and customizable filesystem for managing modules on Android devices. It's designed to streamline module installation, updates, and removal while offering granular control over module structure.

<!--

TODO: REWORK

## Workarounds

Here are some samples to avoid some configs

## Avoid MMRL Install Tools

This workaroud is for people who don't wanna install a extra module for installing other modules

Based on your selected root method

| Root method | CLI        | Busybox    |
| ----------- | ---------- | ---------- |
| Magisk      | `<MSUCLI>` | `<MSUBSU>` |
| KernelSU    | `<KSUCLI>` | `<KSUBSU>` |
| APatch      | `<ASUCLI>` | `<ASUBSU>` |

### Local install script

```shell
<MSUCLI> --install-module "<ZIPFILE>"
```

> We use magisk as example. KernelSU or APatch is `<KSUCLI> module install "<ZIPFILE>"`

### Explore install script

```shell
FILE="/data/local/tmp/<MODID>.zip"; <MSUBSU> wget "<URL>" -O $FILE; <MSUCLI> --install-module $FILE;
```

-->

## Types and functions

### findBinary

> [!NOTE]
> This is not a global ModFS part and only avaiable above v3.24.31.

```
<findBinary=(bin1,bin1|arg1 arg1)>
```

Returns the full paths of the first found binary
