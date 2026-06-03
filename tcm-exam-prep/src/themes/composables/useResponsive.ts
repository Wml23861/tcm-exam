import { ref, onMounted, onUnmounted } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export function useResponsive() {
  const breakpoint = ref<Breakpoint>('xs'); const isMobile = ref(true); const isDesktop = ref(false)

  function detect() {
    const w = window.innerWidth
    if (w >= 1920) { breakpoint.value = '2xl'; isDesktop.value = true }
    else if (w >= 1440) { breakpoint.value = 'xl'; isDesktop.value = true }
    else if (w >= 1024) { breakpoint.value = 'lg'; isDesktop.value = false }
    else if (w >= 768) { breakpoint.value = 'md' }
    else if (w >= 480) { breakpoint.value = 'sm' }
    else { breakpoint.value = 'xs' }
    isMobile.value = breakpoint.value === 'xs' || breakpoint.value === 'sm'
  }

  let timer: ReturnType<typeof setTimeout> | null = null
  function onResize() { if (timer) clearTimeout(timer); timer = setTimeout(detect, 100) }

  onMounted(() => { detect(); window.addEventListener('resize', onResize) })
  onUnmounted(() => { window.removeEventListener('resize', onResize); if (timer) clearTimeout(timer) })

  return { breakpoint, isMobile, isDesktop }
}
