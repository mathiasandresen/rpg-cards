<script lang="ts">
  import { Button, Icon, Input, InputGroup, InputGroupText } from 'sveltestrap';

  import type { CardContent } from '../model/card';

  export let content: CardContent;

  let splitContent = content.content.split(' | ');
</script>

{#if content.type === 'rule'}
  <Input class="mb-1" disabled value="rule" />
{:else if content.type === 'property'}
  <InputGroup class="mb-1">
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
  <InputGroup class="mb-1">
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
