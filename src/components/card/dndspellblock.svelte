<script lang="ts">
  import { SPLIT_REGEX } from '$lib/constants';
  import type { CardContent } from '$model/card';

  export let content: CardContent;

  $: [castingTime, range, components, duration] = content.content.split(SPLIT_REGEX);
</script>

<div class="wrapper">
  <div class="block">
    <h2>Casting time</h2>
    <p>{castingTime}</p>
  </div>
  <div class="block">
    <h2>Range</h2>
    <p>{range}</p>
  </div>
  <div class="block">
    <h2>Components</h2>
    <p>{components}</p>
  </div>
  <div class="block">
    <h2>Duration</h2>
    <p>{duration}</p>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--card-color);
    grid-gap: 1px;
    margin-top: -0.2em;
  }

  .block {
    background-color: white;

    p,
    h2 {
      text-align: center;
      margin: 0;
      font-size: 1em;
    }

    h2 {
      font-size: 1.1em;
      text-transform: uppercase;
      font-weight: bold;
      color: var(--card-color);
      font-family: Draconis;
    }
  }
</style>
