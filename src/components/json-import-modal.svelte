<script lang="ts">
  import { Alert, Button, Icon, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
  import { deck } from '../stores';
  import JsonEditor from './json-editor.svelte';

  let open = false;
  let save: (callback?: () => void) => void;
  let json = '';

  export const toggle = () => {
    open = !open;
  };
</script>

<Modal isOpen={open} {toggle} size="xl" backdrop="static">
  <ModalHeader {toggle}>Import JSON</ModalHeader>
  <ModalBody>
    <JsonEditor bind:object={json} bind:save />
  </ModalBody>
  <ModalFooter>
    <Button color="primary" on:click={() => save(toggle)}>Import</Button>
    <Button color="secondary" on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
