<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import {
    Accordion,
    AccordionItem,
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Icon,
    Input,
    Label,
    Row
  } from 'sveltestrap';
  import { parseCards } from '../lib/card-json-parser';
  import type Card from '../model/card';
  import { currentCard, deck } from '../stores';
  import Deck from './deck.svelte';

  let importFileSelector: HTMLInputElement;
  let importFiles: FileList;

  const addCardsToDeck = (cards: Card[]) => {
    const i = deck.addCards(...cards);
    currentCard.set(i);
  };

  const handleImportFiles = async () => {
    const file = importFiles[0];
    const jsonText = await file.text();
    const cards = parseCards(jsonText);
    addCardsToDeck(cards);
  };

  $: importFiles && handleImportFiles();

  const handleImportSampleDeck = async () => {
    const jsonText = await fetch('rpg-cards-sample.json').then((res) => res.text());
    const cards = parseCards(jsonText);
    addCardsToDeck(cards);
  };
</script>

<Accordion stayOpen>
  <AccordionItem active header="General">
    <div class="button-grid">
      <div class="hidden">
        <input type="file" accept=".json" bind:files={importFiles} bind:this={importFileSelector} />
      </div>
      <Button color="primary" on:click={() => importFileSelector.click()}>Import from file</Button>
      <Button color="primary" on:click={handleImportSampleDeck}>Import sample deck</Button>
      <Button color="primary" on:click={handleImportSampleDeck}>Import sample deck</Button>
    </div>
  </AccordionItem>
  <AccordionItem active header="Card Defaults">
    <Form>
      <FormGroup>
        <Input id="" placeholder="Paper" />
        <Label for="exampleEmail">Hello</Label>
      </FormGroup>
    </Form>
  </AccordionItem>
  <AccordionItem active header="Deck">
    <Deck />
  </AccordionItem>
</Accordion>

<style lang="scss">
  .hidden {
    display: none !important;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25em;
  }
</style>
