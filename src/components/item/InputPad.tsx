import { defineComponent, ref } from 'vue'
import s from './InputPad.module.less'
import { Icon } from '../../shared/Icon'
import { time } from '../../shared/time'
import { DatetimePicker, Popup } from 'vant'

export const InputPad = defineComponent({
  setup: (props, context) => {
    const now = new Date()
    const currentDate = ref(now)
    const amount = ref('0')
    const appendText = (n: string) => {
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
    const buttons = [
      { text: '1', onClick: () => { appendText('1') } },
      { text: '2', onClick: () => { appendText('2') } },
      { text: '3', onClick: () => { appendText('3') } },
      { text: '4', onClick: () => { appendText('4') } },
      { text: '5', onClick: () => { appendText('5') } },
      { text: '6', onClick: () => { appendText('6') } },
      { text: '7', onClick: () => { appendText('7') } },
      { text: '8', onClick: () => { appendText('8') } },
      { text: '9', onClick: () => { appendText('9') } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText('0') } },
      { text: '清空', onClick: () => { amount.value = '0' } },
      { text: '提交', onClick: () => { } },
    ]
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
    return () => <>
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
          <button onClick={button.onClick}>{button.text}</button>
        )}
      </div>
    </>
  }
})
