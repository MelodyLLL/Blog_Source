import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'

export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
})