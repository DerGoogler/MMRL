export const readProps = <T = {}>(data: string): T => {
  const format = data // split the data by line
    .split('\n')
    // split each row into key and property
    .map(row => row.split('='))
    // use reduce to assign key-value pairs to a new object
    // using Array.prototype.reduce
    // @ts-ignore
    .reduce((acc, [key, value]) => ((acc[key] = value), acc), {});
  return format as T;
};
