<template>
	<router-view />
</template>

<script lang="ts">
	import 'modern-css-reset'
	import { Vue } from 'vue-class-component'
	export default class App extends Vue {}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	nav {
		padding: 30px;
	}

	nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	nav a.router-link-exact-active {
		color: #42b983;
	}
</style>
