import s from './welcome.module.less'
import { FunctionalComponent } from 'vue'
import chart from '../../assets/icons/chart.svg'

export const Third: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <img src={chart} alt="" />
      <h2>数据可视化<br />收支一目了然</h2>
    </div>
  )
}

Third.displayName = 'Third'
