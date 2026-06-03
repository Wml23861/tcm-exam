---
name: 内容体系 - 科目与题库
description: 14门中医考试科目、章节结构、题型、种子数据、图片来源等
type: project
---

# 内容体系

## 14门考试科目

| 代码 | 科目名称 | 类别 |
|------|----------|------|
| zhongji | 中医基础理论 | 中医 |
| zhenjuan | 中医诊断学 | 中医 |
| zhongyao | 中药学 | 中医 |
| fangji | 方剂学 | 中医 |
| zhongnei | 中医内科学 | 中医 |
| zhongwai | 中医外科学 | 中医 |
| zhongfu | 中医妇科学 | 中医 |
| zhonger | 中医儿科学 | 中医 |
| zhenjiu | 针灸学 | 中医 |
| neike | 内科学 | 西医 |
| zhenduan | 诊断学基础 | 西医 |
| chuanran | 传染病学 | 西医 |
| lunli | 医学伦理学 | 综合 |
| fagui | 卫生法规 | 综合 |

## 题型

- **A1型** (单句型最佳选择题): 单个问题，4-5个选项，选最佳答案
- **A2型** (病例摘要型最佳选择题): 基于病例描述，选最佳答案
- **B1型** (标准配伍题): 题组模式，多个子题共用一组选项

## 种子数据文件 (位于 tcm-exam-prep-server/seeds/)

| 文件 | 内容 |
|------|------|
| 001_subjects_structure.ts | 14科目 + ~106章节结构 |
| 002_sections_seed.ts | 小节详细内容 (最大，3237行) |
| 002b_knowledge_points_seed.ts | 初始知识点 |
| 003_questions_seed.ts | 初始试题 |
| 004_flashcards_seed.ts | 初始闪卡 |
| 005_questions_expanded_seed.ts | 扩展题库 |
| 006_flashcards_expanded_seed.ts | 扩展闪卡 |
| 006_questions_massive_seed.ts | 海量题库 |
| 007_sections_expanded_seed.ts | 扩展小节内容 |
| 008_questions_continuation.ts | 继续题库 |
| 009_yixue_content_seed.ts | 医学百科内容导入 |
| 010_yixue_questions_seed.ts | 医学百科试题 |
| 011_more_questions_seed.ts | 更多试题 |
| 012_more_flashcards_seed.ts | 更多闪卡 |
| 013_massive_content_seed.ts | 大规模内容扩展 |
| 014_classical_texts_seed.ts | 经典医籍 (内经/伤寒/金匮/温病/本经) |
| 015_massive_questions_seed.ts | 海量试题追加 |

## 内容来源

1. **公开考试资料**: 历年真题
2. **中医世家**: https://www.zysj.com.cn/guji/index.html (经典医籍)
3. **医学百科**: 医学百科知识整合
4. **真题PDF**: `资料/` 目录下 2020/2021/2022年三本真题

## 中药图片

- 存放位置: `tcm-exam-prep/public/images/herbs/药材名.jpg`
- 引用方式: 通过 `src/data/herbImages.ts` 中的辅助函数
- 已有图片: 冬虫夏草、土鳖虫、巴戟天、杜仲、沙苑子、海马、海龙、淫羊藿、王不留行、益智仁、穿山甲、紫河车、续断、肉苁蓉、自然铜、芡实、菟丝子、虻虫、蛤蚧、覆盆子、金樱子、锁阳、骨碎补 等

## 穴位图片

- 存放位置: `tcm-exam-prep/public/images/acupoints/穴位名.jpg`
- 同样通过 herbImages.ts 引用

## 经典医籍 (classical_texts)

- 黄帝内经 (Huangdi Neijing)
- 伤寒论 (Shanghai Lun)
- 金匮要略 (Jin Gui Yao Lue)
- 温病学 (Wen Bing Xue)
- 神农本草经 (Shen Nong Ben Cao Jing)
