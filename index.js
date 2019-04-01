'use strict';

/**
 * 读取本地配置
 */
const fs = require('fs')
const path = require('path')

/**
 * 初始化config
 */
function initConfig() {
  try {
    const config = readConfig();
    if (config) {
      localConfig.config = JSON.parse(config);
      return true;
    }
    const defalutConfig = {};
    const content = JSON.stringify(defalutConfig);
    fs.writeFileSync(localConfig.configUrl, content);
    localConfig.config = defalutConfig;
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * 读取文件
 */
function readConfig() {
  try {
    const result = fs.readFileSync(localConfig.configUrl);
    return result;
  } catch (error) {
    return false;
  }
}
/**
 * 写入文件
 */
function writeConfig(value) {
  try {
    const content = JSON.stringify(value);
    fs.writeFileSync(localConfig.configUrl, content);
    return true;
  } catch (e) {
    return false;
  }
}


const localConfig = {
  config: null,
  configUrl: path.join(__dirname, './localConfig.json'),
  setStoragePath: (path) => {
    localConfig.configUrl = path;
  },
  getStoragePath: () => {
    return localConfig.configUrl;
  },
  getItem: (key) => {
    const success = initConfig();
    if (success) {
      const result = localConfig.config[key];
      return result ? result : '';
    }
    return null;
  },
  setItem: (key, value) => {
    let success = initConfig();
    if (success) {
      const config = Object.assign({}, localConfig.config);
      config[key] = value;
      const suc = writeConfig(config);
      if (suc) {
        localConfig.config = config;
        return true;
      }
    }
    return false;
  },
  getAll: () => {
    let success = initConfig();
    if (success) {
      return localConfig.config;
    }
    return null;
  },
  removeItem: (key) => {
    const value = localConfig.getItem(key);
    if (value) {
      const config = Object.assign({}, localConfig.config);
      delete config[key];
      const suc = writeConfig(config);
      if (suc) {
        localConfig.config = config;
        return true;
      }
    }
    return false;
  },
  clear: () => {
    let success = initConfig();
    if (success) {
      const suc = writeConfig({});
      if (suc) {
        localConfig.config = {};
        return true;
      }
    }
    return false;
  }
}

module.exports = localConfig;