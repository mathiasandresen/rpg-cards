<script lang="ts">
  import split from 'just-split';
  import CardBack from '../components/card/card-back.svelte';
  import Card from '../components/card/card.svelte';
  import { deck, pageLayout } from '../stores';

  // sizes in mm
  const cardWidth = 63.5; //  2.5 inches
  const cardWidthWithBorder = cardWidth + ($pageLayout.cardBackBorder || 0) * 2;
  const cardHeight = 88.9; // 3.5 inches
  const cardHeightWithBorder = cardHeight + ($pageLayout.cardBackBorder || 0) * 2;

  const calculateCardsPerPages = (): number => {
    const cols = Math.floor($pageLayout.paperSize.width / cardWidth);
    const rows = Math.floor($pageLayout.paperSize.height / cardHeight);
    return cols * rows;
  };

  const cardsPerPages = calculateCardsPerPages();
  const cardGroups = split($deck, cardsPerPages);
</script>

<div
  id="output"
  class="wrapper"
  style="
    --page-width: {$pageLayout.paperSize.width}mm; 
    --page-height: {$pageLayout.paperSize.height}mm;
    --back-border-width: {$pageLayout.cardBackBorder || 0}mm;
    --card-width: {cardWidth}mm;
    --card-height: {cardHeight}mm;
  "
>
  {#each cardGroups as cardGroup}
    <div class="paper">
      {#each cardGroup as card}
        <div
          style={`--card-color: ${card.color};`}
          class="card-slot"
          class:with-border={$pageLayout.cardBackBorder > 0}
        >
          <Card {card} />
        </div>
      {/each}
    </div>
    <div
      class="paper backside"
      style="--adjust-x: {$pageLayout.adjust.x || 0}mm; --adjust-y: {$pageLayout.adjust.y || 0}mm;"
    >
      {#each cardGroup as card}
        <div
          style={`--card-color: ${card.color};`}
          class="card-slot backside"
          class:with-border={$pageLayout.cardBackBorder > 0}
        >
          <CardBack {card} />
        </div>
      {/each}
    </div>
    <div style="break-after:page" />
  {/each}
</div>

<style lang="scss">
  $paper-padding: 0.5cm;

  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .paper {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      calc(var(--card-width) + var(--back-border-width) * 2)
    );
    grid-template-rows: repeat(auto-fill, calc(var(--card-height) + var(--back-border-width) * 2));

    gap: 2mm;

    padding: $paper-padding;

    width: var(--page-width);
    height: var(--page-height);

    @media screen {
      border: 2px solid gray;
      margin: 1em;
    }

    &.backside {
      direction: rtl;
      padding-right: calc(0.5cm - var(--adjust-x));
      padding-top: calc(0.5cm - var(--adjust-y));

      * {
        direction: ltr;
      }
    }
  }

  .card-slot {
    height: calc(var(--card-height) + (var(--back-border-width) * 2));
    width: calc(var(--card-width) + (var(--back-border-width) * 2));

    display: flex;
    justify-content: center;
    align-items: center;

    &.backside.with-border {
      background-color: var(--card-color);
    }
  }
</style>
