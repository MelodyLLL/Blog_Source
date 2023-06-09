<script setup lang="ts">
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
// import HomeContent from "@theme/HomeContent.vue";
import HomeFooter from '@theme/HomeFooter.vue';
import HomeHero from '../components/CustomHomeHero.vue';
import HomeFeatures from '../components/CustomHomeFeatures.vue';

</script>

<template>
	<Layout>
		<template #navbar-before>
			<!-- <SearchBox /> -->
		</template>
		<template #page>
			<main class="home">
				<HomeHero />
				<HomeFeatures />
				<HomeFooter />
			</main>
		</template>
		<!-- <template #page-content-bottom>
			<div class="my-footer">123</div>
		</template> -->
	</Layout>
</template>
