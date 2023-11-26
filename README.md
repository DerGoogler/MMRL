# Magisk Modules Repo Loader

Introducing Magisk Module Repo Loader (MMRL) - the ultimate module manager for Magisk and KernelSU on Android. This highly configurable app allows users to manage modules effortlessly, all while being completely free of ads.

[![Build with Webpack](https://github.com/DerGoogler/MMRL/actions/workflows/webpack.yml/badge.svg?branch=master)](https://github.com/DerGoogler/MMRL/actions/workflows/webpack.yml)
[![CodeQL](https://github.com/DerGoogler/MMRL/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/DerGoogler/MMRL/actions/workflows/codeql-analysis.yml)
[![Android CI](https://github.com/DerGoogler/MMRL/actions/workflows/android.yml/badge.svg)](https://github.com/DerGoogler/MMRL/actions/workflows/android.yml)

## Important

We want to implant [Sentry](https://sentry.io) in MMRL to automatically report crashes and errors. We don't want to implant it without asking the community.

> [Sentry](https://sentry.io) can disabled in the settings if the vote success

Here you can vote in this [discussion](https://github.com/DerGoogler/MMRL/discussions/50) ([Telegram Vote](https://t.me/Fox2Code_Chat/34775))

> This vote is expected to end on 19. November, 2023.

## What MMRL Supports (Roadmap)

- [x] Custom repo loading (Since 1.4.2 mutiple repositories are supported)
- [x] Translation
- [x] Dark mode
- [x] Themes
- [ ] Favorite lists

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

# MMRL supported properties
# mmrlConfig=<file> config file get automatically detected
mmrlNoComments=<boolean>
mmrlCover=<url>
mmrlAuthor=<uid>
mmrlLogo=<url>
mmrlScreenshots=<url>,<url>,<url> ...
# Developers that points "Gaming" won't have a change to get verified. Magisk isn't made for gaming purposes.
mmrlCategories=<string>,<string>,<string> ...

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

## Supported `module.json` syntax

> **Note** > `prop_url` should always an string otherwise MMRL can't manipulate it.

```json
{
  "last_update": 1658146279000,
  "name": "Googlers Magisk Repo",
  "website": "https://dergoogler.com/repo",
  "support": "https://t.me/The_Googler",
  "donate": null,
  "submitModule": null,
  "modules": [
    {
      "id": "samsung_a70_raven_prop_overlay",
      "last_update": 1654181061000,
      "prop_url": "https://.../module.prop",
      "zip_url": "https://.../master.zip",
      "notes_url": "https://.../README.md"
    }
  ]
}
```

## FAQ

### Why does some description reports `404: Not Found`?

Always create an `README.md` not `readme.md` or something.

### Module props like `changeBoot` or something are not displayed?

The module doesn't have this prop.

### Why does my module aren't displayed?

The MMRL has an own hidding system. This means that bad modules can hidden from an admin.

### How to get an verified module?

**Updated soon**

# Credits & Thanks

- [Googlers-Repo/node-native](https://github.com/Googlers-Repo/node-native)
- [topjohnwu/libsu](https://github.com/topjohnwu/libsu)
- [Fox2Code/FoxMagiskModuleManager](https://github.com/Fox2Code/FoxMagiskModuleManager)
- [DerGoogler/dgm-cms](https://github.com/DerGoogler/dgm-cms)
- [Hentai-Web/Core](https://github.com/Hentai-Web/Core)
- [Hentai-Web/Android](https://github.com/Hentai-Web/Android)
