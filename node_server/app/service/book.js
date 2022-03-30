'use strict';


const Service = require('egg').Service;

class BookService extends Service {
  async createBook(body) {
    try {
      const book = {
        title: body.title,
        img: body.img,
        orderby: body.orderby,
      };
      await this.app.model.Book.create(book);
      //  在数据库中新增数据
      return true;
    } catch (error) {
      return false;
    }
  }

  async getBookList() {
    try {
      const bookList = await this.app.model.Book.findAll({
        // 条件过滤并且排序
        order: [
          [ 'orderby', 'asc' ],
        ],
      });
      // console.log(bookList);
      return bookList;
    } catch (e) {
      return null;
    }
  }
  // 修改数据库中指定书籍
  async updateBook(id, { title, img, orderby }) {
    try {
      await this.app.model.Book.update({
        title,
        img,
        orderby,
      },
      {
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = BookService;
