import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import s from './ItemPage.module.less'

export const ItemPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <RouterView />
    )
  }
})
