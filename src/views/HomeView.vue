<script setup>
import { CATEGORIES } from "../constants/categories.js";
</script>

<template>
  <div class="page">
    <van-nav-bar title="拾词" fixed placeholder />
    <van-cell-group inset title="词库分类">
      <van-cell
        v-for="cat in CATEGORIES"
        :key="cat.id"
        :title="cat.title"
        is-link
        :to="{ name: 'word-list', params: { categoryId: cat.id } }"
      />
    </van-cell-group>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  padding-bottom: 24px;
}
</style>
