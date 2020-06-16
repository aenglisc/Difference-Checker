import _ from 'lodash';

const createdValueFormat = (value) => {
  if (_.isObject(value)) {
    return 'complex value';
  }
  if (typeof value !== 'string') {
    return `value: ${value}`;
  }
  return `'${value}'`;
};

const plainRender = (tree, parentNode = '') => tree.reduce((acc, node) => {
  const baseString = `${acc}Property '${parentNode}${node.key}' was `;

  switch (node.type) {
    case 'nested':
      return `${acc}${plainRender(node.children, `${parentNode}${node.key}.`)}`;

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
