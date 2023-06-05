import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import { createPage } from '@vuepress/core'
import { navbar, sidebar } from './config/index';
import { getDirname, path } from '@vuepress/utils'
const __dirname = getDirname(import.meta.url)

const REPO = '/MelodyLLL_BLOG/';
export default defineUserConfig({
	head: [['link', { rel: 'icon', href: `/images/avator.webp` }]],
	lang: 'zh-CN',
	base: '/',
	title: '改变 就是好事',
	description: 'Change is a good thing',
	locales: {},
	theme: defaultTheme({
		logo: `/images/avator.webp`,
		// 在这里进行配置
		navbar,
		sidebar,
		lastUpdatedText: '最后修改时间',
		contributorsText: '编写者',
	}),
  alias: {
    '@theme/CustomHomeHero.vue': path.resolve(__dirname, './components/CustomHomeHero.vue'),
    '@theme/HomeHero.vue': path.resolve(__dirname, './components/CustomHomeHero.vue'),
  },
});
