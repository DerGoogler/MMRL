# Modul Fayl Sistemi (ModFS)

ETMƏK

## Həll yolları

Bəzi konfiqurasiyaların qarşısını almaq üçün bəzi nümunələr var

## MMRL Quraşdırma Alətlərindən çəkinin

Bu həll yolu digər modulları quraşdırmaq üçün əlavə modul quraşdırmaq istəməyən insanlar üçündür

Seçdiyiniz kök metoduna əsasən

| Kök metodu  | ƏXİ        | Busybox    |
| ----------- | ---------- | ---------- |
| Magisk      | `<MSUCLI>` | `<MSUBSU>` |
| KernelSU    | `<KSUCLI>` | `<KSUBSU>` |
| APatch      | `<ASUCLI>` | `<ASUBSU>` |

### Lokal quraşdırma skripti

```shell
<MSUCLI> --install-module "<ZIPFILE>"
```

> Biz nümunə olaraq magisk istifadə edirik. KernelSU və ya APatch `<KSUCLI> module install "<ZIPFILE>"`-dır.

### Quraşdırma skriptini araşdırın

```shell
FILE="/data/local/tmp/<MODID>.zip"; <MSUBSU> wget "<URL>" -O $FILE; <MSUCLI> --install-module $FILE;
```

# Modulunuza lokal bir örtük əlavə edin

> [!VACIB]
> Örtük yolunuzu sərt kodlamayın

```properties
id=mkshrc
# ...

cover=<MODULECWD>/system/usr/share/mmrl/covers/cover.png
# ModConf ciq-da saxlanılırsa
# cover=<CONFCWD>/assets/cover.png
```
