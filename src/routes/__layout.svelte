<script lang="ts">
  import { Styles } from 'sveltestrap';
</script>

<svelte:head>
  <title>RPG Card Generator</title>
  <html lang="en" />
</svelte:head>

<Styles />

<slot />

<style lang="scss">
  @font-face {
    font-family: 'Draconis';
    font-style: normal;
    src: url('/fonts/draconis-font/Draconis.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Draconis';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/draconis-font/DraconisBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Draconis';
    font-style: italic;
    font-weight: 700;
    src: url('/fonts/draconis-font/DraconisBoldItalic.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Draconis';
    font-style: italic;
    src: url('/fonts/draconis-font/DraconisItalic.ttf') format('truetype');
  }
</style>
