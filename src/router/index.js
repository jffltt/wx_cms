import {
	createRouter,
	createWebHistory
} from 'vue-router'
import Index from '../views/index.vue'

const routes = [{
		path: '/admin',
		name: 'Index',
		component: Index,
		meta: {
			requestAutho: true,
			title: "首页"
		},
		children: [{
			path: 'home',
			name: 'Home',
			component: () => import('@/views/component/home.vue'),
			meta: {
				requestAutho: true
			}
		}, {
			path: 'about',
			name: 'About',
			component: () => import('@/views/component/about.vue'),
			meta: {
				requestAutho: true
			}
		}, {
			path: 'site_manage',
			name: 'SiteManage',
			component: () => import('@/views/component/site-manage/index.vue'),
			meta: {
				requestAutho: true
			}
		},{
			path: 'wechat_account',
			name: 'WeChatAccount',
			component: () => import('@/views/component/wechat-account/index.vue'),
			meta: {
				requestAutho: true
			}
		}]
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
	},
	{
		path: '/wx_article',
		name: 'wxArticle',
		component: () => import('../views/article.vue'),
		meta: {
			requestAutho: false
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	document.title = `镇江行业老干部办后台管理系统-${to.meta.title}` ?? "镇江市行业老干部管理服务办公室";
	if (to.meta.requestAutho) {
		if (localStorage.getItem("token")) {
			next()
		} else {
			router.push('login')
		}
	} else {
		next()
	}
})

export default router
