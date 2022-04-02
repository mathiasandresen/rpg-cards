<script lang="ts">
  import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
  import { lintGutter } from '@codemirror/lint';
  import type { ViewUpdate } from '@codemirror/view';
  import { css as cssLanguageSupport, cssCompletion } from '@codemirror/lang-css';
  import { onMount } from 'svelte';

  export let css: string = undefined;
  let clazz: string = '';
  export { clazz as class };
  export let id = '';

  const onEditorUpdate = (update: ViewUpdate) => {
    if (update.docChanged) {
      css = update.state.doc.toJSON().join('\n').trimEnd();
    }
  };

  let parent: HTMLDivElement;
  let editor: EditorView;
  onMount(() => {
    let doc = css ?? '';

    if (doc.split('\n').length < 2) {
      doc = css + '\n';
    }

    editor = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          EditorView.updateListener.of(onEditorUpdate),
          lintGutter(),
          cssLanguageSupport(),
          cssCompletion
        ],
        doc
      }),
      parent: parent
    });
  });
</script>

<div {id} class="wrapper form-control input {clazz}" bind:this={parent} />

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;

    :global(.cm-editor.cm-focused) {
      outline: none;
    }
  }
</style>
