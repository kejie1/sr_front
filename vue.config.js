module.exports = {
  devServer: {
    port: "8080",
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        //  是.env.development 文件的 /dev-api
        target: " http://localhost:3000",
        chargeOrigin: true, // 开启代理服务器
        pathRewrite: {
          // '^/dev-api': '',
          ["^" + process.env.VUE_APP_BASE_API]: "", // /dev-api 替换为空  https://www.easy-mock.com/mock/5f97da2747e82c655543228e/test-admin/dev-api
        },
      },
    },
  },
};
