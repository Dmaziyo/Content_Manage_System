'use strict';
module.exports = app => {
  app.beforeStart(async function() {
    await app.model.sync({ });
    // 初始化数据库
  });
};
