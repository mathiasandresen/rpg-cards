<script lang="ts">
  import { getContentTypeDescriptor } from '$lib/card-content-types';
  import { createEventDispatcher } from 'svelte';
  import { Button, ButtonGroup, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';
  import { SPLIT_REGEX } from '../lib/constants';
  import type { CardContent } from '../model/card';

  export let content: CardContent;
  $: typeDescriptor = getContentTypeDescriptor(content.type);

  let splitContent = content.content?.split(SPLIT_REGEX) ?? typeDescriptor.params.map(() => '');

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
  <Button
    color="link"
    class="link-info"
    on:click={(e) => {
      e.preventDefault();
      dispatch('duplicate');
    }}
  >
    <Icon name="files" />
  </Button>
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
