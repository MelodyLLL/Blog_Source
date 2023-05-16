import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import { createPage } from '@vuepress/core'
import { navbar, sidebar } from './config/index';

const REPO = '/MelodyLLL_BLOG/';
export default defineUserConfig({
	head: [['link', { rel: 'icon', href: '/images/avator.webp' }]],
	lang: 'zh-CN',
	base: REPO,
	title: '改变 就是好事',
	description: 'Change is a good thing',
	locales: {},
	theme: defaultTheme({
		logo: `${REPO}/images/avator.webp`,
		// 在这里进行配置
		navbar,
		sidebar,
		lastUpdatedText: '最后修改时间',
		contributorsText: '编写者',
	}),
	// 初始化之后，所有的页面已经加载完毕
// 	async onInitialized(app) {
// 		// 如果主页不存在
// 		if (app.pages.every((page) => page.path !== '/')) {
// 			// 创建一个主页
// 			const homepage = await createPage(app, {
// 				path: '/',
// 				// 设置 frontmatter
// 				frontmatter: {
// 					layout: 'Layout',
// 				},
// 				// 设置 markdown 内容
// 				content: `\
// # 欢迎来到 ${app.options.title}

// 这是默认主页
// `,
// 			});
// 			// 把它添加到 `app.pages`
// 			app.pages.push(homepage);
// 		}
// 	},
});
