<script lang="ts">
  import { flip } from 'svelte/animate';
  import type { CardContent } from '../model/card';
  import CardEditorContentInput from './card-editor-content-input.svelte';

  export let contents: CardContent[];

  let hovering = -1;

  type DragAndDropEvent = DragEvent & {
    currentTarget: EventTarget & HTMLSpanElement;
  };

  const dragstart = (event: DragAndDropEvent, i: number) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i.toString();
    event.dataTransfer.setData('text/plain', start);
  };

  const drop = (event: DragAndDropEvent, target: number) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData('text/plain'));
    const newTracklist = contents;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    contents = newTracklist;
    hovering = null;
  };
</script>

{#each contents as content, index (`editor-content-${index}`)}
  <span
    class="content-list-item"
    animate:flip
    draggable={true}
    on:drop|preventDefault={(event) => drop(event, index)}
    on:dragover|preventDefault
    on:dragenter={() => {
      hovering = index;
    }}
    on:dragstart={(event) => dragstart(event, index)}
  >
    <div class="input-wrapper" class:is-active={hovering === index}>
      <CardEditorContentInput bind:content />
    </div>
  </span>
{/each}

<style lang="scss">
  .input-wrapper {
    display: flex;
    margin-bottom: 0.25em;
    gap: 0.5em;
    align-items: center;
  }
  .is-active {
    border: 4px solid #3273dc;
    border-radius: 5px;
    /* background-color: #3273dc; */
  }
</style>
