import { defineComponent, ref } from 'vue'

export const Foo = defineComponent({
  setup() {
    return () => (
      <>
        <button>Foo</button>
      </>
    )
  }
})
