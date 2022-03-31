'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 创建新用户
  async create() {
    try {
      const body = this.ctx.request.body;
      const message = await this.ctx.service.user.createUser(body);
      this.ctx.body = {
        code: 200,
        message,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '创建用户失败',
      };
    }
  }
  //   获取所有用户
  async index() {
    try {
      const data = await this.ctx.service.user.getUserList();
      this.ctx.body = {
        code: 200,
        data,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: '获取用户信息失败',
      };
    }
  }
  async update() {
    try {
      const id = this.ctx.params.id;
      const body = this.ctx.request.body;
      const message = await this.ctx.service.user.updateUser(id, body);
      this.ctx.body = {
        code: 200,
        message,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 200,
        message: '用户修改数据失败',
      };
    }
  }
  // 删除用户
  async destroy() {
    try {
      const id = this.ctx.params.id;
      const message = await this.ctx.service.user.deleteUser(id);
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
  async verify() {
    try {
      const body = this.ctx.request.body;
      const message = await this.ctx.service.user.VerifyUser(body);
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
  async verifyToken() {
    try {
      const token = this.ctx.header.token;
      const message = await this.ctx.service.user.VerifyToken(token);
      this.ctx.body = {
        code: 200,
        message,
      };
    } catch (e) {
      this.ctx.body = {
        code: 400,
        message: false,
      };
    }
  }
}
module.exports = UserController;
