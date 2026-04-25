const BASE = import.meta.env.VITE_WP_BASE_URL ?? '';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`请求失败 (${res.status})`);
  const json = await res.json();
  if (json.code !== 0) throw new Error(json.msg || '接口错误');
  return json.data;
}

export const getCategories = () => get('/wp/categories');
export const getChapters = (categoryId) => get(`/wp/chapters?categoryId=${categoryId}`);
export const getWords = (chapterId) => get(`/wp/words?chapterId=${chapterId}`);
