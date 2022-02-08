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

type Piece = {
  name: 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn',
  team: 'light' | 'dark',
  position: string
}

export default defineComponent({
  setup() {
    const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
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
          name: `${letter}${i}`,
          colour: colour()
        })
      })
    }

    const lights:Array<Piece> = [
      {
        name: 'King',
        team: 'light',
        position: 'E1'
      },
      {
        name: 'Queen',
        team: 'light',
        position: 'D1'
      },
      {
        name: 'Bishop',
        team: 'light',
        position: 'C1'
      },
      {
        name: 'Bishop',
        team: 'light',
        position: 'F1'
      },
      {
        name: 'Knight',
        team: 'light',
        position: 'B1'
      },
      {
        name: 'Knight',
        team: 'light',
        position: 'G1'
      },
      {
        name: 'Rook',
        team: 'light',
        position: 'A1'
      },
      {
        name: 'Rook',
        team: 'light',
        position: 'H1'
      }
    ]

    for (let i = 0; i < 7; i++) {
      lights.push({
        name: 'Pawn',
        team: 'light',
        position: `${xAxis[i]}2`
      })
    }

    const darks:Array<Piece> = [
      {
        name: 'King',
        team: 'dark',
        position: 'E8'
      },
      {
        name: 'Queen',
        team: 'dark',
        position: 'D8'
      },
      {
        name: 'Bishop',
        team: 'dark',
        position: 'C8'
      },
      {
        name: 'Bishop',
        team: 'dark',
        position: 'F8'
      },
      {
        name: 'Knight',
        team: 'dark',
        position: 'B8'
      },
      {
        name: 'Knight',
        team: 'dark',
        position: 'G8'
      },
      {
        name: 'Rook',
        team: 'dark',
        position: 'A8'
      },
      {
        name: 'Rook',
        team: 'dark',
        position: 'H8'
      }
    ]

    for (let i = 0; i < 7; i++) {
      darks.push({
        name: 'Pawn',
        team: 'dark',
        position: `${xAxis[i]}7`
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
