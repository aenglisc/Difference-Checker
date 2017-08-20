import fs from 'fs';
import path from 'path';
import parseFile from './parseFile';
import buildTree from './buildTree';
import renderTree from './render';

const getConfigObject = (filePath) => {
  const fileObject = {
    data: fs.readFileSync(filePath, 'utf8'),
    extension: path.extname(filePath, 'utf8'),
  };

  const configObject = parseFile(fileObject);
  return configObject;
};

export default (oldFilePath, newFilePath, format = 'padded') => {
  const configObjects = {
    old: getConfigObject(oldFilePath),
    new: getConfigObject(newFilePath),
  };

  const treeObject = {
    tree: buildTree(configObjects),
    format,
  };

  const result = renderTree(treeObject);
  return result;
};
