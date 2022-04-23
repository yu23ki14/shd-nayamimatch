<template>
	<div>
		<p>ルームだよ</p>
		<ChatWindow
			:current-user-id="currentUserId"
			:rooms="rooms"
			:messages="messages"
		/>
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component'
	import ChatWindow from 'vue-advanced-chat'
	import 'vue-advanced-chat/dist/vue-advanced-chat.css'

	@Options({
		components: {
			ChatWindow
		}
	})
	export default class RoomView extends Vue {
		rooms = []
		messages = []
		currentUserId = 1
	}
</script>
