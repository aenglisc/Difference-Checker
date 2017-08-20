/* eslint-disable */
import yaml from 'js-yaml';
import ini from 'ini';
/* eslint-enable */

const extensions = {
  '.json': data => JSON.parse(data),
  '.yml': data => yaml.safeLoad(data),
  '.ini': data => ini.parse(data),
};

export default (fileObject) => {
  if (fileObject.extension in extensions) return extensions[fileObject.extension](fileObject.data);
  throw new Error(`${fileObject.extension} files are not supported`);
};
