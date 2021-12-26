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
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Tooltip
  } from 'sveltestrap';
  import { generateExportObject, parseCards } from '../lib/card-json-parser';
  import type Card from '../model/card';
  import { currentCard, deck, pageLayout } from '../stores';
  import { defaultSettings } from '../stores/settings';
  import type Settings from '../stores/settings';
  import Deck from './deck.svelte';
  import JsonEditorModal from './json-editor-modal.svelte';

  let importFileSelector: HTMLInputElement;
  let importFiles: FileList;
  let settings: Settings = defaultSettings;
  let hiddenDownloadLink: HTMLAnchorElement;
  let downloadUrl = undefined;
  let downloadName = 'cards.json';

  let toggleJsonEditor: () => void;

  if (browser) {
    settings = JSON.parse(localStorage?.getItem('settings')) ?? defaultSettings;
  }

  $: {
    if (browser) {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
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
    const cards = parseCards(
      jsonText,
      settings.convertFirstSubtitle,
      settings.convertDndSpellblock
    );
    addCardsToDeck(cards);
  };

  $: importFiles && handleImportFiles();

  const handleImportSampleDeck = async () => {
    const jsonText = await fetch('rpg-cards-sample.json').then((res) => res.text());
    const cards = parseCards(
      jsonText,
      settings.convertFirstSubtitle,
      settings.convertDndSpellblock
    );
    addCardsToDeck(cards);
  };

  const handleExportToFile = () => {
    const jsonExport = JSON.stringify(generateExportObject($deck), undefined, 2);
    const blob = new Blob([jsonExport], { type: 'application/json' });
    downloadUrl = URL.createObjectURL(blob);

    hiddenDownloadLink.href = downloadUrl;
    hiddenDownloadLink.click();

    setTimeout(() => URL.revokeObjectURL(downloadUrl), 500);
  };

  const handleEditJson = () => {
    toggleJsonEditor();
  };
</script>

<div>
  <Accordion stayOpen>
    <AccordionItem active header="General">
      <div class="button-grid">
        <div class="hidden">
          <input
            type="file"
            accept=".json"
            bind:files={importFiles}
            bind:this={importFileSelector}
          />
          <a href={downloadUrl} download={downloadName} bind:this={hiddenDownloadLink}>
            Hidden download link
          </a>
        </div>
        <div class="sidebar-element">
          <Button block color="primary" on:click={() => importFileSelector.click()}>
            Import from file
          </Button>
        </div>
        <div class="sidebar-element">
          <Button block color="primary" on:click={handleImportSampleDeck}>Import sample deck</Button
          >
        </div>
        <div class="sidebar-element">
          <Button block color="primary" on:click={handleExportToFile}>Export to file</Button>
        </div>
        <div class="sidebar-element">
          <Button block color="primary" href="/output">Print</Button>
        </div>
        <div class="sidebar-element">
          <Button block color="primary" on:click={handleEditJson}>Edit JSON</Button>
        </div>
        <h2 class="sidebar-header">Options</h2>
        <div class="sidebar-element low full">
          <Input
            type="checkbox"
            label="Convert subtitle + rule to sections?"
            id="convert-first-subtitle"
            bind:checked={settings.convertFirstSubtitle}
          />
          <Badge id="convert-first-subtitle-help" pill color="info">?</Badge>
          <Tooltip target={'convert-first-subtitle-help'}>
            This will convert subtitles followed by a rule into sections.
          </Tooltip>
        </div>
        <div class="sidebar-element low full">
          <Input
            type="checkbox"
            label="Convert D&D spell blocks?"
            id="convert-dnd-spell-block"
            bind:checked={settings.convertDndSpellblock}
          />
          <Badge id="convert-dnd-spell-block-help" pill color="info">?</Badge>
          <Tooltip target={'convert-dnd-spell-block-help'}>
            This will convert properties containing Casting Time, Range, Components, and Duration
            (in that order) into a block.
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
        <FormGroup>
          <span>
            <Label for="card-back-border">Cardback border</Label>
            <Badge id="card-back-border-help" pill color="info">?</Badge>
            <Tooltip target="card-back-border-help">
              Use this add a colored border around the back of the cards when printing to make up
              for printing variances.
            </Tooltip>
          </span>
          <InputGroup id="card-back-border">
            <Input
              id="card-back-border-input"
              placeholder="Cardback border"
              type="number"
              bind:value={$pageLayout.cardBackBorder}
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
  <JsonEditorModal bind:toggle={toggleJsonEditor} />
</div>

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

    &.low {
      min-height: 1.5em;
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
