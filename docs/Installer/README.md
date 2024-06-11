# Installer V2

Implantation

```shell
if [ "$MMRL_INTR" = "true" ]; then
    ui_print "#!useInternal"
    mmrl_exec() { ui_print "#!mmrl:$*"; }
    gui_print() { ui_print "$@"; }
else
    mmrl_exec() { true; }
    gui_print() { ui_print "$@" | sed 's/<[A-Z.]*>//g'; }
fi
```

## Internal commands

Every internal command starts with `mmrl_exec`!

### Clear terminal

Clears everything from the terminal

```shell
mmrl_exec clearTerminal
```

| Args | Description |
| ---- | ----------- |
| No   |             |

### Replace last line

You can replace the last placed line, even the last line is a button

```shell
mmrl_exec setLastLine "This is a cool log"
```

| Args      | Description                            |
| --------- | -------------------------------------- |
| `args[0]` | Text that should replace the last line |

### Remove last line

This command just removes the last line

```shell
mmrl_exec removeLastLine
```

| Args | Description |
| ---- | ----------- |
| No   |             |

### Add a button

This command can a little bit more but it has less functionality because you can't a click event

```shell
mmrl_exec addButton "Button text here" --variant "contained or outlined"
```

| Args        | Description                               |
| ----------- | ----------------------------------------- |
| `args[0]`   | Button text                               |
| `--variant` | Choose between `contained` and `outlined` |

## Making colored text easir!

When you implant the API you can start using `gui_print`.

```shell
gui_print "This is <FG.MAGENTA>MMRL<R>!"
```

> [!NOTE]
> Other installer will return `This is MMRL!` because it's a MMRL only syntax
