<template>
  <img :src="piece.img"
  :alt="piece.imgAlt" />
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Piece } from '@/game-objects'

export default defineComponent({
  name: 'GamePiece',
  props: {
    piece: Object as PropType<Piece>
  }
})
</script>
