<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
import { getCategoryById } from "../constants/categories.js";
import { loadWordKeysForCategory } from "../services/wordData.js";

const props = defineProps({
  categoryId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const loading = ref(true);
/** @type {import('vue').Ref<string[]>} */
const words = ref([]);
const pageTitle = ref("");

async function load() {
  loading.value = true;
  words.value = [];
  const cat = getCategoryById(props.categoryId);
  if (!cat) {
    showFailToast("未知分类");
    router.replace({ name: "home" });
    return;
  }
  pageTitle.value = cat.title;
  try {
    words.value = await loadWordKeysForCategory(cat.file);
  } catch (e) {
    console.error(e);
    showFailToast(String(e.message || "加载失败"));
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.categoryId,
  () => load(),
  { immediate: true }
);

function openWord(word) {
  router.push({
    name: "word-detail",
    params: { lemma: word },
  });
}
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
    <van-empty v-else-if="words.length === 0" description="暂无词条" />
    <van-cell-group v-else inset>
      <van-cell
        v-for="(w, idx) in words"
        :key="`${w}-${idx}`"
        :title="w"
        is-link
        @click="openWord(w)"
      />
    </van-cell-group>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
}
.loading {
  padding: 48px 0;
}
</style>
