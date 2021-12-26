<script lang="ts">
  import { shortcut } from '$lib/shortcut';
  import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
  import { json as jsonLanguageSupport, jsonParseLinter } from '@codemirror/lang-json';
  import { closeLintPanel, linter, lintGutter, openLintPanel } from '@codemirror/lint';
  import type { ViewUpdate } from '@codemirror/view';
  import { onMount } from 'svelte';

  type T = $$Generic;

  export let object: T;
  $: object && (changed = false);

  let json = JSON.stringify(object, undefined, 2);
  export let error: string = undefined;
  export let changed = false;

  export const save = (onSuccess?: () => void) => {
    closeLintPanel(editor);
    error = undefined;

    try {
      const newJson = editor.state.doc.toJSON().join('\n');
      object = JSON.parse(newJson) as T;

      json = newJson;

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      if (e instanceof Error) {
        error = e.message;
        openLintPanel(editor);
      }
    }
  };

  const onEditorUpdate = (update: ViewUpdate) => {
    if (update.docChanged) {
      if (json !== update.state.doc.toJSON().join('\n')) {
        changed = true;
      } else {
        changed = false;
      }
    }
  };

  let parent: HTMLDivElement;
  let editor: EditorView;
  onMount(() => {
    editor = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          jsonLanguageSupport(),
          EditorView.lineWrapping,
          EditorView.updateListener.of(onEditorUpdate),
          linter(jsonParseLinter()),
          lintGutter()
        ],
        doc: json
      }),
      parent: parent
    });
  });
</script>

<div class="wrapper">
  <div
    bind:this={parent}
    use:shortcut={{
      control: true,
      code: 'KeyS',
      callback: () => {
        save();
      }
    }}
  />
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
