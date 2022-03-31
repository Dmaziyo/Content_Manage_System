'use strict';

const Service = require('egg').Service;

class ResourceService extends Service {
  // 新建资源
  async createResource({
    title,
    code,
    url,
  }) {
    try {
      await this.app.model.Resource.create({
        title,
        url,
        code,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  // 更新资源List
  async updateResource(id, { title, code, url }) {
    try {
      await this.app.model.Resource.update({
        title,
        code,
        url,
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
  //   获取资源列表
  async getResourceList() {
    try {
      const resourceList = await this.app.model.Resource.findAll({});
      return resourceList;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  // 删除资源
  async deleteResource(id) {
    try {
      const delResource = await this.app.model.Resource.destroy({
        where: {
          id,
        },
      });
      return {
        state: true,
        delData: delResource,
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
module.exports = ResourceService;
