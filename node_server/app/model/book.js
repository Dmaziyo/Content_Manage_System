// 建立书籍的数据库,有标题，顺序，图片
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Book = app.model.define('book', {
    title: STRING,
    orderby: INTEGER,
    img: STRING,
  });
  return Book;
};
