import { onMounted, onUnmounted, type Ref } from 'vue'

export interface SwipeOptions { threshold?: number; onSwipeLeft?: () => void; onSwipeRight?: () => void; onSwipeUp?: () => void; onSwipeDown?: () => void }

export function useSwipe(el: Ref<HTMLElement | null>, options: SwipeOptions) {
  const { threshold = 50 } = options; let sx = 0, sy = 0, tracking = false

  function ts(e: TouchEvent) { if (e.touches.length !== 1) return; sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true }
  function te(e: TouchEvent) { if (!tracking) return; tracking = false; const dx = e.changedTouches[0].clientX - sx; const dy = e.changedTouches[0].clientY - sy
    if (Math.abs(dx) > Math.abs(dy)) { if (Math.abs(dx) < threshold) return; if (dx > 0) options.onSwipeRight?.(); else options.onSwipeLeft?.() }
    else { if (Math.abs(dy) < threshold) return; if (dy > 0) options.onSwipeDown?.(); else options.onSwipeUp?.() }
  }

  onMounted(() => { const d = el.value; if (!d) return; d.addEventListener('touchstart', ts, {passive:true}); d.addEventListener('touchend', te, {passive:true}) })
  onUnmounted(() => { const d = el.value; if (!d) return; d.removeEventListener('touchstart', ts); d.removeEventListener('touchend', te) })
}
