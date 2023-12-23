<p align="center">
  <img width="550" height="auto" src="https://mmrl.dergoogler.com/assets/MMRL-Cover.png">
  <br/>Your highly customizable module manager</b>
</p>

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.dergoogler.mmrl"><img height="75px" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"></a>
  <a href="https://github.com/DerGoogler/MMRL/releases"><img height="75px" alt="Get it on GitHub" src="https://dergoogler.com/bl-content/uploads/pages/e5f2cff5950bf12b7ecdcc9a54d0a348/get-it-on-github.png"></a>
</p>

<p align="center">
  <a href=""><img src="https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fwebpack.yml?logo=github&amp;label=Build%20with%20Webpack" alt="Build with Webpack"></a>
  <a href="https://github.com/DerGoogler/MMRL/actions/workflows/codeql-analysis.yml"><img src="https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fcodeql-analysis.yml?logo=github&amp;label=CodeQL" alt="CodeQL"></a>
  </br>
  <a href="https://github.com/DerGoogler/MMRL/actions/workflows/android.yml"><img src="https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fandroid.yml?logo=github&amp;label=Android%20CI" alt="Android CI"></a>
  <a href="https://github.com/DerGoogler/MMRL/actions/workflows/build-debug.yml"><img src="https://img.shields.io/github/actions/workflow/status/DerGoogler/MMRL/.github%2Fworkflows%2Fbuild-debug.yml?logo=github&amp;label=Generate%20APK%20Debug" alt="Generate APK Debug"></a>
  </br>
  <img src="https://img.shields.io/github/downloads/DerGoogler/MMRL/total?label=All%20time%20downloads" alt="GitHub all releases">
</p>


# Summary

Introducing Magisk Module Repo Loader (MMRL) - the ultimate module manager for Magisk and KernelSU on Android. This highly configurable app allows users to manage modules effortlessly, all while being completely free of ads.

# Requirements

- Android 8.0 or later
- [MMRL Install Tools](https://github.com/Googlers-Repo/mmrl_install_tools)
- 4-5 GB RAM (lower may possible)

# What MMRL Supports (Roadmap)

- [x] Custom repo loading (Since 1.4.2 mutiple repositories are supported)
- [x] Translation
- [x] Dark mode
- [x] Themes

## Android only

- [x] View installed modules
- [x] Remove installed modules
- [x] Enable/Disable installed modules
- [x] Dynamic module configuration
- [x] Module install
- [x] Monet theming
- [x] Logcat logger ([MMRL Install Tools](https://github.com/Googlers-Repo/mmrl_install_tools) required)

### Root Manager (Android)

- [x] Magisk
- [x] Magisk Delta
- [x] KernelSU

# Screenshots

<p float="left">
  <img src="https://play-lh.googleusercontent.com/wqup-XYEono-6Uun3t0wjqTunR4P46d92mYzJEYU567MN-Ja0UBT3zFi8nQBtwnfcg=w5120-h2880-rw"  width="240" height="auto">
  <img src="https://play-lh.googleusercontent.com/aGpvDDcFNWKvJ-f1kz_NsaUkzczVQXOlL2ia3IWG9CK3ghMJQHXg4ehbOrxUh26Ptg=w5120-h2880-rw" width="240" height="auto">
  <img src="https://play-lh.googleusercontent.com/sIIYd-6yG2VOE9u1IjFK7ztE7dy8odOV_r1_bIl-7UIRSZMypZl40mkl7cwTyJAbE_U=w5120-h2880-rw" width="240" height="auto">
  <img src="https://play-lh.googleusercontent.com/EFUFow1bVx1HxVFIVbUHAk0oy5xz_kfjZLeuKO5Y-VAcQFNCQMNezmBUuCAHlWAJ44g=w5120-h2880-rw" width="240" height="auto">
  <img src="https://play-lh.googleusercontent.com/5blSZWEGs_o3w-_NL7qvxaVTrrN4dKjVKn-gr3eZZJT3070gfzie3Zm7axHh2igHW_KA=w5120-h2880-rw" width="240" height="auto">
</p>

# Supported `module.prop` properties

```properties
# Magisk supported properties
id=<string>
name=<string>
version=<string>
versionCode=<int>
author=<string>
description=<string>

# MMRL supported properties
minKernelSU=<boolean>

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
