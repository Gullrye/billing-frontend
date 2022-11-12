import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import { useSwipe } from '../hooks/useSwipe'
import { throttle } from '../shared/throttle'
import s from './Welcome.module.less'

export const Welcome = defineComponent({
  setup: (props, context) => {
    const pushMap: Record<string, string> = {
      'Welcome1': '/welcome/2',
      'Welcome2': '/welcome/3',
      'Welcome3': '/welcome/4',
      'Welcome4': '/start',
    }
    const mainRef = ref<HTMLElement>()
    const wrapperRef = ref<HTMLElement>()

    /**
     * @desc 
     * beforeStart: e => e.preventDefault() 滑动 main 元素时，阻止浏览器页面（即 main 元素的背景页面）的滑动
     * useSwipe 内有 onMounted 监听 touch 事件，传入 wrapperRef 在 useSwipe 内获取 wrapperRef 的宽度，即页面宽度 pageWidth，若滑动距离大于 1/6 pageWidth，则滑动。
     * 在 Welcome.tsx 文件写 onMounted 并在该生命周期内 useSwipe()，则 useSwipe 里的 onMounted 不执行，监听不到 touch 事件，故不传入页面宽度，而是传入页面元素。
     */
    const { isSwiping, direction } = useSwipe(mainRef, { beforeStart: e => e.preventDefault(), wrapperRef })
    const router = useRouter()
    const route = useRoute()
    const changeRouter = throttle(() => {
      let key = (route.name || 'Welcome1').toString()
      router.push(pushMap[key])
    }, 500)
    watchEffect(() => {
      if (isSwiping.value && direction.value === 'left') {
        changeRouter()
      }
    })
    return () => (
      <div class={s.wrapper} ref={wrapperRef}>
        <header>
          <svg>
            <use xlinkHref='#mangosteen'></use>
          </svg>
          <h1>山竹记账</h1>
        </header>
        <main class={s.main} ref={mainRef}>
          {/* 在 RouterView 的类型里查看 slots 的类型 */}
          <RouterView name='main'>
            {
              ({ Component: C, route }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                <Transition enterFromClass={s.slide_fade_enter_from} enterActiveClass={s.slide_fade_enter_active} leaveActiveClass={s.slide_fade_leave_active}
                  leaveToClass={s.slide_fade_leave_to}>{C}</Transition>
            }
          </RouterView>
        </main>
        <footer>
          <RouterView name='footer' />
        </footer>
      </div>
    )
  }
})
