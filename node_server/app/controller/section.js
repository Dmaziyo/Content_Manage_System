'use strict';

const Controller = require('egg').Controller;
class SectionController extends Controller {
  // 添加章节，传入的是章节内容
  async create() {
    try {
      const body = this.ctx.request.body;
      body.orderby = Number(body.orderby);
      const create = await this.ctx.service.section.createSection(body);
      this.ctx.body = {
        code: 200,
        message: create,
      };
    } catch (e) {
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 获得节内容,包括书籍list，章节list
  async getSectionDetail() {
    const id = this.ctx.params.id;
    const data = await this.ctx.service.website.getSectionDetail(id);
    await this.ctx.render('book_detail.html', data);
  }
  // 获取指定chapter的所有节
  async index() {
    try {
      const chapter_id = this.ctx.request.query.chapter_id;
      const sectionList = await this.ctx.service.section.getSectionList(chapter_id);
      this.ctx.body = {
        code: 200,
        data: sectionList,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '获取sectionList失败',
      };
    }
  }
  // 获得单个节的内容
  async show() {
    try {
      const id = this.ctx.params.id;
      const section = await this.ctx.service.section.getSectionDetail(id);
      this.ctx.body = {
        code: 200,
        data: section,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: 'Section数据出错',
      };
    }
  }
  // 修改section
  async update() {
    try {
      const id = this.ctx.params.id;
      const body = this.ctx.request.body;
      await this.ctx.service.section.updateSection(id, body);
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
  // 删除节
  async destroy() {
    try {
      const id = this.ctx.params.id;
      const message = await this.ctx.service.section.deleteSection(id);
      this.ctx.body = {
        code: 200,
        message,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '删除失败',
      };
    }
  }
}
module.exports = SectionController;
