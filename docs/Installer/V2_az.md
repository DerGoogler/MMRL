# Quraşdırıcı V2

İmplantasiya

```shell
if [ "$MMRL_INTR" = "true" ]; then
    mmrl_exec() { ui_print "#!mmrl:$*"; }
    gui_print() { mmrl_exec color "\"$@\""; }
    mmrl_setLastLine() { mmrl_exec setLastLine "\"$@\""; }
else
    mmrl_exec() { true; }
    gui_print() { ui_print "$@" | sed 's/<[A-Z.]*>//g'; }
    mmrl_setLastLine() { true; }
fi
```

## Daxili əmr

Hər bir daxili əmr `mmrl_exec' ilə başlayır!

### Terminalı təmizləyin

Terminaldan hər şeyi təmizləyir

```shell
mmrl_exec clearTerminal
```

| Arqlər | Təsvir |
| ------ | ------ |
| Yoxdur |        |

### Son sətri əvəz edin

Son yerləşdirilmiş sətri əvəz edə bilərsiniz, hətta sonuncu sətir bir düymədir

```shell
mmrl_exec setLastLine "This is a cool log"
```

| Arqlər    | Təsvir                          |
| --------- | ------------------------------- |
| `args[0]` | Son sətri əvəz etməli olan mətn |

### Son sətri silin

Bu əmr yalnız sonuncu sətri silir

```shell
mmrl_exec removeLastLine
```

| Arqlər | Təsvir |
| ------ | ------ |
| Yoxdur |        |

### Bir düymə əlavə edin

Bu əmr bir az daha çox ola bilər, lakin daha az funksionallığa malikdir, çünki bir klik hadisəsi edə bilməzsiniz

```shell
mmrl_exec addButton "Button text here" --variant "contained or outlined"
```

| Arqlər      | Təsvir                               |
| ----------- | --------------------------------------------- |
| `args[0]`   | Düymə mətni                                   |
| `--variant` | 'contained' və 'outlined' arasında seçim edin |

## Rəngli mətni asanlaşdırmaq!

PPİ-ni implantasiya etdikdə `gui_print` istifadə etməyə başlaya bilərsiniz.

```shell
gui_print "This is <FG.MAGENTA>MMRL<R>!"
```

> [!QEYD]
> Digər quraşdırıcı 'Bu MMRL!' qaytaracaq, çünki bu, yalnız MMRL sintaksisidir
