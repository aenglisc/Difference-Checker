import isObject from './utils';

const plainRender = (tree, parentNode = '') => tree.reduce((acc, node) => {
  if (node.hasChildren) {
    return `${acc}${plainRender(node.values, `${parentNode}${node.key}.`)}`;
  }

  const baseString = `${acc}Property '${parentNode}${node.key}' was `;

  const createdValueFormat = (value) => {
    if (isObject(value)) { return 'complex value'; }
    if (typeof value !== 'string') { return `value: ${node.newValue}`; }
    return `'${value}'`;
  };

  switch (node.status) {

    case 'removed':
      return `${baseString}removed\n`;

    case 'created':
      return `${baseString}added with ${createdValueFormat(node.newValue)}\n`;

    case 'changed':
      return `${baseString}updated. From '${node.oldValue}' to '${node.newValue}'\n`;

    default:
      return acc;
  }
}, '');

export default tree => plainRender(tree).trim();
