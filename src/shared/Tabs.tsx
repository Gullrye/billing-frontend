import { defineComponent, PropType } from 'vue'
import s from './Tabs.module.less'

export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
      required: false
    }
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    return () => {
      const tabs = context.slots.default?.()
      if (!tabs) return () => null
      tabs.forEach((item) => {
        if (item.type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children')
        }
      })

      return <div class={s.tabs}>
        <div class={s.tabs_nav}>
          {
            tabs.map((item) =>
              <div class={[s.tab, item.props?.name === props.selected ? s.selected : '']} onClick={() => context.emit('update:selected', item.props?.name)}>
                {item.props?.name}
              </div>
            )
          }
        </div>
        <div>
          {tabs.find((item) => item.props?.name === props.selected)}
        </div>
      </div>
    }
  }
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup: (props, context) => {
    return () => (
      <div>{context.slots.default?.()}</div>
    )
  }
})
