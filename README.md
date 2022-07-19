<h1 align="center"><pre>Magisk Modules Repo Loader</pre></h1>

Magisk Module Repo Loader (MMRL). Allows you to load custom repos with an simple UI

## How to create custom repo?

Use [this](https://dergoogler.com/repo-generator/) service to create a custom repository.

## What MMRL Supports (Roadmap)

- [x] Custom repo loading (Since 1.4.2 mutiple repositories are supported)
- [x] Translation
- [x] Dark mode

#### Android only

- [x] View installed modules
- [x] Remove installed modules
- [x] Enable/Disable installed modules
- [ ] Module install
- [ ] Monet theming

## Screenshots

<table>
<tr>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883584-008e135e-09d3-4c5f-9780-9d963b70205f.png"/>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883624-b564a344-7f6a-4a94-8494-3ca6b7e6a311.png"/>
<tr>
</table>

## Supported `module.json` syntax

**MMRL** new default

> **Note**
> `prop_url` can also used as fallback

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
      "notes_url": "https://.../README.md",
      "props": {
        "id": "samsung_a70_raven_prop_overlay",
        "name": "Samsung Galaxy A70 Overlay",
        "author": "Der_Googler",
        "version": "2022-05-22",
        "versionCode": "2205-22",
        "description": "Spoof your device to RAVEN pixel prop (April 2022) with an generared overlay for Samsung Galaxy A70 (GSI's only). Prop original made by Tesla",
        "foxprops": {
          "minApi": "31",
          "maxApi": "31",
          "minMagisk": "18000",
          "needRamdisk": null,
          "support": null,
          "donate": null,
          "config": null,
          "changeBoot": null
        }
      }
    }
  ]
}
```

**FoxMMM**

```json
{
  "name": "Repo name",
  "website": "repo website",
  "support": "optional support url",
  "donate": "optional support url",
  "submitModule": "optional submit module URL",
  "last_update": 0,
  "modules": [
    {
      "id": "module id",
      "last_update": 0,
      "notes_url": "notes url",
      "prop_url": "module.prop url",
      "zip_url": "module.zip url"
    }
  ]
}
```

## FAQ

### Why does some description reports `404: Not Found`?

Always create an `README.md` not `readme.md` or something.

### Module props like `changeBoot` or something are not displayed?

The module doesn't have this prop.

### What are low-quality modules?

These modules doens't have props like `version`, `versionCode`, `description`, `id` or `author`

### Why does my module aren't displayed?

The MMRL has an own hidding system. This means that bad modules can hidden from an admin.

### How to get an verified module?

This depends on the general module quality. (See `What are low-quality modules?`). Not all modules get an verified badge.

# Credits & Thanks

- [topjohnwu/libsu](https://github.com/topjohnwu/libsu)
- [Fox2Code/FoxMagiskModuleManager](https://github.com/Fox2Code/FoxMagiskModuleManager)
- [DerGoogler/dgm-cms](https://github.com/DerGoogler/dgm-cms)
- [Hentai-Web/Core](https://github.com/Hentai-Web/Core)
- [Hentai-Web/Android](https://github.com/Hentai-Web/Android)
