import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import "./assets/icon/index"
import "@/assets/css/base.css"
import SvgIcon from "@/components/common/SvgIcon.vue"

const app = createApp(App)
app.use(store).use(router).mount("#app")

app.component("SvgIcon", SvgIcon)
