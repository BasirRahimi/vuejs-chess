<template>
  <div class="game-board">

    <div class="y-axis">
      <div v-for="y in yAxis" :key="y">{{y}}</div>
    </div>

    <div class="spaces">
      <div v-for="position in positions"
        :key="`space-${position.name}`"
        class="space"
        :class="[position.colour, position.highlight ? 'highlight' : '']"
        @click="clickSpace(position)"
      >

        <img v-if="position.gamePiece"
        :src="position.gamePiece.img"
        :alt="position.gamePiece.imgAlt">

      </div>
    </div>

    <div class="x-axis">
      <div v-for="x in xAxis" :key="x">{{x}}</div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { getPositions, getValidMoves, xAxis, yAxis, Position } from '@/game-objects'

export default defineComponent({
  setup() {
    const positions = ref(getPositions())
    const whosTurn = ref('Light')
    const activePosition:Ref<Position | undefined> = ref()

    const highlightSpaces = (validMoves: Array<Position>) => {
      validMoves.forEach(move => {
        const position = positions.value.find(y => y.name === move.name)
        if (position) {
          position.highlight = true
        }
      })
    }

    const clearHighlights = () => {
      positions.value.forEach(position => {
        position.highlight = false
      })
    }

    const switchTurns = () => {
      whosTurn.value = whosTurn.value === 'Light' ? 'Dark' : 'Light'
    }

    const clickSpace = (clickedPosition:Position) => {
      if (clickedPosition.highlight) {
        // Complete the move
        if (activePosition.value && activePosition.value.gamePiece) {
          clickedPosition.gamePiece = activePosition.value.gamePiece
          activePosition.value.gamePiece = undefined
          clickedPosition.gamePiece.status = 'Moved'
          clearHighlights()
          switchTurns()
        }
      } else if (clickedPosition.gamePiece && clickedPosition.gamePiece.team === whosTurn.value) {
        // Highlight spaces
        clearHighlights()
        const validMoves = getValidMoves(clickedPosition)
        highlightSpaces(validMoves)
        activePosition.value = clickedPosition
      } else {
        // Clear the highlights
        clearHighlights()
      }
    }

    return {
      positions,
      xAxis,
      yAxis,
      clickSpace
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
.space.dark {
  background-color: #098CCD;
}
.space.light {
  background-color: #CFE8F4;
}
.space.dark.highlight {
  background: radial-gradient(#FFA500, #098CCD);;
}
.space.light.highlight {
  background: radial-gradient(#FFA500, #CFE8F4);;
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
  flex-direction: column;
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
