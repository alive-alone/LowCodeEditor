const path = require("path")
const { defineConfig } = require("@vue/cli-service")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  configureWebpack: (config) => {
    let plugins = [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg") // 重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/assets/icon/svg")) // 需要处理svg的目录（可自定义）
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        // 指定symbolId格式
        symbolId: "icon-[name]",
        // symbolId: 'icon-[dir]-[name]'
      })
  },
  productionSourceMap: false,
})
