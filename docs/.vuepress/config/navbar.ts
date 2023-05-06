import { NavbarGroup, NavbarItem } from "vuepress";

interface NavbarItems extends NavbarItem {
  icon?: any;
}
const navbar: (NavbarItems | NavbarGroup | string)[] = [
  {
    text: "首页",
    link: "/",
  },
  {
    text: "面经",
    link: "/interview/interview.md",
  },
  {
    text: "笔记",
    children: [
      {
        text: "React的",
        link: "/note/note1.md",
        // children: ["/note/note1.md", "/note/note2.md"],
      },
    ],
  },
  // {
  // 	text: '时间轴',
  // 	link: '/timeline/',
  // 	icon: 'ClockCircleTwotone',
  // },
  // 控制元素何时被激活,最大深度2
  // {
  // 	text: 'Java文档',
  // 	children: [
  // 		{
  // 			text: 'Java设计模式',
  // 			link: '/posts/design-pattern/',
  // 			//该元素将一直处于激活状态
  // 			activeMatch: '/posts/design-pattern/',
  // 		},
  // 	],
  // },
];

export default navbar;
