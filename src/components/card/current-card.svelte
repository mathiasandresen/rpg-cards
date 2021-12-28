<script lang="ts">
  import { settings } from '../../stores/settings';
  import { Button, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';
  import { currentCard, deck, pageLayout } from '../../stores';
  import CardBack from './card-back.svelte';
  import CardComponent from './card.svelte';

  $: card = $deck[$currentCard];
</script>

<div>
  <h4>Preview</h4>

  {#if card}
    <div class="zoom-input">
      <InputGroup>
        <InputGroupText class="p-0">
          <Button color="link" on:click={() => ($settings.previewZoom -= 10)}>
            <Icon name="zoom-out" />
          </Button>
        </InputGroupText>
        <Input type="number" bind:value={$settings.previewZoom} />
        <InputGroupText>%</InputGroupText>
        <InputGroupText class="p-0">
          <Button color="link" on:click={() => ($settings.previewZoom += 10)}>
            <Icon name="zoom-in" />
          </Button>
        </InputGroupText>
      </InputGroup>
    </div>

    <div class="current-card">
      <div
        style="
          width: {$pageLayout.cardSize.width * ($settings.previewZoom / 100)}mm;
          height: {$pageLayout.cardSize.height * ($settings.previewZoom / 100)}mm;
        "
      >
        <div style="transform: scale({$settings.previewZoom / 100}); transform-origin: top left;">
          <CardComponent {card} />
        </div>
      </div>
      <div
        style="
          width: {$pageLayout.cardSize.width * ($settings.previewZoom / 100)}mm;
          height: {$pageLayout.cardSize.height * ($settings.previewZoom / 100)}mm;
        "
      >
        <div style="transform: scale({$settings.previewZoom / 100}); transform-origin: top left;">
          <CardBack {card} />
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .zoom-input {
    margin-bottom: 1em;
    width: 13em;
    // :global(.input-group-text > button) {
    //   & {
    //     padding: 0;
    //   }
    // }
  }

  .current-card {
    display: flex;
    gap: 0.5em;
    flex-direction: column;
  }
</style>
