import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'

export const App = defineComponent({
  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value += 1
    }
    return () => (
      <>
        <ul>
          <li>
            <router-link to='/'>Foo</router-link>
          </li>
          <li>
            <router-link to='/bar'>Bar</router-link>
          </li>
        </ul>
        <router-view />
      </>
    )
  }
})
