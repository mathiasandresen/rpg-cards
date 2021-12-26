<script lang="ts">
  import type { CardContent } from '$model/card';

  export let content: CardContent;

  $: height = Number.parseFloat(content.content) || undefined;
</script>

<div class="fill" class:flex={height === undefined} style="height: {height}mm" />

<style lang="scss">
  .fill {
    &.flex {
      flex: 1;
    }
  }
</style>
