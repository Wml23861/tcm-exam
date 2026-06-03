import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { flashcardRepo } from '@/db/repositories/flashcardRepo'
import { studyRepo } from '@/db/repositories/studyRepo'
import { calculateNextReview } from '@/utils/sm2'
import { generateId } from '@/utils/id-generator'
import type { Flashcard, ReviewSchedule } from '@/types'

export const useFlashcardStore = defineStore('flashcard', () => {
  const flashcards = ref<Flashcard[]>([])
  const currentDeck = ref<Flashcard[]>([])
  const currentIndex = ref(0)
  const isFlipped = ref(false)
  const isLoading = ref(false)
  const todayStats = ref({ reviewed: 0, total: 0 })

  const currentCard = computed<Flashcard | null>(() =>
    currentDeck.value[currentIndex.value] ?? null,
  )

  const deckProgress = computed(() => ({
    current: Math.min(currentIndex.value + 1, currentDeck.value.length),
    total: currentDeck.value.length,
  }))

  const isDeckComplete = computed(() => currentIndex.value >= currentDeck.value.length)

  async function loadFlashcards(subjectId?: string): Promise<void> {
    isLoading.value = true
    try {
      if (subjectId) {
        flashcards.value = await flashcardRepo.findBySubject(subjectId)
      } else {
        flashcards.value = await flashcardRepo.findAll()
      }
    } finally {
      isLoading.value = false
    }
  }

  async function startReview(subjectId?: string): Promise<void> {
    await loadFlashcards(subjectId)

    // Get due review items for the target subject or all subjects
    const dueSchedules = subjectId
      ? await studyRepo.getDueReviewsBySubject(subjectId)
      : await studyRepo.getDueReviews()

    const flashcardSchedules = dueSchedules.filter(
      (s) => s.itemType === 'flashcard',
    )
    const dueCardIds = new Set(flashcardSchedules.map((s) => s.itemId))
    const dueCards = flashcards.value.filter((c) => dueCardIds.has(c.id))

    // If fewer due cards than target, add new cards to fill the deck
    if (dueCards.length < 20) {
      const remaining = flashcards.value.filter((c) => !dueCardIds.has(c.id))
      const newCards = remaining.slice(0, 20 - dueCards.length)
      currentDeck.value = [...dueCards, ...newCards]
    } else {
      currentDeck.value = dueCards
    }

    currentIndex.value = 0
    isFlipped.value = false
  }

  async function rateCard(quality: number): Promise<void> {
    const card = currentCard.value
    if (!card) return

    const existing = await studyRepo.getSchedule('flashcard', card.id)
    const input = {
      quality,
      repetitions: existing?.repetitions ?? 0,
      easinessFactor: existing?.easinessFactor ?? 2.5,
      interval: existing?.interval ?? 0,
    }
    const result = calculateNextReview(input)

    const schedule: ReviewSchedule = {
      id: existing?.id ?? generateId('rev_'),
      itemType: 'flashcard',
      itemId: card.id,
      subjectId: card.subjectId,
      easinessFactor: result.easinessFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReviewDate: result.nextReviewDate,
      lastReviewDate: Date.now(),
      lastQuality: quality,
    }
    await studyRepo.upsertSchedule(schedule)

    todayStats.value.reviewed++
    nextCard()
  }

  function flipCard(): void {
    isFlipped.value = !isFlipped.value
  }

  function nextCard(): void {
    if (currentIndex.value < currentDeck.value.length - 1) {
      isFlipped.value = false
      currentIndex.value++
    }
  }

  function prevCard(): void {
    if (currentIndex.value > 0) {
      isFlipped.value = false
      currentIndex.value--
    }
  }

  function goToCard(index: number): void {
    if (index >= 0 && index < currentDeck.value.length) {
      isFlipped.value = false
      currentIndex.value = index
    }
  }

  async function loadTodayStats(): Promise<void> {
    const due = await studyRepo.getDueReviews()
    const flashcardDue = due.filter((s) => s.itemType === 'flashcard')
    todayStats.value = { reviewed: 0, total: flashcardDue.length }
  }

  return {
    flashcards,
    currentDeck,
    currentIndex,
    isFlipped,
    isLoading,
    todayStats,
    currentCard,
    deckProgress,
    isDeckComplete,
    loadFlashcards,
    startReview,
    rateCard,
    flipCard,
    nextCard,
    prevCard,
    goToCard,
    loadTodayStats,
  }
})
