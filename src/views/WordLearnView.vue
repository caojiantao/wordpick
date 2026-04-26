<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showFailToast } from "vant";
import { getWords } from "../services/wpApi.js";

const props = defineProps({
  chapterId: { type: String, required: true },
});

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const queue = ref([]);
const total = ref(0);
const knownCount = ref(0);
const revealed = ref(false);
const done = ref(false);
const lastKnown = ref(false);

const current = computed(() => queue.value[0]);
const progress = computed(() => `${knownCount.value + 1} / ${total.value}`);

async function load() {
  loading.value = true;
  try {
    const words = await getWords(props.chapterId);
    queue.value = [...words];
    total.value = words.length;
  } catch (e) {
    showFailToast(e.message || "加载失败");
  } finally {
    loading.value = false;
  }
}

load();

function judge(known) {
  lastKnown.value = known;
  revealed.value = true;
  if (!known) {
    queue.value.push(queue.value[0]);
  }
}

function next() {
  if (lastKnown.value) {
    knownCount.value++;
  }
  queue.value.shift();
  revealed.value = false;
  if (queue.value.length === 0) {
    done.value = true;
  }
}

function showPhone(s) {
  return typeof s === "string" && s.trim().length > 0;
}
</script>

<template>
  <div class="page">
    <van-nav-bar
      :title="loading || done ? (route.query.title || '') : progress"
      left-arrow
      fixed
      placeholder
      @click-left="router.back()"
    />

    <van-loading v-if="loading" vertical class="loading">加载中…</van-loading>
    <van-empty v-else-if="!total" description="暂无词条" />

    <template v-else-if="done">
      <div class="done">
        <van-icon name="success" size="64" color="var(--van-success-color)" />
        <p class="done-text">本章学完！</p>
        <van-button type="primary" @click="router.back()">返回章节</van-button>
      </div>
    </template>

    <template v-else>
      <div class="card">
        <div class="head">
          <h1 class="lemma">{{ current.word }}</h1>
          <p
            v-if="showPhone(current.phoneticUs) || showPhone(current.phoneticUk)"
            class="ipa-row"
          >
            <span v-if="showPhone(current.phoneticUs)" class="ipa-item">
              <span class="ipa-label">美</span>{{ current.phoneticUs }}
            </span>
            <span v-if="showPhone(current.phoneticUk)" class="ipa-item">
              <span class="ipa-label">英</span>{{ current.phoneticUk }}
            </span>
          </p>
        </div>

        <template v-if="revealed">
          <van-cell-group inset title="释义">
            <van-cell
              v-for="(s, i) in current.senses"
              :key="i"
              :title="`${s.pos} ${s.meaning}`"
            />
          </van-cell-group>
          <van-cell-group
            v-if="current.examples && current.examples.length"
            inset
            title="例句"
          >
            <van-cell
              v-for="(ex, i) in current.examples"
              :key="i"
              :title="ex.sentence"
              :label="ex.translation"
            />
          </van-cell-group>
        </template>
      </div>

      <div class="action-bar">
        <template v-if="!revealed">
          <van-button plain type="danger" @click="judge(false)">不认识</van-button>
          <van-button plain type="primary" @click="judge(true)">我认识</van-button>
        </template>
        <template v-else>
          <van-button type="primary" block @click="next">下一个</van-button>
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
.done {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.done-text {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.card {
  flex: 1;
  overflow-y: auto;
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
