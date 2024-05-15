[googleplay-release]: https://play.google.com/store/apps/details?id=com.dergoogler.mmrl
[github-release]: https://github.com/DerGoogler/MMRL
[mmrlini]: https://github.com/DerGoogler/mmrl_install_tools
[mmrlini-release]: https://github.com/DerGoogler/mmrl_install_tools/releases

# **F**requently **A**sked **Q**uestions 

> We do not recommend to delete the entire `/data/adb/mmrl` folder. This folder contains your saved ModConf Playground file and other config files like from [MMRL Install Tools][mmrlini-release]

## MMRL does not load correctly or shows a empty screen

This my due internal config changes or invalid config files

To solve this, try the following options:

- reinstall the app from [GitHub Releases][github-release] or the [Google Play Store][googleplay-release]
- clean app data and cache
- removing `/data/adb/mmrl/settings.v*.json` or `/data/adb/mmrl`

## Cannot install or update modules

Try updating [MMRL Install Tools][mmrlini-release] or remove the `/data/adb/mmrl/mmrlini.v*.ini` config file
