/**
 * AI 中医老师服务
 * 代理转发到 AI API（支持 DeepSeek / OpenAI 兼容接口）
 */
import { config } from '../config/env.js'

const AI_SYSTEM_PROMPT = `你是一位经验丰富的中医老师，名字叫"岐黄先生"。
你的角色定位：
- 像一位慈祥而严谨的老中医，耐心解答学生的问题
- 用通俗易懂但专业准确的语言讲解中医知识
- 引经据典，适当引用《内经》《伤寒论》《金匮要略》等经典
- 对比分析时用表格展示差异
- 重点内容用醒目标记
- 回答结构清晰，先给结论再展开分析

你的知识范围：
- 中医基础理论、中医诊断学、中药学、方剂学
- 针灸学、中医内科学、中医外科学、中医妇科学、中医儿科学
- 中医经典著作（内经、伤寒、金匮、温病）
- 中医执业医师考试相关知识

回答规则：
- 回答精准，不出错
- 涉及考试重点时特别标注"【考点】"
- 方剂给出组成、功效、主治
- 中药给出生性味、归经、功效
- 对比类问题用表格
- 适当加入记忆口诀`

export const aiService = {
  async chat(message: string, history: { role: string; content: string }[]): Promise<string> {
    const apiKey = config.AI_API_KEY
    const apiUrl = config.AI_API_URL || 'https://api.deepseek.com/v1/chat/completions'
    const model = config.AI_MODEL || 'deepseek-chat'

    if (!apiKey) {
      return 'AI 老师尚未配置。请在服务器 .env 文件中设置 AI_API_KEY。\n\n获取免费 API Key：https://platform.deepseek.com'
    }

    const messages = [
      { role: 'system', content: AI_SYSTEM_PROMPT },
      ...history.slice(-20), // 最近20轮对话
      { role: 'user', content: message },
    ]

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    })

    if (!res.ok) {
      const err = await res.text().catch(() => '')
      throw new Error(`AI API error: ${res.status} ${err}`)
    }

    const data = await res.json() as { choices: { message: { content: string } }[] }
    return data.choices[0]?.message?.content || 'AI 未返回有效回答'
  },
}
