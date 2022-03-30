'use strict';

const Controller = require('egg').Controller;
class BlogController extends Controller {
  // 获取博客目录
  async getBlogList() {
    const data = await this.ctx.service.website.getBlogList();
    await this.ctx.render('blog.html', data);
  }
  // 新建博客
  async create() {
    try {
      const body = await this.ctx.request.body;
      await this.ctx.service.blog.createBlog(body);
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
  // 获取博客详细页
  async getBlogDetail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await this.ctx.service.website.getBlogDetail(id);
    console.log(data);
    await ctx.render('blog_detail.html', data);
  }
  // 获取blogList
  async index() {
    try {
      const data = await this.ctx.service.blog.getBlogList();
      this.ctx.body = {
        code: 200,
        data,
      };
    } catch (e) {
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 获取详细博客
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      const data = await this.service.blog.getBlogDetail(id);
      this.ctx.body = {
        code: 200,
        data,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 更新博客
  async update() {
    try {
      const { ctx } = this;
      const id = ctx.params.id;
      const body = ctx.request.body;
      const message = await this.service.blog.updateBlog(id, body);
      this.ctx.body = {
        code: 200,
        message,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '更新博客失败',
      };
    }
  }
}
module.exports = BlogController;
