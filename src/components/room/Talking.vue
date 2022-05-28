<template>
	<div class="talking-wrapper">
		<div class="talking-inner">
			<img
				src="../../assets/images/higuma-icon.png"
				alt="ひぐまさんアイコン"
				width="100"
			/>
			<p>ひぐまさん</p>
			<p class="talking-isTalking">
				悩んでること言えたら<br />
				切ってね
			</p>
			<button @click="stopRecord()">
				<img src="../../assets/images/phonedown.svg" alt="とじる" />
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue } from 'vue-class-component'

	export default class VoiceRecognition extends Vue {
		recognizing = false
		recognition: any = null
		recordedText = ''

		created() {
			const { webkitSpeechRecognition } = window as any
			const recognition = new webkitSpeechRecognition()
			recognition.lang = 'ja-JP'
			recognition.continuous = true
			recognition.interimResults = true

			this.recognizing = true

			recognition.onresult = this.recognize
			this.recognition = recognition
			this.recognition.start()
		}

		stopRecord() {
			this.recognition.stop()
			setTimeout(() => {
				this.$emit('stopTalking', this.recordedText)
			}, 500)
		}

		protected recognize(e: any) {
			console.log(e.results)
			this.recordedText = `${e.results[e.results.length - 1][0].transcript}、`
		}
	}
</script>

<style lang="sass">
	.talking-wrapper
		position: fixed
		top: 0
		left: 0
		z-index: 100
		width: 100%
		height: 100vh
		background: #2D3649
		display: flex
		flex-wrap: nowrap
		justify-content: center
		align-items: center
		img
			margin: 0 auto
		.talking-inner
			text-align: center
		p
			color: white
			margin-top: 10px
		.talking-isTalking
			font-size: 24px
			margin-bottom: 30px
		button
			outline: none
			border: none
			width: 70px
			height: 70px
			border-radius: 50px
			background: #FF3B30
</style>
