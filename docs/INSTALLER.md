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


## Environment

### Check if installing in MMRL

```shell
if [ ! -z $MMRL ]; then
  ui_print "Installing in MMRL"
fi
```

### Check for bulk modules

```shell
findRequire() {
    local id="$1"  # Get the ID passed to the function

    # Check if the ID exists in BULK_MODULES
    local id_in_bulk=$(echo "$BULK_MODULES" | grep -qw "$id" && echo "true" || echo "false")

    # Check if the directory exists
    local id_dir_exists=$( [ -d "/data/adb/modules/$id" ] && echo "true" || echo "false" )

    # Return true only if both conditions are met
    if [ "$id_in_bulk" = "true" ] || [ "$id_dir_exists" = "true" ]; then
        echo "true"
    else
        echo "false"
    fi
}

# This is set by MMRL! Don't touch it!
BULK_MODULES="module1 module2 acp"

# Test with ID "acp"
if [ "$(findRequire acp)" = "true" ]; then
    echo "acp is in BULK_MODULES or /data/adb/modules/acp exists"
else
    echo "acp is missing from BULK_MODULES or its directory doesn't exist"
fi
```







