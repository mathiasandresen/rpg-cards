<script lang="ts">
  import { flip } from 'svelte/animate';
  import type { CardContent } from '../model/card';
  import CardEditorContentInput from './card-editor-content-input.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import { Button, Icon, Input, InputGroup, Tooltip } from 'sveltestrap';
  import { createNewCardContent } from '../lib/card-builder';
  import { CardContentTypeV2, CARD_CONTENT_TYPES } from '$lib/card-content-types';
  import { uuid4 } from '$lib/uuid';

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

  const handleDuplicate = (index: number): void => {
    const newList = [...contents];
    newList.push({ ...contents[index], id: uuid4() });
    contents = newList;
  };

  let addType: CardContentTypeV2 = 'text';
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
          <CardEditorContentInput
            bind:content
            on:delete={() => handleDelete(index)}
            on:duplicate={() => handleDuplicate(index)}
          />
        </div>
      </div>
    {/each}
  </div>
  <InputGroup class="add-new-selector">
    <Input type="select" bind:value={addType}>
      {#each CARD_CONTENT_TYPES as type}
        <option id="select-{type.name}" value={type.name}>{type.name}</option>
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
</style>
