<script lang="ts">
  import { flip } from 'svelte/animate';
  import type { CardContent, CardContentType } from '../model/card';
  import { CardContentTypes } from '../model/card';
  import CardEditorContentInput from './card-editor-content-input.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import { Button, Icon, Input, InputGroup } from 'sveltestrap';
  import { uuid4 } from '../lib/uuid';
  import { createNewCardContent } from '../lib/card-builder';

  export let contents: CardContent[];
  const flipDurationMs = 200;

  const handleSort = (e: CustomEvent<any>): void => {
    contents = e.detail.items;
  };

  const handleDelete = (index: number): void => {
    const newList = [...contents];
    newList.splice(index, 1);
    contents = newList;
  };

  let addType: CardContentType = 'text';
  const handleAdd = (e: MouseEvent): void => {
    e.preventDefault();
    const newList = [...contents];
    newList.push(createNewCardContent(addType));
    contents = newList;
  };
</script>

<div>
  <div
    use:dndzone={{ items: contents, flipDurationMs, dropTargetStyle: {} }}
    on:consider={handleSort}
    on:finalize={handleSort}
  >
    {#each contents as content, index (content.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <div class="input-wrapper">
          <CardEditorContentInput bind:content on:delete={() => handleDelete(index)} />
        </div>
      </div>
    {/each}
  </div>
  <InputGroup class="add-new-selector">
    <Input type="select" bind:value={addType}>
      {#each CardContentTypes as type}
        <option>{type}</option>
      {/each}
    </Input>
    <Button color="primary" on:click={handleAdd}>
      <Icon name="plus" />
    </Button>
  </InputGroup>
</div>

<style lang="scss">
  .input-wrapper {
    display: flex;
    margin-bottom: 0.25em;
    gap: 0.5em;
    align-items: center;
  }

  :global(.add-new-selector) {
    /* max-width: 20em; */
  }
</style>
