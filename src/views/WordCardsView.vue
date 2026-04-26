<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showFailToast } from "vant";
import { getWords } from "../services/wpApi.js";

const props = defineProps({
  chapterId: { type: String, default: null },
  initialIndex: { type: Number, default: 0 },
});

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const wordList = ref([]);
const current = ref(props.initialIndex);
const swipeRef = ref(null);

const navTitle = computed(() => {
  if (loading.value || !wordList.value.length) return route.query.title || "";
  return `${current.value + 1} / ${wordList.value.length}`;
});

watch(
  () => props.chapterId,
  async (id) => {
    if (!id) return;
    loading.value = true;
    wordList.value = [];
    current.value = 0;
    try {
      wordList.value = await getWords(id);
    } catch (e) {
      showFailToast(e.message || "加载失败");
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);

function showPhone(s) {
  return typeof s === "string" && s.trim().length > 0;
}
</script>

<template>
  <div class="page">
    <van-nav-bar
      :title="navTitle"
      left-arrow
      fixed
      placeholder
      @click-left="router.back()"
    />
    <van-loading v-if="loading" vertical class="loading">加载中…</van-loading>
    <van-empty v-else-if="!wordList.length" description="暂无词条" />
    <van-swipe
      v-else
      ref="swipeRef"
      :loop="false"
      :initial-swipe="initialIndex"
      class="swipe"
      @change="current = $event"
    >
      <van-swipe-item v-for="word in wordList" :key="word.id" class="swipe-item">
        <div class="card">
          <div class="head">
            <h1 class="lemma">{{ word.word }}</h1>
            <p
              v-if="showPhone(word.phoneticUs) || showPhone(word.phoneticUk)"
              class="ipa-row"
            >
              <span v-if="showPhone(word.phoneticUs)" class="ipa-item">
                <span class="ipa-label">美</span>{{ word.phoneticUs }}
              </span>
              <span v-if="showPhone(word.phoneticUk)" class="ipa-item">
                <span class="ipa-label">英</span>{{ word.phoneticUk }}
              </span>
            </p>
          </div>
          <van-cell-group inset title="释义">
            <van-cell
              v-for="(s, i) in word.senses"
              :key="i"
              :title="`${s.pos} ${s.meaning}`"
            />
          </van-cell-group>
          <van-cell-group
            v-if="word.examples && word.examples.length"
            inset
            title="例句"
          >
            <van-cell
              v-for="(ex, i) in word.examples"
              :key="i"
              :title="ex.sentence"
              :label="ex.translation"
            />
          </van-cell-group>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.loading {
  padding: 48px 0;
}
.swipe {
  flex: 1;
  min-height: 0;
}
.swipe-item {
  height: 100%;
  overflow-y: auto;
}
.card {
  padding-bottom: 16px;
}
.head {
  padding: 24px 16px 8px;
}
.lemma {
  margin: 0 0 10px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}
.ipa-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin: 0;
  font-size: 0.95rem;
  color: var(--van-text-color-2);
  font-family: "Lucida Sans Unicode", "Arial Unicode MS", sans-serif;
}
.ipa-item {
  white-space: nowrap;
}
.ipa-label {
  display: inline-block;
  min-width: 1.25rem;
  margin-right: 6px;
  font-size: 0.75rem;
  color: var(--van-gray-6);
}
</style>
