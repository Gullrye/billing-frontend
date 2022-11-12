import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'

type Point = {
  x: number
  y: number
}


export const useSwipe = (element: Ref<HTMLElement | undefined>) => {
  const startPoint = ref<Point>()
  const endPoint = ref<Point>()
  let isSwiping = ref(false)

  const direction = computed(() => {
    if (!startPoint.value || !endPoint.value) return ''
    let distanceX = endPoint.value.x - startPoint.value.x
    let distanceY = endPoint.value.y - startPoint.value.y
    // 左移了，且距离大于 y 的移动，为向左滑动
    if(Math.abs(distanceX) > Math.abs(distanceY)) {
      return distanceX < 0 ? 'left' : 'right' 
    } else {
      return distanceY < 0 ? 'down' : 'up' 
    }
  })

  const onStart = (e: TouchEvent) => {
    isSwiping.value = true
    endPoint.value = startPoint.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
  }
  const onMove = (e: TouchEvent) => {
    endPoint.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
  }
  const onEnd = (e: TouchEvent) => {
    isSwiping.value = false
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
