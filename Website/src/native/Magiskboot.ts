import Shell from "./ShellBuilder";

class Magiskboot {
  public static readonly magiskbootpath: string = "/data/adb/magisk/magiskboot";

  /**
   * @description
   * ```
   * Unpack <bootimg> to its individual components, each component to
   * a file with its corresponding file name in the current directory.
   * Supported components: kernel, kernel_dtb, ramdisk.cpio, second,
   * dtb, extra, and recovery_dtbo.
   * By default Each component will be automatically decompressed
   * on-the-fly before writing to the output file.
   * If '-n' is provided, all decompression operations will be skipped;
   * each component will remain untouched, dumped in its original format.
   * If '-h' is provided, the boot image header information will be
   * dumped to the file 'header', which can be used to modify header
   * configurations during repacking.
   * Return values:
   * 0:valid    1:error    2:chromeos
   * ```
   * @param args
   */
  public static unpack(args: string[]): void | string {
    return this.magiskboot(["unpack", args.join(" ")]);
  }

  /**
   * @description
   * ```
   * Repack boot image components using files from the current directory
   * to [outbootimg], or 'new-boot.img' if not specified.
   * <origbootimg> is the original boot image used to unpack the components.
   * By default, each component will be automatically compressed using its
   * corresponding format detected in <origbootimg>. If a component file
   * in the current directory is already compressed, then no addition
   * compression will be performed for that specific component.
   * If '-n' is provided, all compression operations will be skipped.
   * If env variable PATCHVBMETAFLAG is set to true, all disable flags in
   * the boot image's vbmeta header will be set.
   * ```
   * @param args
   * @returns
   */
  public static repack(args: string[]): void | string {
    return this.magiskboot(["repack", args.join(" ")]);
  }

  /**
   * @description
   * ```
   * Do cpio commands to <incpio> (modifications are done in-place)
   *   Each command is a single argument, add quotes for each command.
   *   Supported commands:
   *     exists ENTRY
   *       Return 0 if ENTRY exists, else return 1
   *     rm [-r] ENTRY
   *       Remove ENTRY, specify [-r] to remove recursively
   *     mkdir MODE ENTRY
   *       Create directory ENTRY in permissions MODE
   *     ln TARGET ENTRY
   *       Create a symlink to TARGET with the name ENTRY
   *     mv SOURCE DEST
   *       Move SOURCE to DEST
   *     add MODE ENTRY INFILE
   *       Add INFILE as ENTRY in permissions MODE; replaces ENTRY if exists
   *     extract [ENTRY OUT]
   *       Extract ENTRY to OUT, or extract all entries to current directory
   *     test
   *       Test the cpio's status
   *       Return value is 0 or bitwise or-ed of following values:
   *       0x1:Magisk    0x2:unsupported    0x4:Sony
   *     patch
   *       Apply ramdisk patches
   *       Configure with env variables: KEEPVERITY KEEPFORCEENCRYPT
   *     backup ORIG
   *       Create ramdisk backups from ORIG
   *     restore
   *       Restore ramdisk from ramdisk backup stored within incpio
   *     sha1
   *       Print stock boot SHA1 if previously backed up in ramdisk
   * ```
   * @param args
   */
  public static cpio(args: string[]): void | string {
    return this.magiskboot(["cpio", args.join(" ")]);
  }

  /**
   * Usage: magiskboot <action> [args...]
   * @param args
   */
  private static magiskboot(args: string[]): void | string {
    return Shell.cmd(`${this.magiskbootpath} ${args.join(" ")}`).result();
  }
}

export default Magiskboot;
