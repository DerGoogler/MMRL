# ModConf

TODO

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
