import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const getFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath, 'utf8');
  return { data, extension };
};

const compareData = (oldData, newData) => {
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

const parseFile = (file) => {
  switch (file.extension) {
    case '.json':
      return JSON.parse(file.data);
    case '.yml':
      return yaml.safeLoad(file.data);
    default:
      throw new Error('Invalid extension');
  }
};

export const compareFiles = (oldFile, newFile) => {
  const oldData = parseFile(oldFile);
  const newData = parseFile(newFile);

  return compareData(oldData, newData);
};
