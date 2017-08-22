import yaml from 'js-yaml';
import ini from 'ini';

export const extensions = {
  '.json': data => JSON.parse(data),
  '.yml': data => yaml.safeLoad(data),
  '.yaml': data => yaml.safeLoad(data),
  '.ini': data => ini.parse(data),
};

export default fileObject => extensions[fileObject.extension](fileObject.data);
