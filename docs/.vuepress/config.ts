import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

import { navbar, sidebar } from './config/index';

export default defineUserConfig({
	lang: 'zh-CN',
	title: '你好， VuePress ！',
	description: '这是我的第一个 VuePress 站点',
	theme: defaultTheme({
		logo: '/images/avator.webp',
		// 在这里进行配置
		navbar,
		sidebar,
		colorModeSwitch: true,
	}),
});
