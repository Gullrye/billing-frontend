import { DatetimePicker, Popup } from 'vant'
import { computed, defineComponent, PropType, ref } from 'vue'
import { Button } from './Button'
import { EmojiSelect } from './EmojiSelect'
import s from './Form.module.less'
import { Time } from './time'

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
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'select' | 'validationCode'>
    },
    placeholder: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
    options: {
      type: Array as PropType<Array<{ value: string, text: string }>>
    }
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input value={props.modelValue} onInput={(e: Event) => { context.emit('update:modelValue', (e.target as HTMLInputElement).value) }} class={[s.formItem, s.input, props.error ? s.error : '']} placeholder={props.placeholder} />
        case 'emojiSelect':
          return <EmojiSelect modelValue={props.modelValue?.toString()} onUpdateModelValue={(newValue) => context.emit('update:modelValue', newValue)} class={[s.formItem, s.emojiList, props.error ? s.error : '']} />
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue}
              placeholder={props.placeholder}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker value={props.modelValue} type="date" title="???????????????"
                onConfirm={(date: Date) => {
                  context.emit('update:modelValue', new Time(date).format())
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup></>
        case 'select':
          return <select class={[s.formItem, s.select]} value={props.modelValue}
            onChange={(e: any) => { context.emit('update:modelValue', e.target.value) }}>
            {props.options?.map(option =>
              <option value={option.value}>{option.text}</option>
            )}
          </select>
        case 'validationCode':
          return <>
            <input value={props.modelValue} onInput={(e: Event) => { context.emit('update:modelValue', (e.target as HTMLInputElement).value) }} class={[s.formItem, s.input, s.validationCodeInput]}
              placeholder={props.placeholder} />
            <Button class={[s.formItem, s.button, s.validationCodeButton]}>
              ???????????????
            </Button>
          </>
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
            <span>{props.error ?? '???'}</span>
          </div>
        </label>
      </div>
    )
  }
})
