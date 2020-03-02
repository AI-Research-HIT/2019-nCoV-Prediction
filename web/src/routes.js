import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import ChinaAna from './views/china/Map.vue'
import HaerbinAna from './views/haerbin/Map.vue'
import SimTemplate from './views/sim-template/template.vue'
import SEIBRModel from './views/SEIBR-model/SEIBR-model.vue'
import Team from './views/team/Team.vue'

import { mapActions } from 'vuex'

let routes = [
    // {
    //     path: '/login',
    //     component: Login,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-data-analysis',
        children: [
            { path: '/china', component: ChinaAna, name: '省市疫情分析预测' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-data-analysis',
        children: [
            { path: '/sim-template', component: SimTemplate, name: '疫情发展状态模拟' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-data-analysis',
        children: [
            { path: '/haerbin', component: HaerbinAna, name: '哈尔滨疫情深入分析' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-notebook-2',
        children: [
            { path: '/model', component: SEIBRModel, name: 'SEIQR模型详解' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-s-custom',
        children: [
            { path: '/team', component: Team, name: '团队成员' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;