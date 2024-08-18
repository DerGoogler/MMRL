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

## Add a local cover to your module

> [!IMPORTANT]
> Do not hardcode your cover path

```properties
id=mkshrc
# ...

cover=<MODULECWD>/system/usr/share/mmrl/covers/cover.png
# If stored in ModConf cwd
# cover=<CONFCWD>/assets/cover.png
```
