import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
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
    {
      path: "/review/chapter/:chapterId",
      name: "review-chapter",
      component: () => import("../views/ReviewView.vue"),
      props: true,
    },
    {
      path: "/review/wordbook/:categoryId",
      name: "review-wordbook",
      component: () => import("../views/ReviewView.vue"),
      props: true,
    },
    {
      path: "/wordbook",
      name: "word-book",
      component: () => import("../views/WordBookView.vue"),
    },
  ],
});

export default router;
