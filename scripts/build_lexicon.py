#!/usr/bin/env python3
"""
从「按类别全量词条」JSON 生成规范化数据：
  - data/lexicon.json   词形 -> 全量词条（底表；同一词形首次出现优先写入）
  - data/lists/<id>.json 仅词形数组，顺序与源文件一致

源文件（执行前放在 data/ 根目录）：junior.json … sat.json（数组，元素为完整词条对象）。

完成后删除上述 7 个源文件，避免与 lexicon/lists 重复。
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
LISTS = DATA / "lists"

# 与 src/constants/categories.js 顺序一致；源文件名 = id + .json
CATEGORIES = [
    "junior",
    "senior",
    "cet4",
    "cet6",
    "kaoyan",
    "toefl",
    "sat",
]


def main() -> int:
    lexicon: dict[str, dict] = {}
    list_orders: dict[str, list[str]] = {c: [] for c in CATEGORIES}

    for cat in CATEGORIES:
        src = DATA / f"{cat}.json"
        if not src.is_file():
            print(f"跳过（缺少源文件）：{src}", file=sys.stderr)
            continue
        with open(src, encoding="utf-8") as f:
            rows = json.load(f)
        if not isinstance(rows, list):
            print(f"跳过（非数组）：{src}", file=sys.stderr)
            continue
        for entry in rows:
            if not isinstance(entry, dict):
                continue
            w = str(entry.get("word", "")).strip()
            if not w:
                continue
            list_orders[cat].append(w)
            if w not in lexicon:
                lexicon[w] = dict(entry)

    if not lexicon:
        print("错误：未生成任何词条，请确认 data/*.json 源文件存在。", file=sys.stderr)
        return 1

    LISTS.mkdir(parents=True, exist_ok=True)
    for cat in CATEGORIES:
        out = LISTS / f"{cat}.json"
        with open(out, "w", encoding="utf-8") as f:
            json.dump(list_orders[cat], f, ensure_ascii=False, indent=2)
        print(f"写入 {out}（{len(list_orders[cat])} 词）", file=sys.stderr)

    lex_path = DATA / "lexicon.json"
    with open(lex_path, "w", encoding="utf-8") as f:
        json.dump(lexicon, f, ensure_ascii=False, indent=2)
    print(f"写入 {lex_path}（去重词形 {len(lexicon)}）", file=sys.stderr)

    for cat in CATEGORIES:
        legacy = DATA / f"{cat}.json"
        if legacy.is_file():
            legacy.unlink()
            print(f"已删除旧文件：{legacy.name}", file=sys.stderr)

    print("完成。", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
