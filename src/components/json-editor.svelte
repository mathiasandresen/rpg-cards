<script lang="ts">
  import { Input } from 'sveltestrap';
  import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
  import { json as jsonLanguageSupport } from '@codemirror/lang-json';
  import { Text } from '@codemirror/text';
  import { onMount } from 'svelte';

  type T = $$Generic;

  export let object: T;

  let json = JSON.stringify(object, undefined, 2);

  $: {
    const ny = JSON.parse(json) as T;
    console.log(ny);
  }

  let parent: HTMLDivElement;

  onMount(() => {
    let editor = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, jsonLanguageSupport(), EditorView.lineWrapping],
        doc: json
      }),
      parent: parent
    });

    editor.state.toJSON();
  });
</script>

<!-- <Input class="json-text-input" type="textarea" bind:value={json} /> -->

<div bind:this={parent} />

<style lang="scss">
  :global(.json-text-input) {
    height: 70vh;
    font-size: 0.8em;
  }
</style>
