import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { subjectRepo } from '@/db/repositories/subjectRepo'
import type { Subject, Chapter, Section, KnowledgePoint } from '@/types'

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref<Subject[]>([])
  const currentSubject = ref<Subject | null>(null)
  const chapters = ref<Chapter[]>([])
  const currentChapter = ref<Chapter | null>(null)
  const sections = ref<Section[]>([])
  const currentSection = ref<Section | null>(null)
  const knowledgePoints = ref<KnowledgePoint[]>([])
  const isLoading = ref(false)

  const subjectCount = computed(() => subjects.value.length)
  const currentSubjectChapters = computed(() =>
    chapters.value.filter(c => c.subjectId === currentSubject.value?.id)
  )

  async function loadSubjects() {
    subjects.value = await subjectRepo.findAll()
  }

  async function loadSubjectDetail(subjectId: string) {
    isLoading.value = true
    try {
      currentSubject.value = await subjectRepo.findById(subjectId) ?? null
      if (currentSubject.value) {
        chapters.value = await subjectRepo.getChapters(subjectId)
      }
    } finally {
      isLoading.value = false
    }
  }

  async function loadChapterContent(chapterId: string) {
    isLoading.value = true
    try {
      sections.value = await subjectRepo.getSections(chapterId)
      currentChapter.value = chapters.value.find(c => c.id === chapterId) ?? null
    } finally {
      isLoading.value = false
    }
  }

  async function loadKnowledgePoints(filter: {
    subjectId?: string; chapterId?: string; sectionId?: string
  }) {
    knowledgePoints.value = await subjectRepo.getKnowledgePoints(filter)
  }

  async function loadSectionContent(sectionId: string) {
    const section = await subjectRepo.getSection(sectionId)
    currentSection.value = section ?? null
    if (section) {
      await loadKnowledgePoints({ sectionId })
    }
  }

  return {
    subjects, currentSubject, chapters, currentChapter,
    sections, currentSection, knowledgePoints, isLoading,
    subjectCount, currentSubjectChapters,
    loadSubjects, loadSubjectDetail, loadChapterContent,
    loadSectionContent, loadKnowledgePoints,
  }
})
