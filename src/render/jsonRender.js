export default tree => JSON.stringify(tree, function replacer(name, val) {
  if (this.type === 'nested') {
    if (name === 'oldValue' || name === 'newValue' || name === 'type') {
      return undefined;
    }
  } else if (name === 'children') {
    return undefined;
  }
  if (this.type === 'unchanged') {
    if (name === 'newValue') {
      return undefined;
    }
  }
  return val;
}, 2);
