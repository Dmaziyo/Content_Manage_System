'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  // 小节，里面有标题和md语法
  const Section = app.model.define('section', {
    title: STRING,
    orderby: INTEGER,
    md_text: TEXT,
    html_text: TEXT,
  });
  Section.associate = function() {
    app.model.Section.belongsTo(app.model.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter',
    });
  };
  return Section;
};
