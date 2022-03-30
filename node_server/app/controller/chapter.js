'use strict';
const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async create() {
    try {
      const body = this.ctx.request.body;
      body.orderby = Number(body.orderby);
      // 进一步调用服务去创建chapter
      await this.ctx.service.chapter.createChapter(body);
      this.ctx.body = {
        code: 200,
        message: true,
      };
    } catch (e) {
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 获取章数据
  async index() {
    try {
      const book_id = this.ctx.request.query.book_id;
      const chapterList = await this.ctx.service.chapter.getChapterList(book_id);
      console.log(chapterList);
      this.ctx.body = {
        code: 200,
        message: true,
        data: chapterList,
      };

    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 修改章
  async update() {
    try {
      // 这个id在数据库里是主键，不用再传入一个book_id来检验
      const body = this.ctx.request.body;
      const id = this.ctx.params.id;
      await this.ctx.service.chapter.updateChapter(id, body);
      this.ctx.body = {
        code: 200,
        message: true,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
}
module.exports = ChapterController;
