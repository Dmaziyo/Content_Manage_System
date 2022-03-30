'use strict';

const Service = require('egg').Service;
// const dateformate = require('filter.js');

class BlogService extends Service {
  // 新建博客
  async createBlog({
    title,
    img,
    md_text,
    html_text,
  }) {
    try {
      await this.app.model.Blog.create({
        title,
        img,
        md_text,
        html_text,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //   获取博客
  async getBlogList() {
    const blogList = await this.app.model.Blog.findAll({});
    return blogList;
  }
  //   获取博客详细页
  async getBlogDetail(id) {
    const blog = await this.app.model.Blog.findOne({
      where: {
        id,
      },
    });
    // 格式化数据,怎么模块化我也不会
    const dateformate = time => {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const result = `${year}年${month}月${day}日`;
      return result;
    };
    blog.dataValues.createdAt = dateformate(blog.dataValues.createdAt);
    return blog;
  }
  // 更新博客内容
  async updateBlog(id, { title, img, md_text, html_text }) {
    await this.app.model.Blog.update({
      title,
      img,
      md_text,
      html_text,
    },
    {
      where: {
        id,
      },
    });
  }
}
module.exports = BlogService;
