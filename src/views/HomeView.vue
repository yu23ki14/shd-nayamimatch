<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />

		<p>
			{{ testVariables }}
		</p>
		<button @click="changeTestVariables">テキストが変わる</button>

		{{ fromApi }}

		<button @click="getValFromAPI">テストAPI叩く</button>

		<p v-for="ai in testArray" :key="ai">
			{{ ai }}
		</p>

		<p>{{ testObject.key1 }}</p>
		<p>{{ testObject.key2 }}</p>

		<HelloWorld />
	</div>
</template>

<script lang="ts">
	import { Options, Vue } from 'vue-class-component'
	import HelloWorld from '../components/HelloWorld.vue'

	@Options({
		components: {
			HelloWorld
		}
	})
	export default class HomeView extends Vue {
		testVariables = '適当な変数'
		testArray = ['要素1', '要素2']
		testObject = {
			key1: 'val1',
			key2: 'val2'
		}
		fromApi = ''

		changeTestVariables() {
			this.testVariables = '変わったよ'
		}

		async getValFromAPI() {
			const { data } = await this.axios.get('http://localhost:3001')
			this.fromApi = data
		}
	}
</script>
