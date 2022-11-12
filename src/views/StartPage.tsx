import { defineComponent } from 'vue'
import { Button } from '../shared/Button'
import { FloatButton } from '../shared/FloatButton'
import s from './StartPage.module.less'

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('cc')
    }
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>xxx</Button>
        </div>
        <FloatButton iconName='add' />
      </div>
    )
  }
})
