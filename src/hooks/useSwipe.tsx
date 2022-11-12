import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'

type Point = {
  x: number
  y: number
}

interface Options {
  beforeStart?: (e: TouchEvent) => void
  afterStart?: (e: TouchEvent) => void
  beforeMove?: (e: TouchEvent) => void
  afterMove?: (e: TouchEvent) => void
  beforeEnd?: (e: TouchEvent) => void
  afterEnd?: (e: TouchEvent) => void

  wrapperRef: Ref<HTMLElement | undefined>
}

export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
  const startPoint = ref<Point>()
  const endPoint = ref<Point>()
  let isSwiping = ref(false)

  const direction = computed(() => {
    if (!startPoint.value || !endPoint.value) return ''
    let distanceX = endPoint.value.x - startPoint.value.x
    let distanceY = endPoint.value.y - startPoint.value.y
    // 向左滑动：左移，且距离大于 y 的移动
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      let flag = true
      let pageWidth = options?.wrapperRef.value?.clientWidth
      if(!pageWidth || (pageWidth && Math.abs(distanceX) >= pageWidth / 6)) {
        flag = true
      } else {
        flag = false
      }
      return distanceX < 0 && flag ? 'left' : 'right'
    } else {
      return distanceY < 0 ? 'down' : 'up'
    }
  })

  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e)
    isSwiping.value = true
    endPoint.value = startPoint.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    options?.afterStart?.(e)
  }
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e)
    endPoint.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    options?.afterMove?.(e)
  }
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e)
    isSwiping.value = false
    options?.afterEnd?.(e)
  }

  onMounted(() => {
    if (!element.value) return
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) return
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })

  return {
    isSwiping,
    direction
  }
}
