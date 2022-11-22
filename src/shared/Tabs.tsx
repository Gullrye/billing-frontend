import { defineComponent, PropType } from 'vue'
import s from './Tabs.module.less'

export const Tabs = defineComponent({
  props: {
    classPrefix: {
      type: String
    },
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
      const cp = props.classPrefix
      return <div class={[s.tabs, cp + '_tabs']}>
        <div class={[s.tabs_nav, cp + '_tabs_nav']}>
          {
            tabs.map((item) =>
              <div class={[s.tab, cp + '_tabs_nav_item', item.props?.name === props.selected ? [s.selected, cp + '_selected'] : '']} onClick={() => context.emit('update:selected', item.props?.name)}>
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
