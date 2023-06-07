# 留言板子

 ![嘿嘿嘿](/images/3.jpg)
 ![嘿嘿嘿](/images/2.jpg)
 ![嘿嘿嘿](/images/1.jpg)



<CommentService :darkmode="isDarkMode" />

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';

const isDarkMode = ref(false);
let observer;
onMounted(() => {
  const html = document.querySelector('html') as HTMLElement;
  isDarkMode.value = html.classList.contains('dark');
  // watch theme change
  observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains('dark');
  });
  observer.observe(html, {
    attributeFilter: ['class'],
    attributes: true,
  });
});
onBeforeUnmount(() => {
  observer.disconnect();
});
console.log(isDarkMode,'???');

// const theme = computed(() => {
//  return this.$theme.palette.themeColors.primary;
// });
</script>
