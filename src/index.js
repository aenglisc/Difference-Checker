import fs from 'fs';
import path from 'path';
import parseFile from './parseFile';
import buildTree from './buildTree';
import renderTree from './render';

const getConfigObject = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath, 'utf8');
  const fileObject = { data, extension };
  const configObject = parseFile(fileObject);
  return configObject;
};

export default (oldFilePath, newFilePath, format = 'padded') => {
  const oldConfigObject = getConfigObject(oldFilePath);
  const newConfigObject = getConfigObject(newFilePath);

  const tree = buildTree(oldConfigObject, newConfigObject);
  const treeObject = { tree, format };

  const result = renderTree(treeObject);
  return result;
};
