import { defineComponent, ref } from 'vue'
import { Button } from '../shared/Button'
import { FloatButton } from '../shared/FloatButton'
import s from './StartPage.module.less'
import { NavBar } from '../shared/NavBar'
import { Overlay } from '../shared/Overlay'
import { Icon } from '../shared/Icon'

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClick = () => {
      console.log('cc')
    }
    const onClickMenu = () => {
      overlayVisible.value = true
    }
    return () => (
      <div>
        <NavBar>{
          {
            default: () => '山竹记账',
            icon: () => <Icon class={s.navIcon} name='menu' onClick={onClickMenu}></Icon>
          }
        }</NavBar>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>xxx</Button>
        </div>
        <FloatButton iconName='add' />
        <Overlay onClose={() => overlayVisible.value = false} visible={overlayVisible.value} />
      </div>
    )
  }
})
