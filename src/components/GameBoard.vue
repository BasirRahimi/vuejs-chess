<template>
  <div class="info">
    <div class="player">Player 2</div>
    <div class="captured">
      <div v-for="capture in captured('Light')" :key="capture.piece.name">
        <GamePiece :piece="capture.piece" />
        <span v-if="capture.count > 1">x{{ capture.count }}</span>
      </div>
    </div>
  </div>
  <div class="game-board">

    <div class="y-axis">
      <div v-for="y in game.ranks" :key="y">{{y}}</div>
    </div>

    <div class="spaces">
      <div v-for="position in game.positions"
        :key="`pos-${position.name}`"
        class="space"
        :class="[position.colour, position.highlight ? 'highlight' : '']"
        @click="positionClicked(position)"
      >
        <GamePiece v-if="position.gamePiece" :piece="position.gamePiece" />

      </div>
    </div>

    <div class="x-axis">
      <div v-for="x in game.files" :key="x">{{x}}</div>
    </div>

  </div>
  <div class="info">
    <div class="player">Player 1</div>
    <div class="captured">
      <div v-for="capture in captured('Dark')" :key="capture.piece.name">
        <GamePiece :piece="capture.piece" />
        <span v-if="capture.count > 1">x{{ capture.count }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Game, Position, Piece } from '@/game-objects'
import GamePiece from './GamePiece.vue'

export default defineComponent({
  name: 'GameBoard',
  components: { GamePiece },
  setup() {
    const game = ref(new Game())

    const positionClicked = (pos:Position) => {
      if (pos.highlight) {
        game.value.movePiece(pos)
        game.value.clearHighlights()
        game.value.activePlayer = game.value.activePlayer === 1 ? 2 : 1
      } else if (pos.gamePiece) {
        if ((pos.gamePiece.team === 'Light' && game.value.activePlayer === 2) ||
        (pos.gamePiece.team === 'Dark' && game.value.activePlayer === 1)) {
          return
        }
        game.value.clearHighlights()
        game.value.activePos = pos
        game.value.highLightValidMoves(pos)
      }
    }

    const captured = (team:string) => {
      const captured:Array<{piece: Piece, count: number}> = []
      game.value.pieces.filter(x => x.status === 'Dead' && x.team === team).forEach(x => {
        const capturedPiece = captured.find(y => y.piece.name === x.name)
        if (capturedPiece) {
          capturedPiece.count++
        } else {
          captured.push({ piece: x, count: 1 })
        }
      })
      return captured
    }

    return {
      game,
      positionClicked,
      GamePiece,
      captured
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
.info {
  border: 1px solid black;
  width: 420px;
  margin: 1rem auto;
  position: relative;
  box-sizing: border-box;
  padding-top: 26px;
  height: 82px;
}
.info .player {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #111111;
  color: #eeeeee;
  padding: 4px;
}
.captured {
  display: flex;
  justify-content: center;
}
</style>
