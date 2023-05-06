import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

import { navbar, sidebar } from "./config/index";

export default defineUserConfig({
  lang: "zh-CN",
  title: "改变 就是好事",
  description: "Change is a good thing",
  locales: {},

  theme: defaultTheme({
    logo: "/images/avator.webp",
    // 在这里进行配置
    navbar,
    sidebar,
    // lastUpdatedText: "最近更新时间",
  }),
});
