import { getFile, compareFiles } from './utils';

export default (oldFilePath, newFilePath) => {
  const oldFile = getFile(oldFilePath);
  const newFile = getFile(newFilePath);

  return compareFiles(oldFile, newFile);
};
