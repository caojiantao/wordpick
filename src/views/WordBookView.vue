<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
import { getCategories, listMark } from "../services/wpApi.js";

const router = useRouter();
const loading = ref(true);
const categories = ref([]);
const selectedCategoryId = ref(null);
const words = ref([]);

onMounted(async () => {
  try {
    categories.value = await getCategories();
    await loadMark();
  } catch (e) {
    showFailToast(e.message || "加载失败");
  } finally {
    loading.value = false;
  }
});

async function loadMark() {
  loading.value = true;
  try {
    words.value = await listMark({
      categoryId: selectedCategoryId.value,
      state: 1,
    });
  } catch (e) {
    showFailToast(e.message || "加载失败");
  } finally {
    loading.value = false;
  }
}

async function onCategoryChange(id) {
  selectedCategoryId.value = id || null;
  await loadMark();
}

function toCards(index) {
  router.push({
    name: 'review-wordbook',
    params: { categoryId: selectedCategoryId.value || 0 },
    query: { index },
  });
}
</script>

<template>
  <div class="page">
    <van-nav-bar title="生词本" fixed placeholder />

    <!-- 类别筛选 -->
    <van-tabs v-model:active="selectedCategoryId" @change="onCategoryChange" shrink>
      <van-tab title="全部" :name="null" />
      <van-tab
        v-for="cat in categories"
        :key="cat.id"
        :title="cat.name"
        :name="cat.id"
      />
    </van-tabs>

    <van-loading v-if="loading" vertical class="loading">加载中…</van-loading>
    <van-empty v-else-if="!words.length" description="暂无生词" />
    <van-cell-group v-else inset>
      <van-cell
        v-for="(word, index) in words"
        :key="word.id"
        :title="word.word"
        is-link
        @click="toCards(index)"
      />
    </van-cell-group>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  padding-bottom: 60px;
}
.loading {
  padding: 48px 0;
}
</style>
