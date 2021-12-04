<script lang="ts">
  import { Button, ButtonGroup, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';
  import { SPLIT_REGEX } from '../lib/constants';

  import type { CardContent } from '../model/card';

  export let content: CardContent;

  let splitContent: string[];
  $: splitContent = content.content.split(SPLIT_REGEX);
</script>

{#if content.type === 'rule' || content.type === 'fill'}
  <InputGroup>
    <InputGroupText>
      <span class="input-group-text-content">{content.type}</span>
    </InputGroupText>
    <Input disabled />
  </InputGroup>
{:else if content.type === 'property'}
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
  <Button size="sm" color="link" class="link-danger">
    <Icon name="trash" />
  </Button>
</ButtonGroup>

<style lang="scss">
  .input-group-text-content {
    min-width: 4em;
    width: 100%;
    text-align: start;
  }

  :global.input-property-title {
    max-width: 10em;
  }
</style>
