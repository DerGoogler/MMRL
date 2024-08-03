import React from "react";

/**
 * A function to format file sizes
 * @param bytes
 * @param decimalPoint Default is `2`
 * @returns
 */
function useFormatBytes(bytes?: number, decimalPoint: number = 2) {
  if (!bytes || bytes == 0) return React.useMemo(() => ["0", "Bytes"], [bytes]);
  var k = 1000,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return React.useMemo(() => [parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)), sizes[i]], [bytes]);
}

export { useFormatBytes };
