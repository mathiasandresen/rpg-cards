<script lang="ts">
  import { Alert, Button, Icon, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
  import { deck } from '../stores';
  import JsonEditor from './json-editor.svelte';

  let open = false;
  let changed: boolean;
  let save: (callback?: () => void) => void;

  export const toggle = () => {
    open = !open;
  };
</script>

<Modal isOpen={open} {toggle} size="xl" backdrop="static">
  <ModalHeader {toggle}>
    Edit JSON
    {#if changed}
      <i>(unsaved changes)</i>
    {/if}
  </ModalHeader>
  <ModalBody>
    <Alert color="warning">
      <Icon name="exclamation-triangle-fill" />
      &nbsp; Be careful, if you don't know what you are doing, you can break the deck
    </Alert>
    <JsonEditor bind:object={$deck} bind:changed bind:save />
  </ModalBody>
  <ModalFooter>
    <Button color="primary" on:click={() => save(toggle)}>Save changes</Button>
    <Button color="secondary" on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
