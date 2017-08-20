import _ from 'lodash';

const same = '    ';
const removed = '  - ';
const created = '  + ';

// for children indentation purposes
const indent = same;

const renderValue = (value, depth) => {
  const renderObject = (object) => {
    const objString = Object.keys(object).reduce((acc, key) => {
      const newDepth = depth + 1;
      const objValue = renderValue(object[key], newDepth);
      return `${acc}${indent.repeat(newDepth)}${key}: ${objValue}\n`;
    }, '');
    return `{\n${objString}${indent.repeat(depth)}}`;
  };

  return _.isObject(value) ? renderObject(value) : value;
};

const paddedRender = (tree, depth = 0) => `{\n${tree.reduce((acc, node) => {
  const line = (lineStatus, value) => `${indent.repeat(depth)}${lineStatus}${node.key}: ${value}\n`;
  const oldValue = renderValue(node.oldValue, depth + 1);
  const newValue = renderValue(node.newValue, depth + 1);

  switch (node.type) {

    case 'nested':
      return `${acc}${line(same, paddedRender(node.children, depth + 1))}`;

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
}, '')}${indent.repeat(depth)}}`;

export default tree => paddedRender(tree);
