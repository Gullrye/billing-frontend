import { defineComponent, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { InputPad } from './InputPad'

import s from './ItemCreate.module.less'

export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const kind = ref('支出')
    return () => (
      <MainLayout>
        {
          {
            title: () => '记一笔',
            icon: () => <Icon name='left' class={s.navIcon}></Icon>,
            default: () => <>
              <Tabs v-model:active={kind.value}>
                <Tab name='支出'>列表1</Tab>
                <Tab name='收入'>列表2</Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </>
          }
        }
      </MainLayout>
    )
  }
})
