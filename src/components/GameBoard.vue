<template>
  <div class="game-board">

    <div class="y-axis">
      <div v-for="y in 8" :key="y">{{y}}</div>
    </div>

    <div class="spaces">
      <div v-for="position in positions"
        :key="`space-${position.name}`"
        :style="{ 'background-color': position.colour }"
        class="space"
      >

        <img v-if="positionHasPiece(position.name)"
        :src="require(`@/assets/chesspieces/${positionPieceImg(position.name)}`)"
        :alt="positionAlt(position.name)"
        @click="clickPiece(position.name)">

      </div>
    </div>

    <div class="x-axis">
      <div v-for="x in xAxis" :key="x">{{x}}</div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    const positions = ref<Array<Position>>([])

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

        positions.value.push({
          name: `${letter}${i}`,
          colour: colour()
        })
      })
    }

    // const chesspieces = '@/assets/chesspieces'

    const gamePieces = ref<Array<Piece>>([
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
    ])

    for (let i = 0; i < 8; i++) {
      gamePieces.value.push({
        name: 'Pawn',
        team: 'Light',
        position: `${xAxis[i]}2`,
        icon: 'Pawn_light.svg',
        status: 'Alive'
      })
      gamePieces.value.push({
        name: 'Pawn',
        team: 'Dark',
        position: `${xAxis[i]}7`,
        icon: 'Pawn_dark.svg',
        status: 'Alive'
      })
    }

    const positionHasPiece = (position:string) => {
      const piece = gamePieces.value.find(x => x.position === position)
      if (piece) {
        return piece
      } else {
        return false
      }
    }
    const positionPieceImg = (position:string) => {
      const piece = positionHasPiece(position)
      if (piece) {
        return piece.icon
      } else {
        return ''
      }
    }
    const positionAlt = (position:string) => {
      const piece = positionHasPiece(position)
      if (piece) {
        return `${piece.team}-${piece.name}`
      } else {
        return ''
      }
    }

    const highlightSpaces = (piece: Piece) => {
      if (piece.name === 'Pawn') {
        if (piece.team === 'Light') {
          const position = positions.value.find(x => x.name === `${piece.position[0]}${parseInt(piece.position[1]) + 1}`)
          if (position) {
            position.colour = '#FFA500'
          }
        } else {
          const position = positions.value.find(x => x.name === `${piece.position[0]}${parseInt(piece.position[1]) - 1}`)
          if (position) {
            position.colour = '#FFA500'
          }
        }
      }
    }

    const clickPiece = (position:string) => {
      const piece = positionHasPiece(position)
      if (!piece) return

      highlightSpaces(piece)
    }

    return {
      positions,
      gamePieces,
      xAxis,
      positionHasPiece,
      positionPieceImg,
      positionAlt,
      clickPiece
    }
  }
})
</script>

<style lang="scss" scoped>
.game-board {
  background-color: #111111;
  border: 1px solid black;
  margin: auto;
  width: 420px;
  height: 420px;
  position: relative;
}
.spaces {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 400px;
  margin-left: auto;
}
.space {
  width: 50px;
  height: 50px;
}
.x-axis,
.y-axis {
  display: flex;
  color: #cccccc;
  position: absolute;
}
.x-axis {
  flex-direction: row;
  height: 20px;
  line-height: 22px;
  bottom: 0;
  right: 0;
}
.y-axis {
  flex-direction: column-reverse;
  width: 20px;
  top: 0;
  left: 0;
}
.x-axis div {
  width: 50px;
}
.y-axis div {
  height: 50px;
  line-height: 50px;
}
</style>
