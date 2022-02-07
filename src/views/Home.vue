<template>
  <div class="home">
    <GameBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameBoard from '@/components/GameBoard.vue'

export default defineComponent({
  name: 'Home',
  components: { GameBoard }
})
</script>
