<template>
	<div>
		<mt-swipe :auto="4000">
				<mt-swipe-item v-for="item in lunbotuList" :key="item.id">
					<img :src="item.image" alt="" :class="{full: isfull}" />
				</mt-swipe-item>
			</mt-swipe>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: ["lunbotuList", "isfull"],
	}
</script>

<style lang="scss" scoped>
	.mint-swipe {
		height: 201px;
	
	.mint-swipe-item {
		&:nth-child(1) {
			background-color: red;
		}
		&:nth-child(2) {
			background-color: aquamarine;
		}
		&:nth-child(3) {
			background-color: antiquewhite;
		}
		
		img {
			// width: 100%;
			height: 100%;
		}
	}
	}
	
	.full {
		width: 100%;
	}
</style>
