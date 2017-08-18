import getFile from './getFile';
import parseFile from './parseFile';
import compareData from './compareData';

export default (oldFilePath, newFilePath) => {
  const oldFile = getFile(oldFilePath);
  const newFile = getFile(newFilePath);

  const oldData = parseFile(oldFile);
  const newData = parseFile(newFile);

  return compareData(oldData, newData);
};
