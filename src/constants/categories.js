/** `file` 对应 data/lists/<file>.json（仅词形列表）；全文在 data/lexicon.json */
export const CATEGORIES = [
  { id: "junior", title: "初中英语", file: "junior" },
  { id: "senior", title: "高中英语", file: "senior" },
  { id: "cet4", title: "CET4", file: "cet4" },
  { id: "cet6", title: "CET6", file: "cet6" },
  { id: "kaoyan", title: "考研", file: "kaoyan" },
  { id: "toefl", title: "托福", file: "toefl" },
  { id: "sat", title: "SAT", file: "sat" },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}
