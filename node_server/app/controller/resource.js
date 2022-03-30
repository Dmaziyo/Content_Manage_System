'use strict';

const Controller = require('egg').Controller;

class downloadController extends Controller {
  async getResourceList() {
    const { ctx } = this;
    const data = await this.ctx.service.website.getResourceList();
    console.log(data);
    await ctx.render('resource.html', data);
  }
  async create() {
    try {
      const body = this.ctx.request.body;
      const message = await this.ctx.service.resource.createResource(body);
      this.ctx.body = {
        code: 200,
        message,
      };

    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
  // 获取resourceList
  async index() {
    try {
      const data = await this.ctx.service.resource.getResourceList();
      this.ctx.body = {
        code: 200,
        data,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '获取resourceList失败',
      };
    }
  }
  // 更新资源数据
  async update() {
    try {
      const { ctx } = this;
      const id = ctx.params.id;
      const body = ctx.request.body;
      const message = await this.ctx.service.resource.updateResource(id, body);
      this.ctx.body = {
        code: 200,
        message,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '更新resourceList失败',
      };
    }
  }
}
module.exports = downloadController;
