<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
import { getCategories, getChapters } from "../services/wpApi.js";

const props = defineProps({
  categoryId: { type: String, required: true },
});

const router = useRouter();
const loading = ref(true);
const chapters = ref([]);
const pageTitle = ref("章节");

watch(
  () => props.categoryId,
  async (id) => {
    loading.value = true;
    chapters.value = [];
    try {
      const [cats, chs] = await Promise.all([getCategories(), getChapters(id)]);
      const cat = cats.find((c) => String(c.id) === String(id));
      pageTitle.value = cat ? cat.name : "章节";
      chapters.value = chs;
    } catch (e) {
      showFailToast(e.message || "加载失败");
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="page">
    <van-nav-bar
      :title="pageTitle"
      left-arrow
      fixed
      placeholder
      @click-left="router.push({ name: 'home' })"
    />
    <van-loading v-if="loading" vertical class="loading">加载中…</van-loading>
    <van-empty v-else-if="!chapters.length" description="暂无章节" />
    <van-cell-group v-else class="list">
      <van-cell
        v-for="ch in chapters"
        :key="ch.id"
        :title="ch.name"
        is-link
        @click="router.push({ name: 'word-learn', params: { chapterId: ch.id }, query: { title: ch.name } })"
      />
    </van-cell-group>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  padding-bottom: 24px;
}
.loading {
  padding: 48px 0;
}
.list {
  margin-top: 0;
}
</style>
