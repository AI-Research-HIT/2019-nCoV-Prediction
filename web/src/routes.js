import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import TemplateSim from './views/template/template.vue'
import HaerbinAna from './views/haerbin/haerbin.vue'
import SEIQRSim from './views/seiqr-sim/seiqr-sim.vue'
import SEIQRModel from './views/seiqr-model-desc/SEIQR-model.vue'
import Manual from './views/manual/manual.vue'
import Team from './views/team/Team.vue'
import MonteCarlo from './views/montecarlo/montecarlo.vue'

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
            { path: '/TemplateSim', component: TemplateSim, name: '省市疫情分析预测' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-data-analysis',
        children: [
            { path: '/SEIQRSim', component: SEIQRSim, name: '疫情发展状态模拟' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-data-analysis',
        children: [
            { path: '/haerbin', component: HaerbinAna, name: '黑龙江疫情深入分析' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-data-analysis',
        children: [
            { path: '/montecarlo', component: MonteCarlo, name: '蒙特卡洛仿真' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-notebook-2',
        children: [
            { path: '/model', component: SEIQRModel, name: 'SEIQR模型详解' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-notebook-2',
        children: [
            { path: '/manual', component: Manual, name: '网站手册' },
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