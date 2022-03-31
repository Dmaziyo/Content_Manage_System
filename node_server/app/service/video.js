'use strict';

const Service = require('egg').Service;

class VideoService extends Service {
  // 获取视频列表
  async getVideoList() {
    const VideoList = await this.app.model.Video.findAll();
    return VideoList;
  }
  // 添加视频
  async createVideo(body) {
    const video = {
      title: body.title,
      img: body.img,
      iframe_url: body.iframe_url,
    };
    await this.app.model.Video.create(video);
    return true;
  }
  // 获取视频详细页
  async getVideoDetail(id) {
    try {
      const video = await this.app.model.Video.findOne({
        where: {
          id,
        },
      });
      return video;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  // 更新视频
  async updateVideo(id, { title, iframe_url, img }) {
    try {
      await this.app.model.Video.update({
        title,
        iframe_url,
        img,
      },
      {
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
  // 删除视频

  async deleteVideo(id) {
    try {
      const delBlog = await this.app.model.Video.destroy({
        where: {
          id,
        },
      });
      return {
        state: true,
        delData: delBlog,
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
module.exports = VideoService;
