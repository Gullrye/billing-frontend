import { defineComponent, reactive } from 'vue'
import { Button } from '../../shared/Button'
import { Form, FormItem } from '../../shared/Form'
import { Rules, validate } from '../../shared/validate'
import s from './Tag.module.less'

export const TagForm = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: ''
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})

    const onSubmit = (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      const errs = validate(formData, rules)
      errors.name = errs.name
      errors.sign = errs.sign
      e.preventDefault()
    }
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem v-model={formData.name} type='text' label='标签名' error={errors['name']?.[0]}></FormItem>
        <FormItem v-model={formData.sign} type='emojiSelect' label={'符号 ' + formData.sign} error={errors['sign']?.[0]}></FormItem>
        <p class={s.tips}>记账时长按标签即可进行编辑</p>
        <Button class={s.button}>确定</Button>
      </Form>
    )
  }
})
