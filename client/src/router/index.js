import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Book from '../views/Book'
import Blog from '../views/Blog'
import Video from '../views/Video'
import Resource from '../views/Resource'
import User from '../views/User'
import Chapter from '../components/Chapter'
import Section from '../components/Section'
import SectionDetail from '../components/SectionDetail'
import BlogDetail from '../components/BlogDetail'
import Login from '../views/Login'
import request from '../utils/request'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
     {
      path:'book',
      component:Book
     },
     {
      path:'blog',
      component:Blog
     },
     {
      path:'video',
      component:Video
     },
     {
      path:'resource',
      component:Resource
     },
     {
      path:'user',
      component:User
     },
     {path:'chapter',
     component:Chapter
    },
    {
      path:'section',
      component:Section
    },
    {
      path:'section/:id',
      component:SectionDetail
    },
    {
      path:'createSection',
      component:SectionDetail
    },
    {
      path:'blogDetail/:id',
      component:BlogDetail
    },
    {
      path:'createBlog',
      component:BlogDetail
    },
    ],
  },
  {
    name:'Login',
    path:'/Login',
    component:Login,
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(async(to,from,next)=>{
  if(to.name==='Login'){
    next();
  }
  else{
    const token=localStorage.getItem('token');
    request.get('/verifyToken',{headers:{token:token}}).then(res=>{
      const data=res.data;
      if(data.message){
        next();
      }
      else{
        next('/Login')
      }
    })
  }
})
export default router
