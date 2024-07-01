/**
 * A function to format file sizes
 * @param bytes
 * @param decimalPoint Default is `2`
 * @returns A formated file size string
 */
function formatBytes(bytes: number, decimalPoint: number = 2) {
  if (bytes == 0) return "0 Bytes";
  var k = 1000,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + " " + sizes[i];
}

export { formatBytes };