import isObject from './utils';

const same = '    ';
const removed = '  - ';
const created = '  + ';

// for children indentation purposes
const indent = same;

const paddedRender = (tree, baseIndent = '') => `{\n${tree.reduce((acc, node) => {
  const line = (lineStatus, value) => `${baseIndent}${lineStatus}${node.key}: ${value}\n`;

  if (node.hasChildren) {
    return `${acc}${line(same, paddedRender(node.values, baseIndent + indent))}`;
  }

  const renderObjectValue = (values, valuesBaseIndent = baseIndent + indent) => {
    const valuesString = Object.keys(values).reduce((valuesAcc, key) => {
      const value = isObject(values[key]) ?
        renderObjectValue(values[key], valuesBaseIndent + indent) : values[key];

      return `${valuesAcc}${valuesBaseIndent + indent}${key}: ${value}\n`;
    }, '');
    return `{\n${valuesString}${valuesBaseIndent}}`;
  };

  const oldValue = isObject(node.oldValue) ? renderObjectValue(node.oldValue) : node.oldValue;
  const newValue = isObject(node.newValue) ? renderObjectValue(node.newValue) : node.newValue;

  switch (node.status) {

    case 'unchanged':
      return `${acc}${line(same, oldValue)}`;

    case 'created':
      return `${acc}${line(created, newValue)}`;

    case 'removed':
      return `${acc}${line(removed, oldValue)}`;

    case 'changed':
      return `${acc}${line(created, newValue)}${line(removed, oldValue)}`;

    default:
      return acc;
  }
}, '')}${baseIndent}}`;

export default tree => paddedRender(tree);
