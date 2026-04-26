const BASE = import.meta.env.VITE_WP_BASE_URL ?? '';

const SSO_LOGIN = 'http://api.caojiantao.site:1024/login.html';

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`请求失败 (${res.status})`);
  const json = await res.json();
  if (json.code === -2) {
    // 未登录，跳转 SSO 登录页
    window.location.href = `${SSO_LOGIN}?redirectUrl=${encodeURIComponent(window.location.href)}`;
    return;
  }
  if (json.code !== 0) throw new Error(json.msg || '接口错误');
  return json.data;
}

const get = (path) => request('GET', path);
const post = (path, body) => request('POST', path, body);

export const getCategories = () => get('/wp/categories');
export const getChapters = (categoryId) => get(`/wp/chapters?categoryId=${categoryId}`);
export const getWords = (chapterId) => get(`/wp/words?chapterId=${chapterId}`);
export const saveMark = (wordId, state) => post('/wp/word/saveMark', { wordId, state });
export const listMark = (params = {}) => {
  const query = new URLSearchParams();
  if (params.categoryId != null) query.set('categoryId', params.categoryId);
  if (params.state != null) query.set('state', params.state);
  return get(`/wp/word/listMark?${query}`);
};
