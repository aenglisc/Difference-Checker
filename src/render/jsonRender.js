const jsonRender = tree => tree.reduce((acc, node) => {
  const { key, type, oldValue, newValue, children } = node;

  switch (type) {

    case 'nested':
      return { ...acc, [key]: jsonRender(children) };

    case 'created':
      return { ...acc, [key]: { type, newValue } };

    case 'removed':
      return { ...acc, [key]: { type, oldValue } };

    case 'changed':
      return { ...acc, [key]: { type, oldValue, newValue } };

    case 'unchanged':
      return { ...acc, [key]: { type, oldValue } };

    default:
      return acc;
  }
}, {});

export default tree => JSON.stringify(jsonRender(tree), null, ' ');
