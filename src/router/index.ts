import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/home/Home.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "LowCode",
    component: () => import("@/views/lowCode/LowCode.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
