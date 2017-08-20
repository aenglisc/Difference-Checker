export default tree => JSON.stringify(tree, (name, val) => {
  if (val instanceof Array && val.length < 1) {
    return undefined;
  }
  if (val === 'nested') {
    return undefined;
  }
  return val;
}, 2);
