<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import {
    Accordion,
    AccordionItem,
    Badge,
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Icon,
    Input,
    Label,
    Row,
    Tooltip
  } from 'sveltestrap';
  import { parseCards } from '../lib/card-json-parser';
  import type Card from '../model/card';
  import { currentCard, deck } from '../stores';
  import Deck from './deck.svelte';

  let importFileSelector: HTMLInputElement;
  let importFiles: FileList;
  let convertFirstSubtitle = false;

  const addCardsToDeck = (cards: Card[]) => {
    const i = deck.addCards(...cards);
    currentCard.set(i);
  };

  const handleImportFiles = async () => {
    if (importFiles.length === 0) {
      return;
    }
    const file = importFiles[0];
    const jsonText = await file.text();
    const cards = parseCards(jsonText, convertFirstSubtitle);
    addCardsToDeck(cards);
  };

  $: importFiles && handleImportFiles();

  const handleImportSampleDeck = async () => {
    const jsonText = await fetch('rpg-cards-sample.json').then((res) => res.text());
    const cards = parseCards(jsonText, convertFirstSubtitle);
    addCardsToDeck(cards);
  };
</script>

<Accordion stayOpen>
  <AccordionItem active header="General">
    <div class="button-grid">
      <div class="hidden">
        <input type="file" accept=".json" bind:files={importFiles} bind:this={importFileSelector} />
      </div>
      <div class="sidebar-element full">
        <Input
          type="checkbox"
          label="Convert first subtitle to section?"
          id="convert-first-subtitle"
          bind:checked={convertFirstSubtitle}
        />
        <Badge id="convert-first-subtitle-help" pill color="info">?</Badge>
        <Tooltip target={'convert-first-subtitle-help'}>
          This will convert the first subtitle followed by a rule of all imported cards to a
          section.
        </Tooltip>
      </div>
      <div class="sidebar-element">
        <Button block color="primary" on:click={() => importFileSelector.click()}>
          Import from file
        </Button>
      </div>
      <div class="sidebar-element">
        <Button color="primary" on:click={handleImportSampleDeck}>Import sample deck</Button>
      </div>
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

  .sidebar-element {
    width: 100%;
    height: 2.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.full {
      grid-column: 1 / span 2;
    }
  }
</style>
