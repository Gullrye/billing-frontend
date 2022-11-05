import s from './welcome.module.less'
import { FunctionalComponent } from 'vue'
import pig from '../../assets/icons/pig.svg'

export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <img src={pig} alt="" />
      <h2>会挣钱<br />还会省钱</h2>
    </div>
  )
}

First.displayName = 'First'
