import fs from 'fs';
import path from 'path';
import parseFile from './parseFile';

import getDiffTree from './getDiffTree';
import renderDiffTree from './renderDiffTree';

const getConfigObject = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath, 'utf8');
  const fileObject = { data, extension };
  const configObject = parseFile(fileObject);
  return configObject;
};

export default (oldFilePath, newFilePath, format = 'default') => {
  const oldConfigObject = getConfigObject(oldFilePath);
  const newConfigObject = getConfigObject(newFilePath);

  const tree = getDiffTree(oldConfigObject, newConfigObject);
  const treeObject = { tree, format };

  const result = renderDiffTree(treeObject);
  return result;
};
