# Magisk Modules Repo Loader

Introducing Magisk Module Repo Loader (MMRL) - the ultimate module manager for Magisk and KernelSU on Android. This highly configurable app allows users to manage modules effortlessly, all while being completely free of ads.

[![Build with Webpack](https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fwebpack.yml?logo=github&label=Build%20with%20Webpack
)](https://github.com/DerGoogler/MMRL/actions/workflows/webpack.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fcodeql-analysis.yml?logo=github&label=CodeQL
)](https://github.com/DerGoogler/MMRL/actions/workflows/codeql-analysis.yml)
[![Android CI](https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fandroid.yml?logo=github&label=Android%20CI
)](https://github.com/DerGoogler/MMRL/actions/workflows/android.yml)
[![Generate APK Debug](https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fbuild-debug.yml?logo=github&label=Generate%20APK%20Debug)](https://github.com/DerGoogler/MMRL/actions/workflows/build-debug.yml)

![GitHub all releases](https://img.shields.io/github/downloads/DerGoogler/MMRL/total?label=All%20time%20downloads)

## Requirements

- Android 8.0 or later
- [MMRL Install Tools](https://github.com/Googlers-Repo/mmrl_install_tools)

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

<p><img src="https://play-lh.googleusercontent.com/wqup-XYEono-6Uun3t0wjqTunR4P46d92mYzJEYU567MN-Ja0UBT3zFi8nQBtwnfcg=w5120-h2880-rw" width="32%"> <img src="https://play-lh.googleusercontent.com/aGpvDDcFNWKvJ-f1kz_NsaUkzczVQXOlL2ia3IWG9CK3ghMJQHXg4ehbOrxUh26Ptg=w5120-h2880-rw" width="32%"> <img src="https://play-lh.googleusercontent.com/sIIYd-6yG2VOE9u1IjFK7ztE7dy8odOV_r1_bIl-7UIRSZMypZl40mkl7cwTyJAbE_U=w5120-h2880-rw" width="32%"></p>
<p><img src="https://play-lh.googleusercontent.com/EFUFow1bVx1HxVFIVbUHAk0oy5xz_kfjZLeuKO5Y-VAcQFNCQMNezmBUuCAHlWAJ44g=w5120-h2880-rw" width="32%"> <img src="https://play-lh.googleusercontent.com/5blSZWEGs_o3w-_NL7qvxaVTrrN4dKjVKn-gr3eZZJT3070gfzie3Zm7axHh2igHW_KA=w5120-h2880-rw" width="32%"></p>

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

- [Googlers-Repo/node-native](https://github.com/Googlers-Repo/node-native)
- [topjohnwu/libsu](https://github.com/topjohnwu/libsu)
- [Fox2Code/FoxMagiskModuleManager](https://github.com/Fox2Code/FoxMagiskModuleManager)
- [DerGoogler/dgm-cms](https://github.com/DerGoogler/dgm-cms)
- [Hentai-Web/Core](https://github.com/Hentai-Web/Core)
- [Hentai-Web/Android](https://github.com/Hentai-Web/Android)
