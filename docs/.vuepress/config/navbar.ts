import { NavbarGroup, NavbarItem } from 'vuepress';

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
		link: '/interview/interview0.md',
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
