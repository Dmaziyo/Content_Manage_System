// 将网页端的服务都集中在一起
'use strict';
const Service = require('egg').Service;

class WebSiteService extends Service {
  // 获取所有目录
  async getAllList() {
    const bookList = await this.ctx.service.book.getBookList();
    const blogList = await this.ctx.service.blog.getBlogList();
    const videoList = await this.ctx.service.video.getVideoList();
    return {
      bookList,
      blogList,
      videoList,
    };
  }
  // 获取书本目录
  async getBookList() {
    const bookList = await this.ctx.service.book.getBookList();
    // 因为nunjucks渲染的数据是对象类型
    return {
      bookList,
    };
  }

  // 之所以写这里，是因为还要获取其他表的数据
  // 获取书本详细内容，源码的这个有点问题，但是先做着，之后再说
  async getSectionDetail(id) {
    const section = await this.ctx.service.section.getSectionDetail(id);// 通过章节获取目录
    const menu = await this.ctx.service.section.getMenuBySectionId(id);// 通过章节id获取书籍的章节目录,
    const bookList = await this.ctx.service.book.getBookList();// 获取整个章节目录
    // console.log(menu);
    return {
      section,
      bookList,
      menu,
    };
  }

  // 获取博客目录
  async getBlogList() {
    const blogList = await this.ctx.service.blog.getBlogList();
    return { blogList };
  }

  // 获取博客详细目录
  async getBlogDetail(id) {
    const blog = await this.ctx.service.blog.getBlogDetail(id);
    return { blog };
  }
  // 获取视频资源目录
  async getVideoList() {
    const videoList = await this.ctx.service.video.getVideoList();
    return {
      videoList,
    };
  }
  // 获取视频详细目录
  async getVideoDetail(id) {
    const videoList = await this.ctx.service.video.getVideoList();
    const video = await this.ctx.service.video.getVideoDetail(id);
    return {
      video,
      videoList,
    };
  }
  // 获取资源下载目录
  async getResourceList() {
    const resourceList = await this.ctx.service.resource.getResourceList();
    return { resourceList };
  }
}
module.exports = WebSiteService;
