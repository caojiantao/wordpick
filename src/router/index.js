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
      path: "/chapters/:categoryId",
      name: "chapter-list",
      component: () => import("../views/ChapterListView.vue"),
      props: true,
    },
    {
      path: "/cards/:chapterId",
      name: "word-cards",
      component: () => import("../views/WordCardsView.vue"),
      props: true,
    },
  ],
});

export default router;
