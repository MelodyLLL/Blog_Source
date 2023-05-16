<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue';
import {
	ClientOnly,
	usePageFrontmatter,
	useSiteLocaleData,
	withBase,
} from '@vuepress/client';
import { isArray } from '@vuepress/shared';
import type { FunctionalComponent } from 'vue';
import { computed, h, ref } from 'vue';
import type { DefaultThemeHomePageFrontmatter } from '@vuepress/theme-default/lib/shared/index.js';
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables/index.js';
import CustomModal from './CustomModal.vue';

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();
const siteLocale = useSiteLocaleData();
const isDarkMode = useDarkMode();

const heroImage = computed(() => {
	if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
		return frontmatter.value.heroImageDark;
	}
	return frontmatter.value.heroImage;
});
const heroAlt = computed(
	() => frontmatter.value.heroAlt || heroText.value || 'hero'
);
const heroHeight = computed(() => frontmatter.value.heroHeight || 280);

const heroText = computed(() => {
	if (frontmatter.value.heroText === null) {
		return null;
	}
	return frontmatter.value.heroText || siteLocale.value.title || 'Hello';
});

const tagline = computed(() => {
	if (frontmatter.value.tagline === null) {
		return null;
	}
	return (
		frontmatter.value.tagline ||
		siteLocale.value.description ||
		'Welcome to your VuePress site'
	);
});

const actions = computed(() => {
	if (!isArray(frontmatter.value.actions)) {
		return [];
	}

	return frontmatter.value.actions.map(({ text, link, type = 'primary' }) => ({
		text,
		link,
		type,
	}));
});

const HomeHeroImage: FunctionalComponent = () => {
	if (!heroImage.value) return null;
	const img = h('img', {
		src: withBase(heroImage.value),
		alt: heroAlt.value,
		height: heroHeight.value,
	});
	if (frontmatter.value.heroImageDark === undefined) {
		return img;
	}
	// wrap hero image with <ClientOnly> to avoid ssr-mismatch
	// when using a different hero image in dark mode
	return h(ClientOnly, () => img);
};

const showModal = ref(false);
</script>

<template>
	<ClientOnly>
	  <header class="hero">
  		<HomeHeroImage />
  
  		<h1 v-if="heroText" id="main-title" class="customFont">
  			{{ heroText }}
  		</h1>
  
  		<p v-if="tagline" class="description customFont">
  			{{ tagline }}
  		</p>
  
  		<p v-if="actions.length" class="actions">
  			<template v-for="action in actions" :key="action.text">
  				<button
  					id="show-modal"
  					class="modal-default-button"
  					@click="showModal = true"
  				>
  					{{ action.text }}
  				</button>
  				<!-- <AutoLink class="action-button" :class="[action.type]" :item="action" /> -->
  			</template>
  		</p>
  	</header>
  
  	<Teleport to="body">
  		<!-- use the modal component, pass in the prop -->
  		<CustomModal :show="showModal" @close="showModal = false">
  			<template #header>
  				<h3>关于站点！</h3>
  			</template>
  			<template #body
  				><div class="modal_default_font">
  					这是一个由vuepress2.0二次开发的个人博客站点，本人4年前端码农一枚。后续争取在该网站进行各种前端知识的归档，打造一个高质量的前端知识库个人博客站点
  				</div></template
  			>
  			<!-- <template #footer>
  				<button class="modal-default-button" @click="showModal = false">
  					我知道了
  				</button>
  			</template> -->
  		</CustomModal>
  	</Teleport>
	</ClientOnly>
</template>
<style scoped lang="scss">

.customFont{
  font-family: 'Indie Flower';
}
.modal_default_font {
  font-family: fontName;
	font-weight: bold;
	font-size: 1.5rem;
	color: var(--c-brand);
}
.modal-default-button {
	display: inline-block;
	font-size: 1.2rem;
	padding: 0.8rem 1.6rem;
	border-width: 2px;
	border-style: solid;
	border-radius: 16px;
	transition: background-color var(--t-color);
	box-sizing: border-box;
	color: var(--c-bg);
	background-color: var(--c-brand);
	border-color: var(--c-brand);
	cursor: pointer;
	&:hover {
		background-color: var(--c-brand-light);
	}
}
</style>
