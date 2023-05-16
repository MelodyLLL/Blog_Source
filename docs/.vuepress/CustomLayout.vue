<script setup lang="ts">
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
// import HomeContent from "@theme/HomeContent.vue";
import HomeFeatures from "./CustomHomeFeatures.vue";
import HomeFooter from "@theme/HomeFooter.vue";
import HomeHero from "./CustomHomeHero.vue";
</script>

<template>
  <Layout>
    <template #page>
      <main class="home">
        <HomeHero />
        <HomeFeatures />
        <!-- <HomeContent /> -->
        <HomeFooter />
      </main>
    </template>
  </Layout>
</template>
