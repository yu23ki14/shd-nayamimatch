<template>
	<div>
		<p>{{ recoredText }}</p>
		<button @click="record()">{{ recordBtnValue }}</button>
	</div>
</template>

<script lang="ts">
	import { Vue } from 'vue-class-component'

	export default class VoiceRecognition extends Vue {
		recognizing = false
		recognition: any = null
		recordBtnValue = '吐き出す'
		recoredText = ''

		async mounted() {
			const { webkitSpeechRecognition } = window as any
			const recognition = new webkitSpeechRecognition()
			recognition.lang = 'ja-JP'
			recognition.continuous = true
			recognition.onresult = this.recognize
			this.recognition = recognition
		}

		record() {
			if (this.recognizing) {
				this.recognition.stop()
				this.recordBtnValue = '吐き出してください'
			} else {
				this.recoredText = ''
				this.recognition.start()
				this.recordBtnValue = '吐き出した'
			}
			this.recognizing = !this.recognizing
		}

		protected recognize(e: any) {
			this.recoredText += `${e.results[e.results.length - 1][0].transcript}\n`
		}
	}
</script>

<style scoped lang="scss">
	button {
		width: 250px;
		height: 250px;
		color: grey;
		background-color: rgb(248, 189, 189);
		display: inline-block;
	}
</style>
