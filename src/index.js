import fs from 'fs';
import path from 'path';
import parseFile, { extensions } from './parseFile';
import renderTree, { formats } from './render';
import buildTree from './buildTree';

const getConfigObject = (filePath) => {
  const fileObject = {
    data: fs.readFileSync(filePath, 'utf8'),
    extension: path.extname(filePath, 'utf8'),
  };

  const configObject = parseFile(fileObject);
  return configObject;
};

const getErrors = (oldFilePath, newFilePath, format) => {
  const oldFileExt = path.extname(oldFilePath, 'utf8');
  const newFileExt = path.extname(newFilePath, 'utf8');

  const errors = [];
  if (!(oldFileExt in extensions)) {
    errors.push(`${oldFileExt} files are not supported`);
  }
  if (oldFileExt !== newFileExt && !(newFileExt in extensions)) {
    errors.push(`${newFileExt} files are not supported`);
  }
  if (!(format in formats)) {
    errors.push(`${format} is not a proper format`);
  }
  return errors.length > 0 ? errors.join('\n') : null;
};

export default (oldFilePath, newFilePath, format = 'padded') => {
  const errors = getErrors(oldFilePath, newFilePath, format);

  if (errors) {
    return errors;
  }

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
