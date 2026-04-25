<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
import { getCategories } from "../services/wpApi.js";

const router = useRouter();
const loading = ref(true);
const categories = ref([]);

onMounted(async () => {
  try {
    categories.value = await getCategories();
  } catch (e) {
    showFailToast(e.message || "加载失败");
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page">
    <van-nav-bar title="拾词" fixed placeholder />
    <van-loading v-if="loading" vertical class="loading">加载中…</van-loading>
    <van-empty v-else-if="!categories.length" description="暂无分类" />
    <van-cell-group v-else inset title="词库分类">
      <van-cell
        v-for="cat in categories"
        :key="cat.id"
        :title="cat.name"
        is-link
        @click="router.push({ name: 'chapter-list', params: { categoryId: cat.id } })"
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
</style>
