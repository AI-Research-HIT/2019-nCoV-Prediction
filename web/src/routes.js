import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import echarts from './views/charts/echarts.vue'
import ChinaAna from './views/china/Map.vue'
import HaerbinAna from './views/haerbin/Map.vue'
import SimTemplate from './views/sim-template/template.vue'
import SEIBRModel from './views/SEIBR-model/SEIBR-model.vue'

import { mapActions } from 'vuex'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' },
    //     ]
    // },
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
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     leaf: true,
    //     iconCls: 'el-icon-data-analysis',
    //     children: [
    //         { path: '/haerbin', component: HaerbinAna, name: '哈尔滨疫情深入分析' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     leaf: true,
    //     iconCls: 'el-icon-data-analysis',
    //     children: [
    //         { path: '/sribr', component: SimTemplate, name: 'SEIBR模型详解' },
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;