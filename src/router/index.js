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
      path: "/learn/:chapterId",
      name: "word-learn",
      component: () => import("../views/WordLearnView.vue"),
      props: true,
    },
  ],
});

export default router;
