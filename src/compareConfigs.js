import _ from 'lodash';

const SAME = '    ';
const REMOVED = '  - ';
const CREATED = '  + ';

// for children indentation purposes
const INDENT = SAME;

const buildDiff = (oldConfig = {},
                   newConfig = {},
                   baseIndent = '',
                   parentDeleted = false,
                   parentCreated = false) => {
  const oldKeys = Object.keys(oldConfig);
  const newKeys = Object.keys(newConfig);
  const allKeys = _.union(oldKeys, newKeys);

  const diff = allKeys.reduce((acc, key) => {
    const isParent = x => x && key in x && x[key] instanceof Object;
    const hasChildren = isParent(oldConfig) || isParent(newConfig);

    const oldValue = oldConfig ? oldConfig[key] : undefined;
    const newValue = newConfig ? newConfig[key] : undefined;

    const wasCreated = !oldKeys.includes(key);
    const wasDeleted = !newKeys.includes(key);

    const wasChanged = oldValue !== newValue && !(wasCreated || wasDeleted);
    const notChanged = oldValue === newValue;

    const line = (status, value) => `${baseIndent}${status}${key}: ${value}\n`;

    const getChildren = (status = { deleted: false, created: false }) => {
      const { deleted, created } = status;
      return buildDiff(oldValue, newValue, baseIndent + INDENT, deleted, created);
    };

    if (hasChildren) {
      if (wasDeleted) { return `${acc}${line(REMOVED, getChildren({ deleted: true }))}`; }
      if (wasCreated) { return `${acc}${line(CREATED, getChildren({ created: true }))}`; }
      return `${acc}${line(SAME, getChildren())}`;
    }

    if (parentDeleted) { return `${acc}${line(SAME, oldValue)}`; }
    if (parentCreated) { return `${acc}${line(SAME, newValue)}`; }

    if (notChanged) { return `${acc}${line(SAME, oldValue)}`; }
    if (wasCreated) { return `${acc}${line(CREATED, newValue)}`; }
    if (wasDeleted) { return `${acc}${line(REMOVED, oldValue)}`; }
    if (wasChanged) { return `${acc}${line(CREATED, newValue)}${line(REMOVED, oldValue)}`; }

    return acc;
  }, '');

  return `{\n${diff}${baseIndent}}`;
};

export default (oldConfig, newConfig) => buildDiff(oldConfig, newConfig);
