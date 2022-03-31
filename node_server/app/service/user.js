'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  // 创建测试账户
  async initTest() {
    const username = 'MaZiYo';
    const password = '123456';
    await this.createUser({ username, password });
  }
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
      let userList = await this.getUserList();
      if (userList.length !== 0) {
        const ret = await this.Verify(username, password, userList);
        return ret;
      }
      await this.initTest();
      userList = await this.getUserList();
      const ret = await this.Verify(username, password, userList);
      return ret;
    } catch (e) {
      console.log(e);
      return {
        state: false,
        message: '账号或密码错误',
      };
    }
  }
  // 验证
  async Verify(username, password, userList) {
    console.log(username);
    console.log(password);
    console.log(userList);
    for (const item of userList) {
      if (item.dataValues.username === username && item.dataValues.password === password) {
        const token = this.app.jwt.sign({ username, password }, this.app.config.jwt.secret);
        return {
          state: true,
          token,
        };
      }
    }
    return {
      state: false,
      message: '账号或密码错误',
    };
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
