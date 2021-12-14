<script lang="ts">
  import type Card from '$model/card';
  import Icon from '../game-icon.svelte';
  export let card: Card;
</script>

<div
  class="rpg-card-wrapper"
  style="--card-color: {card.color}; --card-text-size: {card.layout?.text_font_size ?? '10px'}"
>
  <div class="rpg-card">
    <div class="line">
      <div class="content-top">
        <div class="content">
          <p>{card.text_back ?? ''}</p>
        </div>
      </div>
      <div class="icon-wrapper">
        <Icon name={card.icon_back} size="5rem" />
      </div>
      <div class="content-bottom">
        <div class="content">
          <p>{card.text_back ?? ''}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  $border-width: 0.3cm;
  $border-radius: 0.25cm;

  .rpg-card-wrapper {
    width: 2.5in;
    height: 3.5in;
    background-color: var(--card-color);

    box-sizing: border-box;
    border: $border-width solid var(--card-color);
    border-radius: $border-radius;
    background-color: var(--card-color);
  }

  .rpg-card {
    height: 100%;
    border-radius: $border-radius;
    padding: 0.75em;
    /* background-color: white; */
    background: radial-gradient(ellipse at center, white 20%, var(--card-color) 120%);
  }

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--card-color);
    padding: 1em;
    border-radius: 1em;
  }

  .line {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    width: 100%;
    border: 0.25em solid var(--card-color);
    border-radius: $border-radius;
  }

  .icon {
    height: 5rem;
  }

  .content-top {
    display: flex;
    width: 100%;
    justify-content: end;
  }

  .content-bottom {
    display: flex;
    width: 100%;
    justify-content: start;
  }

  .content {
    /* width: 4em; */
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    p {
      margin: 0 0.75rem;
      padding: 0;
      font-size: 3em;
      font-weight: bold;
      color: var(--card-color);
      max-lines: 1;
    }
  }
</style>
