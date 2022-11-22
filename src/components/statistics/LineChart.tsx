import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import s from './LineChart.module.less'

export const LineChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>()
    onMounted(() => {
      if (refDiv.value === undefined) return
      let myChart = echarts.init(refDiv.value);
      myChart.setOption({
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      })
    })
    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    )
  }
})
