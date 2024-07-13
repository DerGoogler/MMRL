# ModConf nədir?

ModConf **Modul Konfiqurasiyası** deməkdir, MMRL-dəki bu xüsusiyyət fərdi modullar üçün dinamik konfiqurasiya səhifələri yaratmağa imkan verir. Əsasən, o, modul haqqında məlumatın MMRL tətbiqində necə göstərildiyini fərdiləşdirmək üçün bir yol təqdim edir.

Bunu bu şəkildə düşünün: Varsayılan olaraq, MMRL modulun adı və təsviri kimi əsas təfərrüatlarını göstərə bilər. ModConf ilə modul tərtibatçıları öz modullarına uyğun əlavə məlumatları göstərən xüsusi səhifələr yarada bilərlər. Bu, aşağıdakı kimi şeyləri əhatə edə bilər:

- Modul üçün ekran görüntüləri və ya simgələr
- Modulun nə etdiyi və onun funksiyalarının ətraflı təsviri
- Modula xüsusi konfiqurasiya seçimləri
- Modulun həqiqiliyini təmin etmək üçün doğrulama detalları
- Asılılıq məlumatları, bunun işləməsi üçün tələb olunan digər modulların siyahılanması

MMRL özü bu ModConf səhifələrini birbaşa yaratmasa da, tərtibatçılar üçün onları öz modullarına tətbiq edəcəyi çərçivəyi təmin edir.

## Başlayarkən

`index.jsx` faylınızın `<MODDIR>/system/usr/share/mmrl/config/<MODID>/index.jsx` içinə yerləşdirilməsi lazımdır.

Sadə başlanğıc:

```jsx
import React from "react";
import { Page } from "@mmrl/ui";

export default () => {
  return <Page>Test</Page>;
};
```

> [!VACİB]
> Məzmununuzu həmişə `<Page></Page>` ilə sarıyın, əks halda səhifəniz düzgün şəkildə başlamayacaq

## Mövcud kitabxanalar

Bütün istifadə edilə bilən modulları görmək üçün [`libs.ts`](https://github.com/DerGoogler/MMRL/blob/master/Website/src/components/ModConfView/libs.ts) ünvanına baxın

## Necə işləyir

`require` ilə siz əvvəlcədən təyin edilmiş kitabxanaları və ya fayllarınızı idxal edə bilərsiniz

```js
const React = require("react");
// or
import React from "react";
```

----

Dəstəklənən fayl növləri:

- `*.js`
- `*.jsx`
- `*.json`
- `*.yaml`
- `*.yml`
- `*.ini`
- `*.prop`
- `*.properties`

```js
import { Component } from "Component" // .jsx

const properties = require(path.resolve(__moddirname, "module.prop"))

const { id, name, author } = properties;
```

## Varsayılan funksiyalar və dəyişənlər

İnkişafı asanlaşdıran bəzi varsayılan funksiyalar və dəyişənlər var..

> Bu funksiyalar həmçinin ModConf xidmətlərindən də istifadə edir.

### `__idname` (former `modid`)

Types

```ts
declare const __idname: string;
```

### `__modpath` (new)

Types

```ts
declare const __modpath: string;
```


### `__filename` (new)

Types

```ts
declare const __filename: string;
```

### `__dirname` (former `modpath`)

Types

```ts
declare const __dirname: string;
```

# Qara siyahıya alınmış funksiyalar

- `eval()`
- `document.write()`
- `document.writeln()`
- `decodeURI()`
- `decodeURIComponent()`
- `endodeURI()`
- `encodeURIComponent()`
- `atob()`
- `bota()`

Bu funksiya bir 'IsolatedEvalError' xətası verəcək və konfiqurasiyanız funksiyanı çağırdıqdan dərhal sonra dayandırılacaq.

# Kod Serveri

Kod-server ilə konfiqurasiya inkişafını asanlaşdırın

## Tələblər

- [Systemless Mkshrc](https://github.com/Magisk-Modules-Alt-Repo/mkshrc)
- [Systemless Node.js](https://github.com/Magisk-Modules-Alt-Repo/node)
- [Code Server](https://github.com/Googlers-Repo/code-server)

> Kod Serverindən başqa hər şeyi MMRL-də tapa bilərsiniz
```shell
# start code server
code-server 
```

Və ya riskli yolu istifadə edin

```shell
ln -s `which code-server` /data/adb/service.d/code-server
```
