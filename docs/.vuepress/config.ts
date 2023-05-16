import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

import { navbar, sidebar } from './config/index';

const REPO = "/MelodyLLL_BLOG/"
export default defineUserConfig({
	head: [['link', { rel: 'icon', href: '/images/avator.webp' }]],
	lang: 'zh-CN',
  base: REPO,
	title: '改变 就是好事',
	description: 'Change is a good thing',
	locales: {},
	theme: defaultTheme({
		logo: '/images/avator.webp',
		// 在这里进行配置
		navbar,
		sidebar,
		lastUpdatedText: '最后修改时间',
		contributorsText: '编写者',
	}),
});
