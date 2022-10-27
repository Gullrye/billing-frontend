import { defineComponent, ref } from 'vue'

export const Bar = defineComponent({
  setup() {
    return () => (
      <>
        <button>Bar</button>
      </>
    )
  }
})
