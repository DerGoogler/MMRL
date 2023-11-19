# Magisk Modules Repo Loader

Introducing Magisk Module Repo Loader (MMRL) - the ultimate module manager for Magisk and KernelSU on Android. This highly configurable app allows users to manage modules effortlessly, all while being completely free of ads.

[![Build with Webpack](https://github.com/DerGoogler/MMRL/actions/workflows/webpack.yml/badge.svg?branch=master)](https://github.com/DerGoogler/MMRL/actions/workflows/webpack.yml)
[![CodeQL](https://github.com/DerGoogler/MMRL/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/DerGoogler/MMRL/actions/workflows/codeql-analysis.yml)
[![Android CI](https://github.com/DerGoogler/MMRL/actions/workflows/android.yml/badge.svg)](https://github.com/DerGoogler/MMRL/actions/workflows/android.yml)

## What MMRL Supports (Roadmap)

- [x] Custom repo loading (Since 1.4.2 mutiple repositories are supported)
- [x] Translation
- [x] Dark mode
- [x] Themes

### Android only

- [x] View installed modules
- [x] Remove installed modules
- [x] Enable/Disable installed modules
- [x] Dynamic module configuration
- [x] Module install
- [x] Monet theming

#### Root Manager (Android)

- [x] Magisk
- [x] Magisk Delta
- [x] KernelSU

## Retive configs

```shell
function getconf {
  /system/bin/getprop "$1" "$2" | sed 's/^"\(.*\)"$/\1/'
}
```

## Screenshots

<table>
<tr>
	<td><img src="assets/screen1.jpg" width="250" />
	<td><img src="assets/screen2.jpg" width="250"/>
<tr>
</table>

## Supported `module.prop` properties

```properties
# Magisk supported properties
id=<string>
name=<string>
version=<string>
versionCode=<int>
author=<string>
description=<string>

# Fox's Mmm supported properties
minApi=<int>
maxApi=<int>
minMagisk=<int>
needRamdisk=<boolean>
support=<url>
donate=<url>
config=<package>
changeBoot=<boolean>
mmtReborn=<boolean>
```

# Credits & Thanks

- [topjohnwu/libsu](https://github.com/topjohnwu/libsu)
- [Fox2Code/FoxMagiskModuleManager](https://github.com/Fox2Code/FoxMagiskModuleManager)
- [DerGoogler/dgm-cms](https://github.com/DerGoogler/dgm-cms)
- [Hentai-Web/Core](https://github.com/Hentai-Web/Core)
- [Hentai-Web/Android](https://github.com/Hentai-Web/Android)
