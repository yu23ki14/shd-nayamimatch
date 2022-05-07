<template>
	<div class="main_wrapper">
		<div class="main">
			<section class="section_inner pt-50 bg-baseBrown">
				<h1 class="center">
					<span class="color-darkBrown text-xl bold">子育てスナック</span><br>
					<span class="color-darkBrown text-2xl bold">ひぐまさんの相談部屋</span>
				</h1>
				<div class="top_message mt-25">
					<img
						src="../assets/images/higuma-icon.png"
						alt="ひぐまさんアイコン"
						class="top_message_icon"
					/>
					<div class="speech_bubble left top_message_comment p-15">
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
			<section class="section_inner pt-50 pb-50">
				<h2 class="center text-xl bold">ひぐまさんの相談部屋とは?</h2>
				<p class="text-base p-10 mt-25">
					毎日の子育ての中での色々な悩みやモヤモヤをワンオペくまのひぐまさんにお話してみませんか？<br>
					あなたがどんなことで悩んでいるのか、ひぐまさんが受け取って、あなたの代わりに色々調べてきます！
				</p>
				<div class="salmon_img">
					<img
						src="../assets/images/salmon.png"
						alt="さけ"
					/>
				</div>
				<ul>
					<li v-for="step in steps" :key="step.id" class="step_item bg-baseBrown-50">
						<div class="step_item_sign color-white bold bg-darkBrown">
							STEP{{ step.id }}
						</div>
						<p class="step_item_content text-sm bold">{{ step.content }}</p>
						<div class="step_item_message mt-10">
							<p class="text-xs speech_bubble right pt-5 pb-5 pl-15 pr-15">{{ step.message }}</p>
								<img
									src="../assets/images/higuma-icon.png"
									alt="ひぐまさんアイコン"
									class="step_item_icon"
								/>
						</div>
					</li>
				</ul>
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
		steps = [
			{
				id: 1,
				content: "トークボタンでひぐまさんモヤモヤを話す",
				message: "なんでも言ってみ！"
			},
			{
				id: 2,
				content: "お話しの内容から、ひぐまさんがお悩みを予想",
				message: "モヤモヤポイントはここか？"
			},
			{
				id: 3,
				content: "役に立ちそうな情報を探してくるよ！",
				message: "20％くらい楽になるかもな"
			},
		]
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
}
.salmon_img {
	display: flex;
	justify-content: flex-end;
	transform: translate(0, -30px);
	img {
		transform: scale(-1, 1);
		width: 30%;
	}
}
.higmas_img {
	display: flex;
	justify-content: center;
	img {
		width: 75%;
	}
}
/* @mixin comment_deco {
	content: "";
	width: 50px;
	height: 80%;
	position: absolute;
	top: 50%;
	right: 50px;
	display: block;
} */
.step_item {
	&:not(:last-child) {
		margin-bottom: 15px;
	}
	list-style: none;
	position: relative;
	border-radius: 10px;
	padding: 15px 15px 0 90px;
	width: calc(100% - 10px); 
	margin-left: 10px;
	&_sign {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		left: -10px;
		border-radius: 50%;
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	&_content {
		/* width: calc(100% - 80px); */
	}
	&_message {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		/* &::before {
			@include comment_deco;
			border-top: solid 1px $darkBrown;
			transform: translate(0, -50%) rotate(10deg);
		}
		&::after {
			@include comment_deco;
			border-bottom: solid 1px $darkBrown;
			transform: translate(0, -50%) rotate(-10deg);
		} */
	}
	&_icon {
		width: 50px;
		box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.3);
		border-radius: 50%;
		transform: translate(15px, 5px);
	}
}
</style>

