<script lang="ts">
  import IconInput from './game-icon-input.svelte';
  import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'sveltestrap';
  import { parseCardContents } from '../lib/card-json-parser';
  import type { CardContent } from '../model/card';
  import type Card from '../model/card';
  import { currentCard, deck, multiSelect } from '../stores';
  import CardContentEditor from './card-content-editor.svelte';
  import { createMultiCard } from '../lib/card-builder';

  const getContentAsString = (contents: CardContent[]): string => {
    return contents
      ?.map((content) =>
        (content.content ? [content.type, content.content] : [content.type])?.join(' | ')
      )
      ?.join('\n');
  };

  const updateDeck = () => {
    if (isMultiEditing) {
      multiCard = {
        ...card
      };
      return;
    }
    $deck[$currentCard] = card;

    if (contentEditorMode !== 'textfield') {
      textFieldContent = getContentAsString(card?.contents);
    }
  };

  const onCurrentCardChanged = () => {
    if ($currentCard === -1) {
      card = undefined;
      return;
    }

    card = $deck[$currentCard];
    textFieldContent = getContentAsString(card?.contents);
  };

  const updateCardContents = (cardContentsString: string) => {
    try {
      card.contents = parseCardContents(cardContentsString?.split('\n')) ?? card.contents;
    } catch (error) {}
  };

  let card: Card = $deck[$currentCard];
  let contentEditorMode: 'individual' | 'textfield' = 'individual';
  let textFieldContent: string = getContentAsString(card?.contents);

  $: updateCardContents(textFieldContent);
  $: {
    $currentCard;
    $deck;
    onCurrentCardChanged();
  }
  $: card && updateDeck();
  $: layout = card?.layout ?? {};

  /** Multi editor */
  $: isMultiEditing = $multiSelect.size > 1;
  let multiCard: Partial<Card>;

  const handleMultiEditingChanging = (isMultiEditing: boolean) => {
    if (isMultiEditing) {
      multiCard = createMultiCard($deck.filter((_, index) => $multiSelect.has(index)));
      card = multiCard as Card;
    } else {
      card = $deck[$currentCard];
    }
  };
  $: $multiSelect && handleMultiEditingChanging(isMultiEditing);

  const handleMulticardChanges = () => {
    deck.set(
      $deck.map((c, index) => {
        if ($multiSelect.has(index)) {
          return {
            ...c,
            ...multiCard
          };
        }
        return c;
      })
    );
  };
  $: multiCard && handleMulticardChanges();
</script>

<div>
  <h4>Editor</h4>

  {#if card}
    <Form>
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="name">Name</Label>
        <div class="col">
          <Input
            type="text"
            name="name"
            id="name"
            bind:value={card.title}
            placeholder={isMultiEditing && card.title === undefined ? '*' : 'Name'}
          />
        </div>
      </FormGroup>
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="count">Count</Label>
        <div class="col">
          <Input
            type="number"
            name="count"
            id="count"
            bind:value={card.count}
            placeholder={isMultiEditing && card.count === undefined ? '*' : 'Count'}
          />
        </div>
      </FormGroup>
      <!-- <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="icon">Icon</Label>
        <div class="col">
          <IconInput bind:icon={card.icon} id="icon" name="icon" />
        </div>
      </FormGroup> -->
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="icon_back">Icon (Back)</Label>
        <div class="col">
          <IconInput
            bind:icon={card.icon_back}
            id="icon_back"
            name="icon_back"
            placeholder={isMultiEditing && card.icon_back === undefined ? '*' : 'Icon back'}
          />
        </div>
      </FormGroup>
      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="icon_back">Text (Back)</Label>
        <div class="col">
          <Input
            type="text"
            name="text_back"
            id="text_back"
            bind:value={card.text_back}
            placeholder={isMultiEditing && card.text_back === undefined
              ? '*'
              : 'Text to show on back, such as spell lvl'}
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

      <FormGroup row>
        <Label class="col-sm-3 col-form-label" for="text-font-size">Text font size</Label>
        <div class="col">
          <Input
            type="text"
            name="text-font-size"
            id="text-font-size"
            bind:value={layout.text_font_size}
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
