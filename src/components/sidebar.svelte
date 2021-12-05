<script lang="ts">
  import { browser } from '$app/env';
  import {
    Accordion,
    AccordionItem,
    Badge,
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Tooltip
  } from 'sveltestrap';
  import { parseCards } from '../lib/card-json-parser';
  import type Card from '../model/card';
  import { currentCard, deck, pageLayout } from '../stores';
  import Deck from './deck.svelte';

  let importFileSelector: HTMLInputElement;
  let importFiles: FileList;
  let convertFirstSubtitle = false;

  if (browser) {
    convertFirstSubtitle = localStorage?.getItem('shouldConvertFirstSubtitle') === 'true' ?? false;
  }

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

  $: {
    if (browser) {
      localStorage.setItem('shouldConvertFirstSubtitle', convertFirstSubtitle.toString());
    }
  }
</script>

<Accordion stayOpen>
  <AccordionItem active header="General">
    <div class="button-grid">
      <div class="hidden">
        <input type="file" accept=".json" bind:files={importFiles} bind:this={importFileSelector} />
      </div>
      <div class="sidebar-element">
        <Button block color="primary" on:click={() => importFileSelector.click()}>
          Import from file
        </Button>
      </div>
      <div class="sidebar-element">
        <Button block color="primary" on:click={handleImportSampleDeck}>Import sample deck</Button>
      </div>
      <div class="sidebar-element">
        <Button block color="primary" on:click>Export to file</Button>
      </div>
      <div class="sidebar-element">
        <Button block color="primary" href="/output">Print</Button>
      </div>
      <h2 class="sidebar-header">Options</h2>
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
    </div>
  </AccordionItem>
  <AccordionItem active header="Page">
    <Form>
      <FormGroup>
        <span>
          <Label for="paper-size">Paper size</Label>
        </span>
        <InputGroup id="paper-size">
          <Input
            id="paper-size-width"
            placeholder="Width"
            type="number"
            bind:value={$pageLayout.paperSize.width}
          />
          <InputGroupText>mm</InputGroupText>
          <Input
            id="paper-size-height"
            placeholder="Height"
            type="number"
            bind:value={$pageLayout.paperSize.height}
          />
          <InputGroupText>mm</InputGroupText>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <span>
          <Label for="page-adjust">Print adjust</Label>
          <Badge id="page-adjust-help" pill color="info">?</Badge>
          <Tooltip target="page-adjust-help">
            Use this to adjust the print in order to make up for difference in printers
          </Tooltip>
        </span>
        <InputGroup id="page-adjust">
          <Input
            id="page-adjust-x"
            placeholder="X"
            type="number"
            bind:value={$pageLayout.adjust.x}
          />
          <InputGroupText>mm</InputGroupText>
          <Input
            id="page-adjust-y"
            placeholder="Y"
            type="number"
            bind:value={$pageLayout.adjust.y}
          />
          <InputGroupText>mm</InputGroupText>
        </InputGroup>
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
    min-height: 2.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.full {
      grid-column: 1 / span 2;
    }
  }

  .sidebar-header {
    font-size: large;
    margin: 0;
    grid-column: 1 / span 2;
    margin-top: 1em;
    /* height: 1.5em; */
    display: flex;
    align-items: center;
  }
</style>
