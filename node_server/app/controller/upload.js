'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class UploadController extends Controller {
  // 实现上传图片
  async index() {
    // 获取上传文件的相关属性
    const stream = await this.ctx.getFileStream();
    // 文件名+文件后缀
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    console.log(target);
    this.ctx.body = {
      code: 2000,
      data: {
        name: filename,
        file: `/uploads/${filename}`,
      },
    };
    console.log(this.ctx.body);
  }
}
module.exports = UploadController;
