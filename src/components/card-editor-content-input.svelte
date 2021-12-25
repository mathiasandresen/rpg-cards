<script lang="ts">
  import { getContentTypeDescriptor } from '$lib/card-content-types.svelte';
  import { createEventDispatcher } from 'svelte';
  import { Button, ButtonGroup, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';
  import { SPLIT_REGEX } from '../lib/constants';
  import type { CardContent } from '../model/card';

  export let content: CardContent;
  export let showDelete = true;
  $: typeDescriptor = getContentTypeDescriptor(content.type);

  let splitContent = content.content?.split(SPLIT_REGEX) ?? [];

  const dispatch = createEventDispatcher();

  const updateContent = () => {
    content.content =
      splitContent
        ?.map((c) => {
          if (typeof c !== 'string') {
            c = '' + c;
          }
          return c.replace(/[^\\]\|/, '\\|');
        })
        .filter((s) => s !== '')
        .join(' | ') ?? '';
  };

  $: splitContent && updateContent();
</script>

<InputGroup>
  <InputGroupText>
    <span class="input-group-text-content">{typeDescriptor.name}</span>
  </InputGroupText>
  {#if typeDescriptor.params.length === 0}
    <Input disabled />
  {:else}
    {#each typeDescriptor.params as param, index}
      <Input
        type={param.type ?? 'text'}
        bind:value={splitContent[index]}
        placeholder={param.name}
      />
    {/each}
  {/if}
</InputGroup>
<ButtonGroup>
  {#if showDelete}
    <Button
      color="link"
      class="link-danger"
      on:click={(e) => {
        e.preventDefault();
        dispatch('delete');
      }}
    >
      <Icon name="trash" />
    </Button>
  {/if}
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
