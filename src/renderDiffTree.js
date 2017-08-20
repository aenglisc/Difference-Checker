const same = '    ';
const removed = '  - ';
const created = '  + ';

// for children indentation purposes
const indent = same;

const isObject = value => value instanceof Object;

const defaultRender = (tree, baseIndent = '') => {
  const result = tree.reduce((acc, node) => {
    const line = (lineStatus, value) => `${baseIndent}${lineStatus}${node.key}: ${value}\n`;

    if (node.hasChildren) {
      return `${acc}${line(same, defaultRender(node.values, baseIndent + indent))}`;
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
  }, '');
  return `{\n${result}${baseIndent}}`;
};

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
      return acc + '\n';
  }
}, '').trim();

const jsonRender = tree => {
  return tree.reduce((acc, node) => {
    return `${acc}\n${node}`;
  }, '');
};

const formats = {
  default: tree => defaultRender(tree),
  plain: tree => plainRender(tree),
  json: tree => jsonRender(tree),
};

export default (treeObject) => {
  if (treeObject.format in formats) return formats[treeObject.format](treeObject.tree);
  throw new Error(`${treeObject.format} is not a proper format`);
};
