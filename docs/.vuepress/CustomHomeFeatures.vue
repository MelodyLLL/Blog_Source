<script setup>
import { ClientOnly } from '@vuepress/client';

const props = defineProps({});
</script>
<!-- horizontal -->
<template>
	<ClientOnly>
	  <!-- <h4>Horizontal Flip</h4> -->
  	<p>
  	  <div class="flip_wrapper">
    		<div class="flip">
    			<div
    				class="front"
    				style="
    					background-image: url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
    				"
    			>
    				<h1 class="text-shadow">MOUNTAIN</h1>
    			</div>
    			<div class="back">
    				<h2>Angular</h2>
    				<p>
    					Good tools make application development quicker and easier to maintain
    					than if you did everything by hand..
    				</p>
    			</div>
    		</div>
    		<div class="flip">
    			<div
    				class="front"
    				style="
    					background-image: url(https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
    				"
    			>
    				<h1 class="text-shadow">LAKE</h1>
    			</div>
    			<div class="back">
    				<h2>Angular</h2>
    				<p>
    					Good tools make application development quicker and easier to maintain
    					than if you did everything by hand..
    				</p>
    			</div>
    		</div>
    		<div class="flip">
    			<div
    				class="front"
    				style="
    					background-image: url(https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
    				"
    			>
    				<h1 class="text-shadow">OCEAN</h1>
    			</div>
    			<div class="back">
    				<h2>Angular</h2>
    				<p>
    					Good tools make application development quicker and easier to maintain
    					than if you did everything by hand..
    				</p>
    			</div>
    		</div>
    	</div>
    
    	<br />
    	<br />
    
    	<!-- vertical -->
    
    	<!-- <h4>Vertical Flip</h4> -->
    	<div class="flip_wrapper">
    		<div class="flip flip-vertical">
    			<div
    				class="front"
    				style="
    					background-image: url(https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
    				"
    			>
    				<h1 class="text-shadow">FOREST</h1>
    			</div>
    			<div class="back">
    				<h2>Angular</h2>
    				<p>
    					Good tools make application development quicker and easier to maintain
    					than if you did everything by hand..
    				</p>
    			</div>
    		</div>
    		<div class="flip flip-vertical">
    			<div
    				class="front"
    				style="
    					background-image: url(https://images.pexels.com/photos/34950/pexels-photo.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
    				"
    			>
    				<h1 class="text-shadow">TRACK</h1>
    			</div>
    			<div class="back">
    				<h2>Angular</h2>
    				<p>
    					Good tools make application development quicker and easier to maintain
    					than if you did everything by hand..
    				</p>
    			</div>
    		</div>
    		<div class="flip flip-vertical">
    			<div
    				class="front"
    				style="
    					background-image: url(https://images.pexels.com/photos/34546/sunset-lake-landscape-summer.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
    				"
    			>
    				<h1 class="text-shadow">SWAMP</h1>
    			</div>
    			<div class="back">
    				<h2>Angular</h2>
    				<p>
    					Good tools make application development quicker and easier to maintain
    					than if you did everything by hand..
    				</p>
    			</div>
    		</div>
    	</div>
  	</p>
	</ClientOnly>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
// * {
// 	box-sizing: border-box;
// 	font-weight: normal;
// }

// body {
// 	color: #555;
// 	background: #222;
// 	text-align: center;
// 	font-family: 'Indie Flower';
// 	padding: 1em;
// }

h1 {
	font-size: 2.2em;
}

// base
.flip_wrapper {
	display: flex;
	flex-wrap: wrap-reverse;

	.flip {
		flex: 1;
		position: relative;
		> .front,
		> .back {
			display: block;
			transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
			-ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

			transition-duration: 1.5s;
      -ms-transition-duration: 1.5s;
      -moz-transition-duration: 1.5s;
      -webkit-transition-duration: 1.5s;
      -o-transition-duration: 1.5s;

			transition-property: transform, opacity;
			-ms-transition-property: transform, opacity;
			-moz-transition-property: transform, opacity;
      -webkit-transition-property: transform, opacity;
			-o-transition-property: transform, opacity;

		}
		> .front {
			transform: rotateY(0deg);
			-ms-transform: rotateY(0deg);
			-moz-transform: rotateY(0deg);
			-webkit-transform: rotateY(0deg);
			-o-transform: rotateY(0deg);
		}
		> .back {
			position: absolute;
			opacity: 0;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			transform: rotateY(-180deg);
			-ms-transform: rotateY(-180deg);
			-moz-transform: rotateY(-180deg);
			-webkit-transform: rotateY(-180deg);
			-o-transform: rotateY(-180deg);
		}
		&:hover {
			> .front {
				transform: rotateY(180deg);
				-ms-transform: rotateY(-180deg);
				-moz-transform: rotateY(-180deg);
				-webkit-transform: rotateY(-180deg);
				-o-transform: rotateY(-180deg);
			}
			> .back {
				opacity: 1;
				transform: rotateY(0deg);
				-ms-transform: rotateY(0deg);
				-moz-transform: rotateY(0deg);
				-webkit-transform: rotateY(0deg);
				-o-transform: rotateY(0deg);
			}
		}
		&.flip-vertical {
			> .back {
				transform: rotateX(-180deg);
				-ms-transform: rotateX(-180deg);
				-moz-transform: rotateX(-180deg);
				-webkit-transform: rotateX(-180deg);
				-o-transform: rotateX(-180deg);
			}
			&:hover {
				> .front {
					transform: rotateX(180deg);
					-ms-transform: rotateX(-180deg);
					-moz-transform: rotateX(-180deg);
					-webkit-transform: rotateX(-180deg);
					-o-transform: rotateX(-180deg);
				}
				> .back {
					transform: rotateX(0deg);
					-ms-transform: rotateX(0deg);
					-moz-transform: rotateX(0deg);
					-webkit-transform: rotateX(0deg);
					-o-transform: rotateX(0deg);
				}
			}
		}
	}

	// custom
	.flip {
		position: relative;
		display: inline-block;
		margin-right: 2px;
		margin-bottom: 1em;
		// width: 300px;
		> .front,
		> .back {
			display: block;
			color: white;
			width: inherit;
			background-size: cover !important;
			background-position: center !important;
			height: 220px;
			padding: 1em 2em;
			background: #313131;
			border-radius: 10px;
			p {
				font-size: 0.9125rem;
				line-height: 160%;
				color: #999;
			}
		}
	}
}

.text-shadow {
	text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04),
		3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04),
		0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04),
		7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04),
		9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04),
		11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04),
		13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04),
		0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04),
		17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04),
		19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);
}
</style>
