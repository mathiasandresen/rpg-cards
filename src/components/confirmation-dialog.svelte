<script lang="ts">
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

  export let open = false;
  export const toggle = () => (open = !open);
  export let modalConfirm: () => void = () => {};
  let modalTitle = 'Confirm';
  let modalBody = 'Are you sure?';

  export const confirm = (func: () => void) => {
    modalConfirm = func;
    toggle();
  };

  const handleConfirm = () => {
    modalConfirm();
    toggle();
    modalConfirm = () => {};
  };

  const handleModalCancel = () => {
    toggle();
    modalConfirm = () => {};
  };
</script>

<slot />
<Modal isOpen={open} {toggle}>
  <ModalHeader>Modal title</ModalHeader>
  <ModalBody>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.
  </ModalBody>
  <ModalFooter>
    <Button color="primary" on:click={handleConfirm}>Do Something</Button>
    <Button color="secondary" on:click={handleModalCancel}>Cancel</Button>
  </ModalFooter>
</Modal>
