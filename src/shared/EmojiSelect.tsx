import { computed, defineComponent, ref } from 'vue'
import { emojiList } from './emojiList'
import s from './EmojiSelect.module.less'

export const EmojiSelect = defineComponent({
  props: {
    modelValue: {
      type: String
    }
  },
  setup: (props, context) => {
    const refSelected = ref(0)
    const table: [string, string[]][] = [
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['科学', ['science']],
      ['食物', [
        'food-fruit'
      ]],
      ['运动', ['sport']],
    ]
    const onClickTab = (index: number) => {
      refSelected.value = index
    }
    const onClickEmoji = (emoji: string) => {
      console.log('%c [ emoji ]-38', 'font-size:13px; background:#6639a6; color:#aa7dea;', emoji+'')
      context.emit('update:modelValue', emoji)
    }
    const emojis = computed(() => {
      const selectedItem = table[refSelected.value][1]
      return selectedItem.map(category => emojiList.find(item => item[0] === category)?.[1].map((item) => <li onClick={() => onClickEmoji(item)} class={item === props.modelValue ? s.selectedEmoji : ''}>{item}</li>))
    })
    return () => (
      <div class={s.emojiList}>
        <nav>
          {table.map((item, index) =>
            <span onClick={() => onClickTab(index)} class={index === refSelected.value ? s.selected : ''}>{item[0]}</span>
          )}
        </nav>
        <ol>
          {emojis.value}
        </ol>
      </div>
    )
  }
})
