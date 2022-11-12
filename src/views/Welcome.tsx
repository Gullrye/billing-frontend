import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecordName, RouterView, useRoute, useRouter } from 'vue-router'
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
    const { isSwiping, direction } = useSwipe(mainRef)
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
      <div class={s.wrapper}>
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
