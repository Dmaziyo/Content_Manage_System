'use strict';
module.exports = app => {
  app.beforeStart(async function() {
    await app.model.sync({ force: true });
    // 初始化数据库
  });
};
