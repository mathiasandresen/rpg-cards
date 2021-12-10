<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Button, ButtonGroup, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';
  import { SPLIT_REGEX } from '../lib/constants';
  import type { CardContent } from '../model/card';

  export let content: CardContent;
  let splitContent = content.content?.split(SPLIT_REGEX) ?? [];

  const dispatch = createEventDispatcher();

  const updateContent = () => {
    content.content = splitContent
      .map((c) => {
        if (typeof c !== 'string') {
          c = '' + c;
        }
        return c.replace(/[^\\]\|/, '\\|');
      })
      .join(' | ');
  };

  $: splitContent && updateContent();
</script>

{#if content.type === 'rule' || content.type === 'fill'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input disabled />
  </InputGroup>
{:else if content.type === 'property' || content.type === 'description'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    {#each splitContent as c, index}
      <Input
        class={index === 0 ? 'input-property-title' : ''}
        type="text"
        bind:value={c}
        placeholder=""
      />
    {/each}
  </InputGroup>
{:else if content.type === 'section' || content.type === 'subtitle'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input type="text" bind:value={splitContent[0]} />
    <Input type="text" bind:value={splitContent[1]} />
  </InputGroup>
{:else if content.type === 'boxes'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input type="number" bind:value={splitContent[0]} placeholder="Number of boxes" />
    <Input type="text" bind:value={splitContent[1]} placeholder="2em" />
  </InputGroup>
{:else if content.type === 'dndstats'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input type="number" bind:value={splitContent[0]} placeholder="Str" />
    <Input type="number" bind:value={splitContent[1]} placeholder="Dex" />
    <Input type="number" bind:value={splitContent[2]} placeholder="Con" />
    <Input type="number" bind:value={splitContent[3]} placeholder="Int" />
    <Input type="number" bind:value={splitContent[4]} placeholder="Wis" />
    <Input type="number" bind:value={splitContent[5]} placeholder="Cha" />
  </InputGroup>
{:else if content.type === 'dndspellblock'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input type="text" bind:value={splitContent[0]} placeholder="Casting time" />
    <Input type="text" bind:value={splitContent[1]} placeholder="Range" />
    <Input type="text" bind:value={splitContent[2]} placeholder="Components" />
    <Input type="text" bind:value={splitContent[3]} placeholder="Duration" />
  </InputGroup>
{:else if content.type === 'picture'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input type="text" bind:value={splitContent[0]} placeholder="URL of picture" />
    <Input
      class="small-input"
      type="number"
      bind:value={splitContent[1]}
      placeholder="Height in pixels"
    />
  </InputGroup>
{:else}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input
      type={content.type === 'text' ? 'textarea' : 'text'}
      name="contents"
      id="contents"
      bind:value={content.content}
      placeholder=""
    />
  </InputGroup>
{/if}
<ButtonGroup>
  <Button
    size="sm"
    color="link"
    class="link-danger"
    on:click={(e) => {
      e.preventDefault();
      dispatch('delete');
    }}
  >
    <Icon name="trash" />
  </Button>
</ButtonGroup>

<style lang="scss">
  .input-group-text-content {
    min-width: 6.5em;
    width: 100%;
    text-align: start;
  }

  :global(.small-input) {
    max-width: 10em;
  }

  :global.input-property-title {
    max-width: 10em;
  }
</style>
