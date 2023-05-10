import { SidebarConfig } from 'vuepress';

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
};

export default sidebar;
