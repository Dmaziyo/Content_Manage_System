'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  // 获取书籍页面
  async getBookList() {
    const data = await this.ctx.service.website.getBookList();
    await this.ctx.render('/book.html', data);
    // await this.ctx.render('/book_detail.html');
  }
  // 添加数据
  async create() {
    try {
      const body = this.ctx.request.body;
      body.orderby = Number(body.orderby);
      await this.ctx.service.book.createBook(body);
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
  // 获取书籍列表，传给后台管理系统的
  async index() {
    try {
      const bookList = await this.ctx.service.book.getBookList();
      // console.log(bookList);
      this.ctx.body = {
        code: 200,
        message: true,
        data: bookList,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 修改书籍
  async update() {
    try {
      const body = this.ctx.request.body;
      const id = this.ctx.params.id;
      await this.ctx.service.book.updateBook(id, body);
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
module.exports = BookController;
