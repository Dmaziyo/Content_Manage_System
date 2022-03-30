'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await this.ctx.service.website.getAllList();
    // console.log(data);
    await ctx.render('home.html', data);
  }
}

module.exports = HomeController;
