import { getFile, compareData } from './utils';

export default (oldFilePath, newFilePath) => {
  const oldFile = getFile(oldFilePath);
  const newFile = getFile(newFilePath);

  if (oldFile.extension === '.json' && newFile.extension === '.json') {
    const oldData = JSON.parse(oldFile.data);
    const newData = JSON.parse(newFile.data);

    return compareData(oldData, newData);
  }
  throw new Error('Invalid extension');
};
