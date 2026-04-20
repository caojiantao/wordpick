<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
import { getWordEntry } from "../services/wordData.js";

const props = defineProps({
  lemma: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const loading = ref(true);
const entry = ref(null);
const pageTitle = ref("词条");

const decodedLemma = computed(() => {
  const raw = props.lemma ?? "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
});

async function resolveEntry() {
  loading.value = true;
  entry.value = null;
  const lemma = decodedLemma.value;
  try {
    const found = await getWordEntry(lemma);
    entry.value = found || null;
    pageTitle.value = found ? found.word : "未找到";
  } catch (e) {
    console.error(e);
    showFailToast(String(e.message || "加载失败"));
    entry.value = null;
    pageTitle.value = "未找到";
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.lemma,
  () => resolveEntry(),
  { immediate: true }
);

function onBack() {
  if (window.history.state?.back) {
    router.back();
  }
}

function showPhone(s) {
  return typeof s === "string" && s.trim().length > 0;
}

/** 释义单行：词性 + 义项（词典列表样式，如 n. 事故；意外） */
function senseLine(s) {
  const pos = typeof s.pos === "string" ? s.pos.trim() : "";
  const meaning =
    typeof s.meaning === "string" ? s.meaning.trim() : "";
  if (pos && meaning) return `${pos} ${meaning}`;
  return meaning || pos || "";
}
</script>

<template>
  <div class="page">
    <van-nav-bar
      :title="pageTitle"
      left-arrow
      fixed
      placeholder
      @click-left="onBack"
    />
    <van-loading v-if="loading" vertical class="loading">加载中…</van-loading>
    <template v-else-if="entry">
      <div class="head">
        <h1 class="lemma">{{ entry.word }}</h1>
        <p
          v-if="showPhone(entry.phonetics?.us) || showPhone(entry.phonetics?.uk)"
          class="ipa-row"
        >
          <span v-if="showPhone(entry.phonetics?.us)" class="ipa-item">
            <span class="ipa-label">美</span>{{ entry.phonetics.us }}
          </span>
          <span v-if="showPhone(entry.phonetics?.uk)" class="ipa-item">
            <span class="ipa-label">英</span>{{ entry.phonetics.uk }}
          </span>
        </p>
      </div>
      <van-cell-group inset title="释义">
        <van-cell
          v-for="(s, i) in entry.senses"
          :key="i"
          :title="senseLine(s)"
        />
      </van-cell-group>
    </template>
    <van-empty v-else description="没有找到该词条" />
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  padding-bottom: 32px;
}
.loading {
  padding: 48px 0;
}
.head {
  padding: 16px 16px 8px;
}
.lemma {
  margin: 0 0 12px;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
}
.ipa-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 14px;
  margin: 6px 0;
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
