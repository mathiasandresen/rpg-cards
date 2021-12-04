<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Button, ButtonGroup, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';
  import { SPLIT_REGEX } from '../lib/constants';
  import type { CardContent } from '../model/card';

  export let content: CardContent;
  let splitContent = content.content?.split(SPLIT_REGEX) ?? [];

  const dispatch = createEventDispatcher();

  const updateContent = () => {
    content.content = splitContent.map((c) => c.replace(/[^\\]\|/, '\\|')).join(' | ');
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
    min-width: 5em;
    width: 100%;
    text-align: start;
  }

  :global.input-property-title {
    max-width: 10em;
  }
</style>
