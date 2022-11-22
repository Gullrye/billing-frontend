import { defineComponent, PropType, ref, Transition } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from './Icon'
import s from './Overlay.module.less'

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  setup: (props, context) => {
    const closeOverlay = () => {
      props.onClose?.()
    }
    const onClickSignIn = () => { }
    return () => (
      <div class={s.page}>
        {props.visible && <div class={s.mask} onClick={closeOverlay}></div>}
        <Transition name='default-fade'>
          {
            props.visible &&
            <div class={s.overlay}>
              <section class={s.currentUser} onClick={onClickSignIn}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </section>
              <nav>
                <ul class={s.action_list}>
                  <li>
                    <RouterLink to="/statistics" class={s.action}>
                      <Icon name="charts" class={s.icon} />
                      <span>统计图表</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/export" class={s.action}>
                      <Icon name="export" class={s.icon} />
                      <span>导出数据</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/notify" class={s.action}>
                      <Icon name="notify" class={s.icon} />
                      <span>记账提醒</span>
                    </RouterLink>
                  </li>
                </ul>
              </nav>
            </div>
          }
        </Transition>
      </div>
    )
  }
})

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = true
    }
    return () => <>
      <Icon name="menu" class={s.icon} onClick={onClickMenu} />
      <Overlay visible={refOverlayVisible.value} onClose={() => refOverlayVisible.value = false} />
    </>

  }
})
