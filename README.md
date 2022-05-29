# Magisk Modules Repo Loader (MMRL)

The Magisk Module Repo Loader (MMRL). Allows you to load custom repos with an simple UI

## How to create custom repo?

At first need you to fork [Magisk-Modules-Alt-Repo/json](https://github.com/Magisk-Modules-Alt-Repo/json) or create yourself one

### Configuration

Change `Magisk-Modules-Alt-Repo` to your username or something where is hosted.

```py
# Configuration
REPO_NAME = "Magisk-Modules-Alt-Repo"
REPO_TITLE = "Magisk Modules Alt Repo"
```

At least can you edit the json output

> Please keep all default created objects!

```py
# Create meta module information
module = {
    "id": moduleprop["id"],
    "last_update": int(repo.updated_at.timestamp() * 1000),
    "prop_url": f"https://raw.githubusercontent.com/{repo.full_name}/{repo.default_branch}/module.prop",
    "zip_url": f"https://github.com/{repo.full_name}/archive/{repo.default_branch}.zip",
    "notes_url": f"https://raw.githubusercontent.com/{repo.full_name}/{repo.default_branch}/README.md",
    "stars": int(repo.stargazers_count)
}
```

## What MMRL Supports (Roadmap)

- [x] Custom repo loading
- [ ] Translation
- [ ] ~Dark mode~

#### Android only

- [x] Custom theming
- [x] View installed modules
- [x] Remove installed modules
- [x] Disable installed modules
- [x] Enable installed modules
- [ ] Module install

## Meet the Description API (DAPI)

### Create an changelog (beta)

<!-- prettier-ignore -->
```html
<changelog version="1.0.0">
    - Fixed somthing
    - Better
</changelog>
```

### Create check mark & danger mark

<!-- prettier-ignore -->
```markdown
# About somthing
- <dangericon color="#cf222e" size="16"/> This isn't good!
- <checkicon color="#1a7f37" size="16"/> That's good!
```

## Screenshots

<table>
<tr>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883584-008e135e-09d3-4c5f-9780-9d963b70205f.png"/>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883624-b564a344-7f6a-4a94-8494-3ca6b7e6a311.png"/>
<tr>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883656-acacbe8e-2f78-48a5-9f85-839cebdf0f82.png"/>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883697-ff98c975-74e0-4622-b71c-189576e8c4f7.png"/>
<tr>
	<td><img src="https://user-images.githubusercontent.com/54764558/170883716-1b774428-e9dd-4de6-b341-9bc07417e771.png"/>
	<td><img src=""/>
<tr>
</table>

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
