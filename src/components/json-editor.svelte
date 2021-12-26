<script lang="ts">
  import { shortcut } from '$lib/shortcut';
  import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
  import { json as jsonLanguageSupport, jsonParseLinter } from '@codemirror/lang-json';
  import { closeLintPanel, linter, lintGutter, openLintPanel } from '@codemirror/lint';
  import type { ViewUpdate } from '@codemirror/view';
  import debounce from 'just-debounce-it';
  import { onMount } from 'svelte';
  import { Icon, Toast, ToastHeader } from 'sveltestrap';

  type T = $$Generic;

  export let object: T;
  $: object && (changed = false);

  let json = JSON.stringify(object, undefined, 2);
  export let error: string = undefined;
  export let changed = false;

  let isSavedToastOpen = false;

  const clearIsSavedToast = debounce(() => {
    isSavedToastOpen = false;
    console.log('hello');
  }, 1000);

  export const save = (onSuccess?: () => void) => {
    closeLintPanel(editor);
    error = undefined;

    try {
      const newJson = editor.state.doc.toJSON().join('\n');
      object = JSON.parse(newJson) as T;
      json = newJson;

      isSavedToastOpen = true;
      clearIsSavedToast();

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

<div>
  <div class="toast-wrapper">
    <Toast isOpen={isSavedToastOpen}>
      <ToastHeader>
        <Icon slot="icon" name="check-circle-fill" class="me-2" />
        Saved!
      </ToastHeader>
    </Toast>
  </div>
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
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .toast-wrapper {
    position: fixed;
    top: 1em;
    z-index: 15;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
