<script lang="ts">
  import { DEFAULT_LAYOUT } from '$lib/defaults';
  import extend from 'just-extend';
  import {
    Accordion,
    AccordionItem,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Tooltip
  } from 'sveltestrap';
  import { createMultiCard, removeEmpty } from '../lib/card-builder';
  import { getContentAsString, parseCardContents } from '../lib/card-json-parser';
  import type Card from '../model/card';
  import { currentCard, deck, multiSelect, recentColors } from '../stores';
  import CardContentEditor from './card-content-editor.svelte';
  import ColorSelecter from './color-selecter.svelte';
  import CssEditor from './css-editor.svelte';
  import IconInput from './game-icon-input.svelte';
  import Hint from './hint.svelte';

  let card: Card = $deck[$currentCard];
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
        <Label class="col-sm-3 col-form-label" for="text_back">Text (Back)</Label>
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
        <Label class="col-sm-3 col-form-label" for="color-text" disabled>Color</Label>
        <div class="col">
          <InputGroup>
            <InputGroupText>
              <input
                class="color-input rounded"
                type="color"
                name="color"
                id="color-box"
                bind:value={card.color}
                on:change={() => recentColors.add(card.color)}
              />
            </InputGroupText>
            <Input
              type="text"
              name="color"
              id="color-text"
              bind:value={card.color}
              placeholder="Color"
              on:change={() => recentColors.add(card.color)}
            />
            <InputGroupText>
              <ColorSelecter bind:value={card.color} />
            </InputGroupText>
          </InputGroup>
        </div>
      </FormGroup>

      <FormGroup row>
        <div class="form-accordion">
          <Accordion stayOpen>
            <AccordionItem active header="Layout">
              <!-- Title font size -->
              <FormGroup row>
                <Label class="col-sm-3 col-form-label" for="title-size">Title size</Label>
                <div class="col">
                  <Input
                    type="text"
                    name="title-size"
                    id="title-size"
                    bind:value={card.layout.title_font_size}
                    placeholder={isMultiEditing && card.layout.title_font_size === null
                      ? '*'
                      : DEFAULT_LAYOUT.TITLE_FONT_SIZE}
                  />
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
                    placeholder={isMultiEditing && card.layout.text_font_size === null
                      ? '*'
                      : DEFAULT_LAYOUT.TEXT_FONT_SIZE}
                  />
                </div>
              </FormGroup>
              <!-- Custom CSS -->
              {#if !isMultiEditing}
                <FormGroup row>
                  <Label class="col-sm-3 col-form-label" for="custom-css">
                    Custom CSS
                    <Hint id="custom-css-hint">
                      <u>Experimental</u> Here you can inject custom CSS (may require
                      <code>!important</code>
                      on some properties)
                    </Hint>
                  </Label>
                  <div class="col">
                    <CssEditor id="custom-css" bind:css={card.layout.custom_css} />
                  </div>
                </FormGroup>
              {/if}
            </AccordionItem>
          </Accordion>
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
  .form-accordion {
    :global(.accordion-body) {
      padding-bottom: 0;
    }
  }
  .color-input {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    overflow: hidden;
  }
  :global(.content-editor-textarea) {
    height: 20em;
  }

  .empty-editor {
    display: flex;
    justify-content: center;
  }

  :global(.popover) {
    min-width: fit-content;
  }
</style>
