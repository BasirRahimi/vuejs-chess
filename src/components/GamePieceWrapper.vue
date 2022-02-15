<template>
  <slot v-if="piece" :piece="piece"></slot>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Piece } from '@/game-objects'

export default defineComponent({
  name: 'GamePieceWrapper',
  props: {
    piece: Object as PropType<Piece>
  }
})
</script>
