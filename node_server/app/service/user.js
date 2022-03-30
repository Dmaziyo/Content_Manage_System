'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  // 创建用户
  async createUser({ username, password }) {
    password = md5(password + 'MaZiYo');
    try {
      await this.app.model.User.create({
        username,
        password,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //   获取UserList
  async getUserList() {
    try {
      const userList = await this.app.model.User.findAll({});
      return userList;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  // 更新User
  async updateUser(id, { username, password }) {
    password = md5(password + 'MaZiYo');
    try {
      await this.app.model.User.update({
        username,
        password,
      },
      {
        where: { id },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async VerifyUser({ username, password }) {
    try {
      password = md5(password + 'MaZiYo');
      console.log(password);
      const userList = await this.getUserList();
      for (const item of userList) {
        if (item.dataValues.username === username && item.dataValues.password === password) {
          const token = this.app.jwt.sign({ username, password }, this.app.config.jwt.secret);
          return {
            state: true,
            token,
          };
        }
      }
      return false;
    } catch (e) {
      console.log(e);
      return true;
    }
  }
  async VerifyToken(token) {
    try {
      const data = this.app.jwt.verify(token, this.app.config.jwt.secret);
      const userList = await this.getUserList();
      for (const item of userList) {
        if (item.dataValues.username === data.username && item.dataValues.password === data.password) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
module.exports = UserService;
