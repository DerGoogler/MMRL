# Installer V3

Implantation

```shell
mmrl_exec() {
    if [ "$MMRL_INTR" = "true" ]; then
        local command=$1
        shift
        local args=$(printf "|%s" "$@")
        args=${args:1}
        ui_print "#!mmrl:<$command=($args)>"
    fi
}
```

## Internal commands

Every internal command starts with `mmrl_exec`!

### Clear terminal

Clears everything from the terminal

```shell
mmrl_exec clearTerminal
```

| Args | Description      |
| ---- | ---------------- |
| No   |                  |
|      | Returns no value |

### Replace last line

You can replace the last placed line, even the last line is a button

```shell
mmrl_exec setLastLine "This is a cool log"
```

| Args | Description                            |
| ---- | -------------------------------------- |
| `$1` | Text that should replace the last line |
|      | Returns no value                       |

### Remove last line

This command just removes the last line

```shell
mmrl_exec removeLastLine
```

| Args | Description      |
| ---- | ---------------- |
| No   |                  |
|      | Returns no value |

<!-- ### Add a button

This command can a little bit more but it has less functionality because you can't a click event

```shell
mmrl_exec addButton "Button text here" --variant "contained or outlined"
```

| Args        | Description                               |
| ----------- | ----------------------------------------- |
| `args[0]`   | Button text                               |
| `--variant` | Choose between `contained` and `outlined` | -->

## Making colored text easir!

When you implant the API you can start using `gui_print`.

```shell
mmrl_exec color "This is <FG.MAGENTA>MMRL<R>!"
```

| Args | Description     |
| ---- | --------------- |
| `$1` | Text            |
|      | Returns a value |

> [!NOTE]
> Other installer will return `This is MMRL!` because it's a MMRL only syntax
