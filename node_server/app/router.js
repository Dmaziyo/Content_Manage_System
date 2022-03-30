'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 网页的加载
  router.get('/', controller.home.index);
  router.get('/book', controller.book.getBookList);
  router.get('/blog', controller.blog.getBlogList);
  router.get('/video', controller.video.getVideoList);
  router.get('/resource', controller.resource.getResourceList);
  router.get('/section/:id', controller.section.getSectionDetail);
  router.get('/blog/:id', controller.blog.getBlogDetail);
  router.get('/video/:id', controller.video.getVideoDetail);

  // 后台数据的curd
  router.resources('book', '/api/book', controller.book);// 书籍的管理
  router.resources('chapter', '/api/chapter', controller.chapter);// 章的管理
  router.resources('section', '/api/section', controller.section);// 节的管理
  router.resources('blog', '/api/blog', controller.blog);
  router.resources('video', '/api/video', controller.video);
  router.resources('resource', '/api/resource', controller.resource);
  router.resources('user', '/api/user', controller.user);
  router.post('/api/upload', controller.upload.index);
  router.post('/api/verify', controller.user.verify);
  router.get('/api/verifyToken', controller.user.verifyToken);
};
