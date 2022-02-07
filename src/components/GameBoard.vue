<template>
  <div class="game-board">
    <div v-for="position in positions"
      :key="position.name"
      :style="{ 'background-color': position.colour }"
      class="space"
      :data-position="position.name"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Position = {
  name: string,
  colour: string
}

export default defineComponent({
  setup() {
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const positions:Array<Position> = []

    for (let i = 8; i > 0; i--) {
      xAxis.forEach((letter, j) => {
        const evenLetter = (j + 1) % 2 === 0
        const evenNumber = i % 2 === 0

        const colour = () => {
          if ((evenLetter && !evenNumber) || (!evenLetter && evenNumber)) {
            return '#111111'
          } else {
            return '#eeeeee'
          }
        }

        positions.push({
          name: `${j}${letter}`,
          colour: colour()
        })
      })
    }

    return { positions }
  }
})
</script>

<style lang="scss" scoped>
.game-board {
  border: 1px solid black;
  width: calc(8 * 50px);
  height: calc(8 * 50px);
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.space {
  width: 50px;
  height: 50px;
}
</style>
