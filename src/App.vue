<template>
  <div id="app">
    <router-view />
    <div class="footer">
      ICP备案/许可证号：<a
        class="link"
        rel="noopener"
        target="_blank"
        href="http://beian.miit.gov.cn/"
        >粤ICP备2024182553号-2</a
      >
    </div>
  </div>
</template>

<style lang="less">
#app {
  margin: 0;
  padding: 0;
}
body {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.footer {
  margin-top: 8vh;
  width: 100%;
  padding: 16px 0;
  color: #888888;
  text-align: center;
  font-size: 14px;
  background-color: #f8f8f8;
  .link {
    color: inherit;
    text-decoration: none;
  }
}
</style>
