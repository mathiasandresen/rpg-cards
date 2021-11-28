<script lang="ts">
  import { Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'sveltestrap';
  import type { InputType } from 'sveltestrap/src/Input';
  import type { CardContentType } from '../model/card';
  import type Card from '../model/card';
  import { currentCard, deck } from '../stores';
  import CardEditorContentInput from './card-editor-content-input.svelte';

  let card = $deck[$currentCard];
  $: card = $deck[$currentCard];

  const updateDeck = (card: Card) => {
    $deck[$currentCard] = card;
  };

  $: updateDeck(card);

  const getContentInputType = (type: CardContentType): InputType => {
    switch (type) {
      case 'text':
        return 'textarea';
      default:
        return 'text';
    }
  };
</script>

<Form>
  <FormGroup row>
    <Label class="col-sm-3 col-form-label" for="name">Name</Label>
    <div class="col">
      <Input type="text" name="name" id="name" bind:value={card.title} placeholder="Name" />
    </div>
  </FormGroup>
  <FormGroup row>
    <Label class="col-sm-3 col-form-label" for="count">Count</Label>
    <div class="col">
      <Input type="number" name="count" id="count" bind:value={card.count} placeholder="Count" />
    </div>
  </FormGroup>
  <FormGroup row>
    <Label class="col-sm-3 col-form-label" for="icon">Icon</Label>
    <div class="col">
      <Input type="text" name="icon" id="icon" bind:value={card.icon} placeholder="Icon" />
    </div>
  </FormGroup>
  <FormGroup row>
    <Label class="col-sm-3 col-form-label" for="icon_back">Icon (Back)</Label>
    <div class="col">
      <Input
        type="text"
        name="icon_back"
        id="icon_back"
        bind:value={card.icon_back}
        placeholder="Icon"
      />
    </div>
  </FormGroup>
  <FormGroup row>
    <Label class="col-sm-3 col-form-label" for="color">Color</Label>
    <div class="col">
      <InputGroup>
        <InputGroupText>
          <input
            class="color-input"
            type="color"
            name="color"
            id="color"
            bind:value={card.color}
            placeholder="Color"
          />
        </InputGroupText>
        <Input type="text" name="color" id="color" bind:value={card.color} placeholder="Color" />
      </InputGroup>
    </div>
  </FormGroup>

  <FormGroup row>
    <Label class="col-sm-3 col-form-label" for="contents">Contents</Label>
    <div class="col">
      {#each card.contents as content}
        <CardEditorContentInput {content} />
      {/each}
    </div>
  </FormGroup>
</Form>

<style lang="scss">
  .color-input {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  .input-group-text-content {
    min-width: 4em;
    text-align: start;
  }
</style>
