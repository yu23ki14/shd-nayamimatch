<template>
	<div class="chat-window">
		<ChatWindow
			current-user-id="me"
			:rooms="rooms"
			:messages="messages"
			:rooms-loaded="true"
			:messages-loaded="true"
			:show-emojis="false"
			:show-files="false"
			:show-audio="false"
			:single-room="true"
			@send-message="onSendMessage"
			room-id="123"
			height="100%"
		/>
		<Talking v-if="isTalking" @stopTalking="(e: string) => stopTalking(e)" />
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component'
	import ChatWindow, { Message, Room, StringNumber } from 'vue-advanced-chat'
	import Talking from '../components/room/Talking.vue'
	import 'vue-advanced-chat/dist/vue-advanced-chat.css'

	@Options({
		components: {
			ChatWindow,
			Talking
		}
	})
	export default class RoomView extends Vue {
		higumaAvator = require('../assets/higuma-icon.png')
		rooms: Room[] = [
			{
				roomId: '123',
				roomName: 'ひぐまさん',
				avatar: this.higumaAvator,
				users: [
					{
						_id: 'higuma',
						username: 'ひぐまさん',
						avatar: '',
						status: { state: 'online', lastChanged: '' }
					}
				]
			}
		]
		messages: Message[] = []

		isTalking = false
		talkingType: 'new' | 'additional' = 'new'
		searchKeywords = ''

		async mounted() {
			await this.pushNewMessage({
				content: '毎日お疲れやで\nだれも聞いてないから、ちょっと愚痴ってみ',
				senderId: 'higuma',
				avatar: this.higumaAvator
			})
			await this.pushTalkButton()
		}

		async pushTalkButton(type?: 'new' | 'additional') {
			document.getElementById('tell')?.remove()
			await this.pushNewMessage({
				_id: 'tell',
				content: '話す',
				senderId: 'higuma'
			})

			await this.pushLinkCard({ title: 'hello', href: 'test' })

			setTimeout(() => {
				document.getElementById('tell')?.addEventListener('click', () => {
					this.isTalking = true
					this.talkingType = type || 'new'
				})
			}, 500)
		}

		pushNewMessage(params: {
			content: string
			senderId: 'higuma' | 'me'
			_id?: StringNumber
			avatar?: any
		}) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						this.messages.push({
							...params,
							_id: params._id || this.messages.length,
							timestamp: '',
							date: ''
						})
					)
				}, 500)
			})
		}

		pushLinkCard(params: { title: string; href: string; img?: string }) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						this.messages.push({
							content: '',
							senderId: 'higuma',
							_id: this.messages.length,
							timestamp: '',
							date: '',
							link: params
						})
					)
				}, 100)
			})
		}

		async stopTalking(e: string) {
			this.isTalking = false
			if (this.talkingType === 'new') {
				await this.pushNewMessage({
					content: 'ありがとうな！\n大変やったなぁ・・・',
					senderId: 'higuma',
					avatar: this.higumaAvator
				})
				const { data } = await this.axios.post('/get-keywords', {})
				this.searchKeywords += `${data} `
				await this.pushNewMessage({
					content: `${data}のところ、もう少し詳しく聞かせてや`,
					senderId: 'higuma',
					avatar: this.higumaAvator
				})
				await this.pushTalkButton('additional')
			} else if (this.talkingType === 'additional') {
				const { data: keywords } = await this.axios.post('/get-keywords', {})
				this.searchKeywords += `${keywords} `
				const { data: searchResults } = await this.axios.post(
					'/get-keywords',
					{}
				)
			}
		}

		onSendMessage(message: Message) {
			console.log(message)
			console.log('hello')
		}
	}
</script>

<style lang="sass">
	.chat-window
		width: 100%
		height: 100vh
		.vac-room-header
			background: #2D3649
			border-radius: 0
			.vac-room-name
				color: white
				font-weight: bold
		.vac-container-scroll
			background: #F4E0B7
			margin-right: 0
		.vac-box-footer
			position: relative
			padding-top: 25px
			&::before
				position: absolute
				font-size: 12px
				top: 5px
				content: "文字入力で話したいときはこっちを使ってね"
		.vac-text-started, .vac-card-date, .vac-line-new, .vac-message-actions-wrapper, .vac-icon-textarea-left
			display: none
		.vac-message-box
			margin-top: 10px
		#tell
			.vac-message-box
				max-width: 100%
				text-align: center
				display: block
			.vac-message-container
				min-width: auto
				display: inline-block
			.vac-message-card
				width: 80px
				height: 80px
				display: flex
				justify-content: center
				align-items: center
				border-radius: 50px
				background: #4B4B4B
				color: white
				font-size: 18px
</style>
