import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('../pages/Index')), 'Index')

const InterfDetail = r => require.ensure([], () => r(require('../pages/InterfDetail')), 'InterfDetail')

const InterfList = r => require.ensure([], () => r(require('../pages/InterfList')), 'InterfList')

let router = [{
  path: '/',
  component: Index,
  redirect: '/interflist',
  children: [{
    path: '/interfdetail/:id?',
    component: InterfDetail
  }, {
    path: '/interflist',
    component: InterfList
  }]
}]

export default router
