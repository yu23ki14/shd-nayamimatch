<template>
	<div class="main_wrapper">
		<div class="main">
			<section class="section_inner pt-50 bg_baseBrown">
				<h1 class="center">
					<span class="text-xl">子育てスナック</span><br>
					<span class="text-2xl">ひぐまさんの相談部屋</span>
				</h1>
				<div class="top_message mt-25">
					<img
						src="../assets/images/higuma-icon.png"
						alt="ひぐまさんアイコン"
						class="top_message_icon"
					/>
					<div class="speech_bubble top_message_comment">
						<p class="text-base">ひぐまさんに愚痴りませんか?</p>
							<div class="top_message_talk_icon mt-25">
								<img
									src="../assets/images/talk_icon.svg"
									alt="トークアイコン"
									class="top_message_talk_icon"
								/>
						</div>
						<p class="color-annotation text-xs mt-10">ひぐまさんとの会話をスタート</p>
					</div>
				</div>
				<div class="higmas_img mt-45">
					<img
						src="../assets/images/parent_and_child.png"
						alt="ひぐまさん親子"
					/>
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component'

	@Options({
		// components: {
		// 	HelloWorld,
		// 	VoiceRecognition
		// }
	})
	export default class HomeView extends Vue {

	}
</script>

<style lang="scss" scoped>
@import 'src/assets/stylesheets/Foundation/colors.scss';
.top_message {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	&_icon {
		width: 20%;
		position: relative;
	}
	&_comment {
		width: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 0;
	}
	&_talk_icon {
		width: 80px;
		&::before {
			content: "";
			display: flex;
			position: absolute;
			background-color: $baseBrown-50;
			width: 80px;
			height: 80px;
			border-radius: 50%;
			transform: scale(1.3);
			z-index: -1;
		}
	}
	.higmas_img {
		display: flex;
		justify-content: center;
		img {
			widows: 60%;
		}
	
	}
}
</style>

