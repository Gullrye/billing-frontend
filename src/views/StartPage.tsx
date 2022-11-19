import { defineComponent, ref } from 'vue'
import { Button } from '../shared/Button'
import { FloatButton } from '../shared/FloatButton'
import s from './StartPage.module.less'
import { Overlay } from '../shared/Overlay'
import { Icon } from '../shared/Icon'
import { MainLayout } from '../layouts/MainLayout'
import { Center } from '../shared/Center'
import { RouterLink } from 'vue-router'

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClick = () => {
    }
    const onClickMenu = () => {
      overlayVisible.value = true
    }
    return () => (
      <MainLayout>
        {
          {
            title: () => '山竹记账',
            icon: () => <Icon class={s.navIcon} name='menu' onClick={onClickMenu}></Icon>,
            default: () => (
              <>
                <Center class={s.pig_wrapper}>
                  <Icon name='pig' class={s.pig}></Icon>
                </Center>
                <div class={s.button_wrapper}>
                  <RouterLink to='./items/create'>
                    <Button class={s.button} onClick={onClick}>开始记账</Button>
                  </RouterLink>
                </div>
                <RouterLink to='./items/create'>
                  <FloatButton iconName='add' />
                </RouterLink>
                <Overlay onClose={() => overlayVisible.value = false} visible={overlayVisible.value} />
              </>
            )
          }
        }
      </MainLayout>
    )
  }
})
