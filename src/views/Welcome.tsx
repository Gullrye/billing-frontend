import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import s from './Welcome.module.less'

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <h1>山竹记账</h1>
        </header>
        <main class={s.main}>
          <RouterView name='main'></RouterView>
        </main>
        <footer>
          <RouterView name='footer' />
        </footer>
      </div>
    )
  }
})
