import {
	createRouter,
	createWebHistory
} from 'vue-router'
import Index from '../views/index.vue'

const routes = [{
		path: '/index',
		name: 'Index',
		component: Index,
		meta: {
			requestAutho: true,
			title: "首页"
		},
		children: [{
			path: 'about',
			name: 'About',
			component: () => import('@/views/component/about.vue'),
			meta: {
				requestAutho: true
			}
		},{
			path: 'home',
			name: 'Home',
			component: () => import('@/views/component/home.vue'),
			meta: {
				requestAutho: true
			}
		},{
			path: 'setting',
			name: 'Setting',
			component: () => import('@/views/component/setting.vue'),
			meta: {
				requestAutho: true
			}
		}]
	},
	{
		path: '/',
		redirect: '/index/about'
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/login.vue'),
		meta: {
			requestAutho: false,
			title: "登录"
		}
	},
	{
		path: '/wx_article_list',
		name: 'wxArticleList',
		component: () => import('../views/wx-article-list.vue'),
		meta: {
			requestAutho: false
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title ?? "镇江市行业老干部管理服务办公室";
	if (to.meta.requestAutho) {
		if (localStorage.getItem("account")) {
			next()
		} else {
			router.push('login')
		}
	} else {
		next()
	}
})

export default router
