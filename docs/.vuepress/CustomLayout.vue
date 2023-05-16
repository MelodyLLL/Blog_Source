<script setup lang="ts">
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
// import HomeContent from "@theme/HomeContent.vue";
import HomeFeatures from './CustomHomeFeatures.vue';
import HomeFooter from '@theme/HomeFooter.vue';
import HomeHero from './CustomHomeHero.vue';
import { ClientOnly } from '@vuepress/client';
</script>

<template>
	<ClientOnly>
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
	</ClientOnly>
</template>
