import fs from 'fs';
import path from 'path';
import parseFile, { extensions } from './parseFile';
import renderTree, { formats } from './render';
import buildTree from './buildTree';

const getConfigObject = (filePath, extension) => {
  const fileObject = {
    data: fs.readFileSync(filePath, 'utf8'),
    extension,
  };

  const configObject = parseFile(fileObject);
  return configObject;
};

export default (oldFilePath, newFilePath, format = 'padded') => {
  const oldFileExt = path.extname(oldFilePath, 'utf8');
  const newFileExt = path.extname(newFilePath, 'utf8');
  const errors = [];

  if (!fs.existsSync(oldFilePath)) {
    errors.push(`${oldFilePath} does not exist`);
  }
  if (!fs.existsSync(newFilePath)) {
    errors.push(`${newFilePath} does not exist`);
  }
  if (!(oldFileExt in extensions)) {
    errors.push(`${oldFileExt} files are not supported`);
  }
  if (oldFileExt !== newFileExt && !(newFileExt in extensions)) {
    errors.push(`${newFileExt} files are not supported`);
  }
  if (!(format in formats)) {
    errors.push(`${format} is not a valid format`);
  }

  if (errors.length > 0) {
    return errors.join('\n');
  }

  const configObjects = {
    old: getConfigObject(oldFilePath, oldFileExt),
    new: getConfigObject(newFilePath, newFileExt),
  };

  const treeObject = {
    tree: buildTree(configObjects),
    format,
  };

  const result = renderTree(treeObject);
  return result;
};
