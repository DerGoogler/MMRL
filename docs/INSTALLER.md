# Installer API

You can control some parts of the terminal. The API is listed below

Optionally you can append `> /dev/null 2>&1` to the `am` commands to hide the output while installing modules

## Clear Terminal

Clears the terminal. No arguments can be passed

```shell
am broadcast -a com.dergoogler.mmrl.CLEAR_TERMINAL
```

## Set last line

This command could be more useful. It can replace the latest line of the terminal.
With this you could build progress bars

```shell
ui_print "- I'm going to be replaced"

am broadcast -a com.dergoogler.mmrl.SET_LAST_LINE --es text "- Replaced"
```

## Remove last line

This command removes the last line of the terminal. No arguments can be passed

```shell
am broadcast -a com.dergoogler.mmrl.REMOVE_LAST_LINE
```
