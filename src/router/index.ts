import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BlogList from '../components/BlogList.vue'
import BlogDetail from '../components/BlogDetail.vue'
import ProjectDetail from '@/components/ProjectDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blogs',
    name: 'BlogList',
    component: BlogList,
  },
  {
    path: '/blogs/:slug',
    name: 'BlogDetail',
    component: BlogDetail,
    props: true
  },
  { path: '/project/:id', component: ProjectDetail, props: true , name: 'ProjectDetail'},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
