import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const extensions = {
  '.json': data => JSON.parse(data),
  '.yml': data => yaml.safeLoad(data),
  '.ini': data => ini.parse(data),
};

const parseFile = fileObject => extensions[fileObject.extension](fileObject.data);

export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath, 'utf8');
  const fileObject = { data, extension };
  const config = parseFile(fileObject);
  return config;
};
