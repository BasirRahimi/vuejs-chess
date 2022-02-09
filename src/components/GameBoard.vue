<template>
  <div class="game-board">
    <div v-for="position in positions"
      :key="`space-${position.name}`"
      :style="{ 'background-color': position.colour }"
      class="space">
        <img v-if="positionHasPiece(position.name)"
        :src="require(`@/assets/chesspieces/${positionPieceImg(position.name)}`)"
        :alt="positionAlt(position.name)">
      </div>
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
  team: 'Light' | 'Dark',
  position: string,
  icon: string,
  status: 'Alive' | 'Dead'
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
            return '#098CCD'
          } else {
            return '#CFE8F4'
          }
        }

        positions.push({
          name: `${letter}${i}`,
          colour: colour()
        })
      })
    }

    // const chesspieces = '@/assets/chesspieces'

    const gamePieces:Array<Piece> = [
      {
        name: 'King',
        team: 'Light',
        position: 'E1',
        icon: 'King_light.svg',
        status: 'Alive'
      },
      {
        name: 'Queen',
        team: 'Light',
        position: 'D1',
        icon: 'Queen_light.svg',
        status: 'Alive'
      },
      {
        name: 'Bishop',
        team: 'Light',
        position: 'C1',
        icon: 'Bishop_light.svg',
        status: 'Alive'
      },
      {
        name: 'Bishop',
        team: 'Light',
        position: 'F1',
        icon: 'Bishop_light.svg',
        status: 'Alive'
      },
      {
        name: 'Knight',
        team: 'Light',
        position: 'B1',
        icon: 'Knight_light.svg',
        status: 'Alive'
      },
      {
        name: 'Knight',
        team: 'Light',
        position: 'G1',
        icon: 'Knight_light.svg',
        status: 'Alive'
      },
      {
        name: 'Rook',
        team: 'Light',
        position: 'A1',
        icon: 'Rook_light.svg',
        status: 'Alive'
      },
      {
        name: 'Rook',
        team: 'Light',
        position: 'H1',
        icon: 'Rook_light.svg',
        status: 'Alive'
      },
      {
        name: 'King',
        team: 'Dark',
        position: 'E8',
        icon: 'King_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Queen',
        team: 'Dark',
        position: 'D8',
        icon: 'Queen_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Bishop',
        team: 'Dark',
        position: 'C8',
        icon: 'Bishop_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Bishop',
        team: 'Dark',
        position: 'F8',
        icon: 'Bishop_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Knight',
        team: 'Dark',
        position: 'B8',
        icon: 'Knight_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Knight',
        team: 'Dark',
        position: 'G8',
        icon: 'Knight_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Rook',
        team: 'Dark',
        position: 'A8',
        icon: 'Rook_dark.svg',
        status: 'Alive'
      },
      {
        name: 'Rook',
        team: 'Dark',
        position: 'H8',
        icon: 'Rook_dark.svg',
        status: 'Alive'
      }
    ]

    for (let i = 0; i < 8; i++) {
      gamePieces.push({
        name: 'Pawn',
        team: 'Light',
        position: `${xAxis[i]}2`,
        icon: 'Pawn_light.svg',
        status: 'Alive'
      })
      gamePieces.push({
        name: 'Pawn',
        team: 'Dark',
        position: `${xAxis[i]}7`,
        icon: 'Pawn_dark.svg',
        status: 'Alive'
      })
    }

    const positionHasPiece = (position:string) => {
      const piece = gamePieces.find(x => x.position === position)
      return piece !== undefined
    }
    const positionPieceImg = (position:string) => {
      const piece = gamePieces.find(x => x.position === position)
      if (piece) {
        return piece.icon
      } else {
        return ''
      }
    }
    const positionAlt = (position:string) => {
      const piece = gamePieces.find(x => x.position === position)
      if (piece) {
        return `${piece.team}-${piece.name}`
      } else {
        return ''
      }
    }
    return { positions, gamePieces, positionHasPiece, positionPieceImg, positionAlt }
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
