<script lang="ts">
  import IconInput from './game-icon-input.svelte';
  import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'sveltestrap';
  import { getContentAsString, parseCardContents } from '../lib/card-json-parser';
  import type { CardContent } from '../model/card';
  import type Card from '../model/card';
  import { currentCard, deck, multiSelect } from '../stores';
  import CardContentEditor from './card-content-editor.svelte';
  import { createMultiCard, removeEmpty } from '../lib/card-builder';
  import extend from 'just-extend';

  export let card: Card = $deck[$currentCard];
  let contentEditorMode: 'individual' | 'textfield' = 'individual';
  let textFieldContent = getContentAsString(card?.contents);
  $: isMultiEditing = $multiSelect.size > 1;

  const updateDeck = () => {
    if (isMultiEditing) {
      const multi = removeEmpty(card);

      deck.set(
        $deck.map((c, index) => {
          if ($multiSelect.has(index)) {
            return extend(true, c, multi) as Card;
          }
          return c;
        })
      );
      return;
    }

    deck.setCard($currentCard, card);

    if (contentEditorMode !== 'textfield') {
      textFieldContent = getContentAsString(card?.contents);
    }
  };

  const onCurrentCardChanged = () => {
    if ($currentCard < 0) {
      card = undefined;
      return;
    }

    card = $deck[$currentCard];
    textFieldContent = getContentAsString(card?.contents);
  };

  const updateCardContents = () => {
    try {
      card.contents = parseCardContents(textFieldContent?.split('\n')) ?? card.contents;
    } catch (error) {}
  };

  $: void textFieldContent, updateCardContents();
  $: {
    $currentCard, $deck, onCurrentCardChanged();
  }
  $: card && updateDeck();

  const handleMultiEditingChanging = () => {
    if (isMultiEditing) {
      card = createMultiCard($deck.filter((_, index) => $multiSelect.has(index))) as Card;
      return;
    }
    card = $deck[$currentCard];
  };
  $: $multiSelect, isMultiEditing !== undefined && handleMultiEditingChanging();
</script>

<div>
  <h4>Editor</h4>

  {#if card}
    <Form>
      <!-- Name -->
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="name">Name</Label>
        <div class="col">
          <Input
            type="text"
            name="name"
            id="name"
            bind:value={card.title}
            placeholder={isMultiEditing && card.title === null ? '*' : 'Name'}
          />
        </div>
      </FormGroup>
      <!-- Count -->
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="count">Count</Label>
        <div class="col">
          <Input
            type="number"
            name="count"
            id="count"
            bind:value={card.count}
            placeholder={isMultiEditing && card.count === null ? '*' : 'Count'}
          />
        </div>
      </FormGroup>
      <!-- Icon back -->
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="icon_back">Icon (Back)</Label>
        <div class="col">
          <IconInput
            bind:icon={card.icon_back}
            id="icon_back"
            name="icon_back"
            placeholder={isMultiEditing && card.icon_back === null ? '*' : 'Icon back'}
          />
        </div>
      </FormGroup>
      <!-- Text back -->
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="icon_back">Text (Back)</Label>
        <div class="col">
          <Input
            type="text"
            name="text_back"
            id="text_back"
            bind:value={card.text_back}
            placeholder={isMultiEditing && card.text_back === null
              ? '*'
              : 'Text to show on back, such as spell lvl'}
          />
        </div>
      </FormGroup>
      <!-- Color -->
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
              />
            </InputGroupText>
            <Input
              type="text"
              name="color"
              id="color"
              bind:value={card.color}
              placeholder="Color"
            />
          </InputGroup>
        </div>
      </FormGroup>
      <!-- Text font size -->
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="text-font-size">Text font size</Label>
        <div class="col">
          <Input
            type="text"
            name="text-font-size"
            id="text-font-size"
            bind:value={card.layout.text_font_size}
            placeholder={isMultiEditing && card.layout.text_font_size === null ? '*' : '10px'}
          />
        </div>
      </FormGroup>
      <!-- Contents -->
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
      {#if !isMultiEditing && card.contents}
        <FormGroup row>
          {#if contentEditorMode === 'individual'}
            <CardContentEditor bind:contents={card.contents} />
          {:else}
            <div>
              <Input
                type="textarea"
                class="content-editor-textarea"
                bind:value={textFieldContent}
              />
            </div>
          {/if}
        </FormGroup>
      {/if}
    </Form>
  {:else}
    <div class="empty-editor">No card is selected!</div>
  {/if}
</div>

<style lang="scss">
  .color-input {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  :global(.content-editor-textarea) {
    height: 20em;
  }

  .empty-editor {
    display: flex;
    justify-content: center;
  }
</style>
