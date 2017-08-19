import getConfig from './getConfig';
import compareConfigs from './compareConfigs';

export default (oldFilePath, newFilePath) => {
  const oldConfig = getConfig(oldFilePath);
  const newConfig = getConfig(newFilePath);

  return compareConfigs(oldConfig, newConfig);
};
