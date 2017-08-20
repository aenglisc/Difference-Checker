import fs from 'fs';
import path from 'path';
import parseFile from './parseFile';
import buildTree from './buildTree';
import renderTree from './render';

const getConfigObject = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath, 'utf8');

  const configObject = parseFile(data, extension);
  return configObject;
};

export default (oldFilePath, newFilePath, format = 'padded') => {
  const oldObj = getConfigObject(oldFilePath);
  const newObj = getConfigObject(newFilePath);

  const tree = buildTree(oldObj, newObj);

  const result = renderTree(tree, format);
  return result;
};
