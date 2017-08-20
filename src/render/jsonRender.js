const jsonRender = tree => tree.reduce((acc, node) => {
  const { key, values, oldValue, newValue, status } = node;

  if (node.hasChildren) {
    acc[key] = jsonRender(values);
    return acc;
  }

  switch (status) {

    case 'created':
      acc[`+${key}`] = { newValue };
      return acc;

    case 'removed':
      acc[`-${key}`] = { oldValue };
      return acc;

    case 'changed':
      acc[`+${key}`] = { newValue };
      acc[`-${key}`] = { oldValue };
      return acc;

    case 'unchanged':
      acc[key] = { oldValue };
      return acc;

    default:
      return acc;
  }
}, {});

export default tree => JSON.stringify(jsonRender(tree), null, ' ');
