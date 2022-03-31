'use strict';

const Service = require('egg').Service;
// 添加section
class SectionService extends Service {
  async createSection(body) {
    try {
      const section = {
        title: body.title,
        orderby: body.orderby,
        md_text: body.md_text,
        html_text: body.html_text,
        chapter_id: body.chapter_id,
      };
      await this.app.model.Section.create(section);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //   获取章节内容
  async getSectionDetail(id) {
    console.log(id);
    try {
      const section = await this.app.model.Section.findOne({
        where: {
          id,
        },
      });
      return section;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //   通过节id获取章id，然后通过章id，获取书id
  async getMenuBySectionId(id) {
    try {
      const section = await this.app.model.Section.findOne({
        where: {
          id,
        },
        include: {
          model: this.app.model.Chapter,
          as: 'chapter',
          include: {
            model: this.app.model.Book,
            as: 'book',
          },
        },
      });
      const book_id = section.dataValues.chapter.dataValues.book.dataValues.id;
      //   把所有的章节找到
      const chapters = await this.app.model.Chapter.findAll({
        where: {
          book_id,
        },
      });
      //   把每个章的小节找到，并作为章的属性
      for (const item of chapters) {
        const chapter_id = item.dataValues.id;
        const sections = await this.app.model.Section.findAll({
          where: {
            chapter_id,
          },
        });
        item.dataValues.sectionList = sections;
      }
      return chapters;
    } catch (e) {
      return false;
    }
  }
  // 这个传的id是chapter
  async getSectionList(chapter_id) {
    const sectionList = await this.app.model.Section.findAll({
      where: {
        chapter_id,
      },
    });
    return sectionList;
  }
  // 修改section
  async updateSection(id, { title, orderby, md_text, html_text }) {
    try {
      await this.app.model.Section.update({
        title,
        orderby,
        md_text,
        html_text,
      }, {
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

  // 删除节
  async deleteSection(id) {
    try {
      const delSec = await this.app.model.Section.destroy({
        where: {
          id,
        },
      });
      return {
        state: true,
        delData: delSec,
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
module.exports = SectionService;
