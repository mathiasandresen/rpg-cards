<script lang="ts">
  import split from 'just-split';
  import CardBack from '../components/card-back.svelte';
  import Card from '../components/card.svelte';
  import { deck } from '../stores';

  // sizes in mm
  const pageWidth = 210;
  const pageHeight = 297;
  const cardWidth = 63.5; //  2.5 inches
  const cardHeight = 88.9; // 3.5 inches

  const calculateCardsPerPages = (): number => {
    const cols = Math.floor(pageWidth / cardWidth);
    const rows = Math.floor(pageHeight / cardHeight);
    return cols * rows;
  };

  const cardsPerPages = calculateCardsPerPages();
  const cardGroups = split($deck, cardsPerPages);
</script>

<div class="wrapper">
  {#each cardGroups as cardGroup}
    <div class="paper">
      {#each cardGroup as card}
        <div class="card-slot">
          <Card {card} />
        </div>
      {/each}
    </div>
    <div class="paper backside">
      {#each cardGroup as card}
        <div class="card-slot">
          <CardBack {card} />
        </div>
      {/each}
    </div>
    <div style="break-after:page" />
  {/each}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .paper {
    display: grid;
    grid-template-columns: repeat(auto-fill, 2.5in);
    grid-template-rows: repeat(auto-fill, 3.5in);

    gap: 2mm;
    padding: 0.5cm;

    width: 210mm;
    height: 297mm;

    &.backside {
      direction: rtl;
    }
  }

  .card-slot {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
