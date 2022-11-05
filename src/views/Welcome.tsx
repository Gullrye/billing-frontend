import { defineComponent, Transition, VNode } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import s from './Welcome.module.less'
import mangosteen from '../assets/icons/mangosteen.svg'

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={mangosteen} alt="" />
          <h1>山竹记账</h1>
        </header>
        <main class={s.main}>
          {/* RouterView 的类型里查看 slots 的类型 */}
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
