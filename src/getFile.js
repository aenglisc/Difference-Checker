import fs from 'fs';
import path from 'path';

export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath, 'utf8');
  return { data, extension };
};
