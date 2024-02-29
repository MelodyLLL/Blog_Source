import { NavbarGroup, NavbarItem } from 'vuepress';
import { resolve } from 'path';
import fs from 'fs';
const interviewDir = resolve(__dirname, '../../interview');
const files = fs.readdirSync(interviewDir);

let firstInterviewFile = '';
if (files.length > 0) {
	firstInterviewFile = files.find((item) => item.endsWith('.md') && !item.startsWith('_')) || '';
}

console.log(firstInterviewFile);
interface NavbarItems extends NavbarItem {
	icon?: any;
}
const navbar: (NavbarItems | NavbarGroup | string)[] = [
	{
		text: '首页',
		link: '/',
	},
	{
		text: '面经',
		link: `/interview/${firstInterviewFile}`,
		activeMatch: '/interview0',
	},
	{
		text: '笔记',
		// link: '/note/react/React1.md',
		activeMatch: '/note',
		children: [
			{
				text: 'React相关',
				link: '/note/react/React1.md',
				// children: ["/note/note1.md", "/note/note2.md"],
			},
			{
				text: '前端工程化',
				link: '/note/engineering/Engineering1.md',
			},
			{
				text: 'Typescript',
				link: '/note/typescript/Typescript1.md',
			},
		],
	},
	{
		text: '留言',
		link: '/comment.md',
		activeMatch: '/comment',
	},
];

export default navbar;
