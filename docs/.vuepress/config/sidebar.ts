import { SidebarConfig } from 'vuepress';
import { getFileName } from '../utils';
import path from 'path';

const fileNames = getFileName(path.resolve(__dirname, '../../interview'));

const sidebar: SidebarConfig = {
	// SidebarItem
	'/note/react/': [
		{
			text: 'React笔记',
			// collapsible: true,
			children: ['/note/react/React1.md', '/note/react/React2.md'],
		},
	],
	'/note/engineering/': [
		{
			text: '前端工程化笔记',
			// collapsible: true,
			children: [
				'/note/engineering/Engineering1.md',
				'/note/engineering/Engineering2.md',
				'/note/engineering/Engineering3.md',
			],
		},
	],
	'/note/typescript/': [
		{
			text: 'Typescript笔记',
			// collapsible: true,
			children: ['/note/typescript/Typescript1.md'],
		},
	],
	'/interview/': [
		{
			text: '经常问到的那些',
			children: fileNames.map((item) => {
				return '/' + item.split('/').slice(-2).join('/');
			}),
		},
	],
};

export default sidebar;
