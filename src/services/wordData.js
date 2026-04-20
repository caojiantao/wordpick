/** @typedef {{ word: string, phonetics: { us: string, uk: string }, senses: { pos: string, meaning: string }[] }} WordEntry */

let lexiconPromise = null;

/** @returns {Promise<Record<string, WordEntry>>} */
export async function loadLexicon() {
  if (!lexiconPromise) {
    const url = `${import.meta.env.BASE_URL}data/lexicon.json`;
    lexiconPromise = fetch(url).then(async (res) => {
      if (!res.ok) throw new Error(`加载 lexicon 失败 (${res.status})`);
      return res.json();
    });
  }
  return lexiconPromise;
}

const listKeysCache = new Map();

/** 类别对应的词形列表（仅字符串数组） */
export async function loadWordKeysForCategory(listBase) {
  if (listKeysCache.has(listBase)) {
    return listKeysCache.get(listBase);
  }
  const url = `${import.meta.env.BASE_URL}data/lists/${listBase}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`加载词表列表失败：lists/${listBase}.json (${res.status})`);
  }
  /** @type {string[]} */
  const keys = await res.json();
  listKeysCache.set(listBase, keys);
  return keys;
}

/**
 * 从底表取词条全文
 * @param {string} lemma 与 lexicon 键一致
 */
export async function getWordEntry(lemma) {
  const lex = await loadLexicon();
  return lex[lemma] ?? null;
}

export function clearWordCaches() {
  lexiconPromise = null;
  listKeysCache.clear();
}
