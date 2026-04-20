import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/list/:categoryId",
      name: "word-list",
      component: () => import("../views/WordListView.vue"),
      props: true,
    },
    {
      path: "/word/:lemma",
      name: "word-detail",
      component: () => import("../views/WordDetailView.vue"),
      props: true,
    },
  ],
});

export default router;
