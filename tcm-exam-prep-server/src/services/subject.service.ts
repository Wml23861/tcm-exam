import { getDb } from '../config/database.js'
import { parseJson } from '../utils/sqlite-json.js'

interface SubjectRow {
  id: string
  name: string
  short_name: string
  icon: string
  description: string
  exam_weight: number
  total_chapters: number
  total_questions: number
  color: string
  sort_order: number
}

interface ChapterRow {
  id: string
  subject_id: string
  title: string
  description: string
  sort_order: number
  section_count: number
  knowledge_point_count: number
}

interface SectionRow {
  id: string
  chapter_id: string
  subject_id: string
  title: string
  sort_order: number
  content: string
  estimated_study_time: number
}

interface KnowledgePointRow {
  id: string
  section_id: string
  chapter_id: string
  subject_id: string
  title: string
  content: string
  difficulty: string
  tags_json: string
  related_question_ids_json: string
  related_flashcard_ids_json: string
  sort_order: number
  is_key_point: number
  is_difficult_point: number
  frequency_level: number
  is_predicted: number
}

function mapSubject(row: SubjectRow) {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    icon: row.icon,
    description: row.description,
    examWeight: row.exam_weight,
    totalChapters: row.total_chapters,
    totalQuestions: row.total_questions,
    color: row.color,
    order: row.sort_order,
  }
}

function mapChapter(row: ChapterRow) {
  return {
    id: row.id,
    subjectId: row.subject_id,
    title: row.title,
    description: row.description,
    order: row.sort_order,
    sectionCount: row.section_count,
    knowledgePointCount: row.knowledge_point_count,
  }
}

function mapSection(row: SectionRow) {
  return {
    id: row.id,
    chapterId: row.chapter_id,
    subjectId: row.subject_id,
    title: row.title,
    order: row.sort_order,
    content: row.content,
    estimatedStudyTime: row.estimated_study_time,
  }
}

function mapKnowledgePoint(row: KnowledgePointRow) {
  return {
    id: row.id,
    sectionId: row.section_id,
    chapterId: row.chapter_id,
    subjectId: row.subject_id,
    title: row.title,
    content: row.content,
    difficulty: row.difficulty,
    tags: parseJson<{ type: string; label: string; description?: string }[]>(row.tags_json, []),
    relatedQuestionIds: parseJson<string[]>(row.related_question_ids_json, []),
    relatedFlashcardIds: parseJson<string[]>(row.related_flashcard_ids_json, []),
    order: row.sort_order,
    isKeyPoint: row.is_key_point === 1,
    isDifficultPoint: row.is_difficult_point === 1,
    frequencyLevel: row.frequency_level,
    isPredicted: row.is_predicted === 1,
  }
}

export const subjectService = {
  async findAll() {
    const db = getDb()
    const rows = await db<SubjectRow>('subjects').select('*').orderBy('sort_order', 'asc')
    return rows.map(mapSubject)
  },

  async findById(id: string) {
    const db = getDb()
    const row = await db<SubjectRow>('subjects').where({ id }).first()
    return row ? mapSubject(row) : undefined
  },

  async getChapters(subjectId: string) {
    const db = getDb()
    const rows = await db<ChapterRow>('chapters')
      .where({ subject_id: subjectId })
      .orderBy('sort_order', 'asc')
    return rows.map(mapChapter)
  },

  async getChapter(subjectId: string, chapterId: string) {
    const db = getDb()
    const row = await db<ChapterRow>('chapters')
      .where({ id: chapterId, subject_id: subjectId })
      .first()
    return row ? mapChapter(row) : undefined
  },

  async getSections(chapterId: string) {
    const db = getDb()
    const rows = await db<SectionRow>('sections')
      .where({ chapter_id: chapterId })
      .orderBy('sort_order', 'asc')
    return rows.map(mapSection)
  },

  async getSection(sectionId: string) {
    const db = getDb()
    const row = await db<SectionRow>('sections').where({ id: sectionId }).first()
    return row ? mapSection(row) : undefined
  },

  async getKnowledgePoints(filter: {
    subjectId?: string
    chapterId?: string
    sectionId?: string
  }) {
    const db = getDb()
    let query = db<KnowledgePointRow>('knowledge_points')

    if (filter.sectionId) {
      query = query.where({ section_id: filter.sectionId })
    } else if (filter.chapterId) {
      query = query.where({ chapter_id: filter.chapterId })
    } else if (filter.subjectId) {
      query = query.where({ subject_id: filter.subjectId })
    }

    const rows = await query.orderBy('sort_order', 'asc')
    return rows.map(mapKnowledgePoint)
  },

  async getKnowledgePoint(id: string) {
    const db = getDb()
    const row = await db<KnowledgePointRow>('knowledge_points').where({ id }).first()
    return row ? mapKnowledgePoint(row) : undefined
  },

  async getAllKnowledgePoints() {
    const db = getDb()
    const rows = await db<KnowledgePointRow>('knowledge_points').select('*')
    return rows.map(mapKnowledgePoint)
  },

  async countBySubject(subjectId: string) {
    const db = getDb()
    const result = await db('knowledge_points')
      .where({ subject_id: subjectId })
      .count('* as count')
      .first()
    return (result as { count: number }).count
  },
}
