import { SidebarConfig } from "vuepress";

const sidebar: SidebarConfig = {
  // SidebarItem
  "/note/": [
    {
      text: "React",
      collapsible: true,
      children: ["/note/note1.md", "/note/note2.md"],
    },
  ],
  "/reference/": [
    {
      text: "Reference",
      children: ["/reference/cli.md", "/reference/config.md"],
    },
  ],
};

export default sidebar;
