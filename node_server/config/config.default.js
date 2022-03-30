/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1647344558574_1230';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cors = {
    origin: '*',
    credentials: true, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.jwt = {
    secret: 'maziyo',
  };
  config.sequelize = {
    dialect: 'mysql',
    database: 'content_manage',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'abc123456',
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  // 设置静态文件目录
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };
  return {
    ...config,
    ...userConfig,
  };
};
