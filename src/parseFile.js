import yaml from 'js-yaml';
import ini from 'ini';

const extensions = {
  '.json': data => JSON.parse(data),
  '.yml': data => yaml.safeLoad(data),
  '.yaml': data => yaml.safeLoad(data),
  '.ini': data => ini.parse(data),
};

export default (fileObject) => {
  const { extension, data } = fileObject;
  if (extension in extensions) {
    return extensions[extension](data);
  }
  throw new Error(`${extension} files are not supported`);
};
