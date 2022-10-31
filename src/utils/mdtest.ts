export const mdtest = `# Magisk Bootloop Protector

## About

Protect your system from bootloop caused by Magisk modules. In case the data partition is encrypted and you cannot access \`/data/adb/modules\`, or you don't want to turn off **force encryption** to protect your private data.

- This module is not need if you can boot device into Safe Mode, just boot into Safe Mode and Magisk will disable all modules.

- This module is not need if you have unencrypted data partition, you can just disable module in \`/data/adb/modules\`.

- If you install module that directly modify system (mean doesn't go through magisk systemless approach) and cause bootloop, Bootloop Protector cannot help!!!

- **Bootloop protector should only be used as a precaution**. Some modules still can affect the system after they are disabled or removed. The only option is wiping all your data. **Please take care of what you are going to install**.

## Requirements
- Magisk 20.4+ is installed

## Installation
It's Magisk module, flash it in **Magisk** app

## Usage

### Auto detect (anti zygote loop)

Usually, bootloop occurs because zygote doesn't start properly or stuck at restarting. The script run in \`late_start\` mode. It will check Zygote's Process ID 3 times every 15 seconds.  And if Zygote's Process ID doesn't match for 3 times, check the Process ID for next 15 seconds to make sure and if it's different again, the script will disable all modules and reboot the your device.

### Disable from Custom Recovery

You can boot into **TWRP** and create a dummy file named \`disable_magisk\` in one of these location and then reboot to system to boot into Safe Mode (if **Auto detect** is not working):
- /cache
- /data/unencrypted
- /metadata
- /persist
- /mnt/vendor/persist

How to create a file in TWRP? Open Terminal Emulator in TWRP and type:

\`\`\`
touch /cache/disable_magisk
\`\`\`

**NOTE: MAKE SURE ALL PARTITIONS ARE MOUNTED**

### New way to reboot to Safe Mode
> Available only when module is installed into boot image
If you device does not have Custom Recovery, you can reboot (by holding the power) while in **boot animation** or **bootloop state**, in short **reboot while device is booting but not completed** will trigger Safe Mode in the next boot. 

This feature is not enabled by default, to enable this, create a blank file name "new_safemode" in one or more of these location:
- /cache
- /data/unencrypted
- /persist
- /metadata
- /mnt/vendor/persist

## Uninstall this module

- Reflash module and select Uninstall`