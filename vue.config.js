const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		port: 3000
	},
	pages: {
    index: {
      entry: "src/main.ts",
      title: "ひぐまさんの相談部屋",
			description: "子育ての色々な悩みやモヤモヤを、ワンオペくまのひぐまさんと共有するアプリです"
    }
  }
})
