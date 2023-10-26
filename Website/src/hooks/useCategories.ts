export function useCategories(input?: arr<str>) {
  const categories = [
    "Tools",
    "Boot",
    "Coding",
    "Configurable",
    "Management",
    "System",
    "Apps",
    "Gaming",
    "Other",
    // New categroies
    "Magisk",
    "KernelSU",
    "Zygisk",
    "LSPosed",
    "Xposed",
    "Performance Optimization",
    "Battery Life",
    "Customization",
    "Audio Enhancements",
    "Security",
    "Camera Enhancements",
    "SystemUI Mods",
    "Tweaks and Hacks",
    "Modifications for Root Apps",
    "System Fonts and Emojis",
    // Same as "Other"
    "Miscellaneous",
    "ROM-Specific Modules",
    "Gamepad and Controller Support",
    "App Additions and Features",
    "Adblocking and Hosts Files",
    "Navigation Bar and Gesture Customization",
    "Advanced Audio Mods",
    "Custom Kernels",
    "Boot Animation",
    "Privacy Enhancements"
  ];
  if (input) {
    return categories.filter((i) => input.indexOf(i) !== -1);
  } else {
    return [];
  }
}
