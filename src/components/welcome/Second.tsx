import s from './welcome.module.less'
import { FunctionalComponent } from 'vue'

export const Second: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <h2>每日提醒<br />不遗漏每一笔账单</h2>
    </div>
  )
}

Second.displayName = 'Second'