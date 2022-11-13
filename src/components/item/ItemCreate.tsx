import { defineComponent } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'

import s from './ItemCreate.module.less'


export const ItemCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {
          {
            title: () => '记一笔',
            icon: () => <Icon name='left' class={s.navIcon}></Icon>,
            default: () => <>
              <div>2342</div>
            </>
          }
        }
      </MainLayout>
    )
  }
})
