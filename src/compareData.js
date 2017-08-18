import _ from 'lodash';

export default (oldData, newData) => {
  const oldKeys = Object.keys(oldData);
  const newKeys = Object.keys(newData);
  const allKeys = _.union(oldKeys, newKeys);

  const diff = allKeys.reduce((acc, item) => {
    const wasCreated = !oldKeys.includes(item);
    const wasDeleted = !newKeys.includes(item);
    const wasChanged = oldData[item] !== newData[item];
    const notChanged = oldData[item] === newData[item];

    const sameItemString = `    ${item}: ${oldData[item]}\n`;
    const oldItemString = `  - ${item}: ${oldData[item]}\n`;
    const newItemString = `  + ${item}: ${newData[item]}\n`;

    if (notChanged) { return `${acc}${sameItemString}`; }
    if (wasCreated) { return `${acc}${newItemString}`; }
    if (wasDeleted) { return `${acc}${oldItemString}`; }
    if (wasChanged) { return `${acc}${newItemString}${oldItemString}`; }

    return acc;
  }, '');

  return `{\n${diff}}`;
};
