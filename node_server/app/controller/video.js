'use strict';

const Controller = require('egg').Controller;
class VideoController extends Controller {
  async getVideoList() {
    const data = await this.ctx.service.website.getVideoList();
    await this.ctx.render('video.html', data);
  }
  async create() {
    try {
      const body = this.ctx.request.body;
      await this.ctx.service.video.createVideo(body);
      this.ctx.body = {
        code: 200,
        message: true,
      };
    } catch (e) {
      console.log(e);
      this.ctx.body = {
        code: 400,
        message: true,
      };
    }
  }
  async getVideoDetail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await this.ctx.service.website.getVideoDetail(id);
    console.log(data);
    await ctx.render('video_detail', data);
  }
  // 获取videoList
  async index() {
    try {
      const data = await this.ctx.service.video.getVideoList();
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
  // 更新视频数据
  async update() {
    try {
      const { ctx } = this;
      const id = ctx.params.id;
      const body = ctx.request.body;
      const message = await this.service.video.updateVideo(id, body);
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
  // 删除视频
  async destroy() {
    try {
      const id = this.ctx.params.id;
      const message = await this.ctx.service.video.deleteVideo(id);
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
module.exports = VideoController;
