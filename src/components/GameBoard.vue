<template>
  <div class="game-board">

    <div class="y-axis">
      <div v-for="y in game.ranks" :key="y">{{y}}</div>
    </div>

    <div class="spaces">
      <div v-for="position in game.positions"
        :key="`space-${position.name}`"
        class="space"
        :class="[position.colour, position.highlight ? 'highlight' : '']"
      >
        <GamePiece v-if="game.pieces.find(x => x.position === position.name)"
          :piece="game.pieces.find(x => x.position === position.name)"
          @piece-clicked="pieceClicked"
        />

      </div>
    </div>

    <div class="x-axis">
      <div v-for="x in game.files" :key="x">{{x}}</div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { Game, Piece } from '@/game-objects'
import GamePiece from './GamePiece.vue'

export default defineComponent({
  name: 'GameBoard',
  components: { GamePiece },
  setup() {
    const game = ref(new Game())

    const pieceClicked = (piece:Piece) => {
      if ((piece.team === 'Light' && game.value.activePlayer === 2) ||
      ((piece.team === 'Dark' && game.value.activePlayer === 1))) {
        // clicked on enemy piece, abort
        return
      }

      game.value.clearHighlights()
      game.value.highLightValidMoves(piece)
      console.log('pieceClicked')
      console.log(game.value)
    }

    return {
      game,
      pieceClicked,
      GamePiece
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
