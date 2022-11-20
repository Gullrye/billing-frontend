import { computed, defineComponent, PropType } from 'vue'
import { EmojiSelect } from './EmojiSelect'
import s from './Form.module.less'

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    error: {
      type: String
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect'>
    },
    placeholder: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input value={props.modelValue} onInput={(e: Event) => { context.emit('update:modelValue', (e.target as HTMLInputElement).value) }} class={[s.formItem, s.input, props.error ? s.error : '']} />
        case 'emojiSelect':
          return <EmojiSelect modelValue={props.modelValue?.toString()} onUpdateModelValue={(newValue) => context.emit('update:modelValue', newValue)} class={[s.formItem, s.emojiList, props.error ? s.error : '']} />
        default:
          return context.slots.default?.()
      }
    })
    return () => (
      <div class={s.formRow}>
        <label>
          {
            props.label &&
            <span>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    )
  }
})
