import _ from 'lodash';

// node status markers
const same = '    ';
const removed = '  - ';
const created = '  + ';

// for children indentation purposes
const indent = '    ';

const renderValue = (value, depth) => {
  if (_.isObject(value)) {
    const json = JSON.stringify(value, null, '');
    const objStr = json.slice(1, -1).replace(/["]+/g, '').replace(/[:]/g, ': ');
    return `{\n${indent.repeat(depth + 1)}${objStr}\n${indent.repeat(depth)}}`;
  }
  return value;
};

const line = (status, value, key, depth) => `${indent.repeat(depth)}${status}${key}: ${value}\n`;

const paddedRender = (tree, depth = 0) => `{\n${tree.reduce((acc, node) => {
  const oldValue = renderValue(node.oldValue, depth + 1);
  const newValue = renderValue(node.newValue, depth + 1);

  const nested = line(same, paddedRender(node.children, depth + 1), node.key, depth);
  const sameLine = line(same, oldValue, node.key, depth);
  const oldLine = line(removed, oldValue, node.key, depth);
  const newLine = line(created, newValue, node.key, depth);

  switch (node.type) {

    case 'nested':
      return `${acc}${nested}`;

    case 'unchanged':
      return `${acc}${sameLine}`;

    case 'created':
      return `${acc}${newLine}`;

    case 'removed':
      return `${acc}${oldLine}`;

    case 'changed':
      return `${acc}${newLine}${oldLine}`;

    default:
      return acc;
  }
}, '')}${indent.repeat(depth)}}`;

export default ast => paddedRender(ast);
