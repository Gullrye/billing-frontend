import { defineComponent, onBeforeUnmount, ref } from 'vue'
import s from './InputPad.module.less'
import { Icon } from '../../shared/Icon'
import { time } from '../../shared/time'
import { DatetimePicker, Popup } from 'vant'

export const InputPad = defineComponent({
  setup: (props, context) => {
    const now = new Date()
    const currentDate = ref(now)
    const amount = ref('0')
    const timer = ref<number | undefined>(undefined)

    const currentKey = ref('')
    const appendText = (n: string) => {
      currentKey.value = n
      if(n === '清空') {
        amount.value = '0'
        return
      } else if(n === '提交') {
        return
      } else if(n === '删除') {
        amount.value = amount.value.slice(0, -1)
        !amount.value && (amount.value = '0')
        return
      }
      const dotIndex = amount.value.indexOf('.')
      if (amount.value.length >= 13) {
        return
      }
      // 最多两位小数
      if (dotIndex >= 0 && amount.value.length - dotIndex > 2) {
        return
      }
      if (amount.value === '0' && n !== '.') {
        amount.value = n
        return
      } else if (dotIndex >= 0 && n === '.') {
        return
      } else {
        amount.value += n
      }
    }
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '清空', '删除', '提交',]
    const pickerVisible = ref(false)
    const showDatePicker = () => {
      pickerVisible.value = true
    }
    const hideDatePicker = () => {
      pickerVisible.value = false
    }
    const setDate = (date: Date) => {
      currentDate.value = date
      hideDatePicker()
    }
    onBeforeUnmount(() => {
      timer.value && clearTimeout(timer.value)
    })
    return () => {
      if (currentKey.value) {
        timer.value = setTimeout(() => {
          currentKey.value = ''
        }, 300)
      }
      return <>
        <div class={s.dateAndAmount}>
          <span class={s.date} onClick={showDatePicker}>
            <Icon name="date" class={s.icon} />
            <span>{time(currentDate.value).format()}</span>
          </span>
          <Popup position='bottom' v-model:show={pickerVisible.value}>
            <DatetimePicker value={currentDate.value} type="date" title="选择年月日" onConfirm={setDate} onCancel={hideDatePicker}
              min-date={new Date(2022, 0, 1)}
            />
          </Popup>
          <span class={s.amount}>{amount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(button =>
            <button onClick={()=>appendText(button)} class={currentKey.value === button ? s.active_bg : ''}>{button}</button>
          )}
        </div>
      </>
    }
  }
})
