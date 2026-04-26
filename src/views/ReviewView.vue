<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showFailToast, showToast } from "vant";
import { getWords, listMark, saveMark } from "../services/wpApi.js";

const props = defineProps({
  chapterId: { type: String, default: null },
  categoryId: { type: String, default: null },
});

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const wordList = ref([]);
const current = ref(0);
const revealed = ref(false);
const swipeRef = ref(null);

const navTitle = computed(() => {
  if (loading.value || !wordList.value.length) return route.query.title || "";
  return `${current.value + 1} / ${wordList.value.length}`;
});

const currentWord = computed(() => wordList.value[current.value]);

async function load() {
  loading.value = true;
  try {
    if (props.chapterId) {
      wordList.value = await getWords(props.chapterId);
    } else {
      // categoryId 为 0 表示全部类别
      const categoryId = Number(props.categoryId) || null;
      wordList.value = await listMark({ categoryId, state: 1 });
      current.value = Number(route.query.index) || 0;
    }
  } catch (e) {
    showFailToast(e.message || "加载失败");
  } finally {
    loading.value = false;
    if (current.value > 0) {
      swipeRef.value?.swipeTo(current.value, { immediate: true });
    }
  }
}

load();

function onSwipeChange(index) {
  current.value = index;
  revealed.value = false;
}

function showPhone(s) {
  return typeof s === "string" && s.trim().length > 0;
}

function mark(state) {
  saveMark(currentWord.value.id, state).catch(() => {});
  showToast(state === 1 ? "已加入生词本" : "太棒了！");
  const next = current.value + 1;
  if (next < wordList.value.length) {
    swipeRef.value?.swipeTo(next);
  }
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
    <template v-else>
      <van-swipe
        ref="swipeRef"
        :loop="false"
        :initial-swipe="current"
        class="swipe"
        @change="onSwipeChange"
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
            <template v-if="revealed">
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
            </template>
          </div>
        </van-swipe-item>
      </van-swipe>

      <!-- 底部操作区，固定不随卡片滑动 -->
      <div class="action-bar">
        <template v-if="!revealed">
          <van-button type="primary" block @click="revealed = true">显示答案</van-button>
        </template>
        <template v-else>
          <van-button plain type="danger" @click="mark(1)">不认识</van-button>
          <van-button plain type="primary" @click="mark(2)">认识</van-button>
        </template>
      </div>
    </template>
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
.action-bar {
  display: flex;
  justify-content: space-around;
  padding: 12px 32px;
  background: var(--van-background);
  border-top: 1px solid var(--van-border-color);
}
</style>
