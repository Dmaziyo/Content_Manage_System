'use strict';

const Service = require('egg').Service;

class ChapterService extends Service {
  async createChapter(body) {
    try {
      // 通过外键来绑定书跟章节
      const chapter = {
        title: body.title,
        book_id: body.book_id,
        orderby: body.orderby,
      };
      await this.app.model.Chapter.create(chapter);
      return true;
    } catch (e) {
      return false;
    }
  }
  async getChapterList(book_id) {
    try {
      const chapterList = await this.app.model.Chapter.findAll({
        where: {
          book_id,
        },
      });
      return chapterList;
    } catch (e) {
      console.log(e);
    }
  }
  async updateChapter(id, { title, orderby }) {
    try {
      await this.app.model.Chapter.update({
        title,
        orderby,
      },
      {
        where: { id },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
module.exports = ChapterService;
