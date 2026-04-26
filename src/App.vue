<template>
  <router-view />
  <van-tabbar v-if="showTabbar" v-model="activeTab" @change="onTabChange">
    <van-tabbar-item name="home" icon="wap-home-o">词库</van-tabbar-item>
    <van-tabbar-item name="word-book" icon="records-o">生词本</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const tabbarRoutes = ["home", "word-book"];

const showTabbar = computed(() => tabbarRoutes.includes(route.name));

const activeTab = ref(route.name);

watch(
  () => route.name,
  (name) => {
    if (tabbarRoutes.includes(name)) activeTab.value = name;
  }
);

function onTabChange(name) {
  router.push({ name });
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

body {
  background: var(--van-background);
  font-family:
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    sans-serif;
}
</style>
