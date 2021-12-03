<script lang="ts">
  import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'sveltestrap';
  import { parseCardContents } from '../lib/card-json-parser';
  import type { CardContent } from '../model/card';
  import type Card from '../model/card';
  import { currentCard, deck } from '../stores';
  import CardEditorContentInput from './card-editor-content-input.svelte';

  const getContentAsString = (contents: CardContent[]): string => {
    return contents
      ?.map((content) =>
        (content.content ? [content.type, content.content] : [content.type])?.join(' | ')
      )
      ?.join('\n');
  };

  const updateDeck = (card: Card) => {
    $deck[$currentCard] = card;

    if (contentEditorMode !== 'textfield') {
      textFieldContent = getContentAsString(card.contents);
    }
  };

  const onCurrentCardChanged = () => {
    if ($currentCard === -1) {
      card = undefined;
      return 
    }

    card = $deck[$currentCard];
    textFieldContent = getContentAsString(card.contents);
  }

  const updateCardContents = (cardContentsString: string) => {
    try {
      card.contents = parseCardContents(cardContentsString?.split('\n')) ?? card.contents;
    } catch (error) {}
  };

  let card: Card = $deck[$currentCard];
  let contentEditorMode: 'individual' | 'textfield' = 'textfield';
  let textFieldContent: string = getContentAsString(card?.contents);

  $: updateCardContents(textFieldContent);
  $: onCurrentCardChanged($currentCard);
  $: updateDeck(card);
</script>

{#if card}
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
      <Label class="col-sm-3 col-form-label" for="text-font-size">Text font size</Label>
      <div class="col">
        <Input
          type="text"
          name="text-font-size"
          id="text-font-size"
          bind:value={card.layout.text_font_size}
          placeholder="10px"
        />
      </div>
    </FormGroup>

    <FormGroup row>
      <Label class="col-sm-3 col-form-label" for="content-editor-type">Contents</Label>
      <div class="col">
        <Input
          type="select"
          id="content-editor-type"
          name="content-editor-type"
          bind:value={contentEditorMode}
        >
          <option value="textfield">Textfield mode</option>
          <option value="individual">Individual mode</option>
        </Input>
      </div>
    </FormGroup>
    <FormGroup row>
      {#if contentEditorMode === 'individual'}
        {#each card.contents as content}
          <span class="content-list-item" draggable="true">
            <div class="input-wrapper">
              <CardEditorContentInput bind:content />
            </div>
          </span>
        {/each}
      {:else}
        <div>
          <Input type="textarea" class="content-editor-textarea" bind:value={textFieldContent} />
        </div>
      {/if}
    </FormGroup>
  </Form>
{:else}
  <div class="empty-editor">No card is selected!</div>
{/if}

<style lang="scss">
  .color-input {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  :global(.content-editor-textarea) {
    height: 20em;
  }

  .input-wrapper {
    display: flex;
    margin-bottom: 0.25em;
    gap: 0.5em;
    align-items: center;
  }

  .empty-editor {
    display: flex;
    justify-content: center;
  }
</style>
