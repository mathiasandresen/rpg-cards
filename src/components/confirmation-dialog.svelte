<script lang="ts">
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
  import type { ButtonColor } from 'sveltestrap/src/Button';

  export let open = false;
  export const toggle = () => (open = !open);
  export let modalConfirm: () => void = () => {};
  export let danger: boolean = false;

  let modalTitle: string;
  let modalBody: string;
  let modalCancelButtonText = 'No';
  let modalConfirmButtonText = 'Yes';
  let modalConfirmButtonColor: ButtonColor = danger ? 'danger' : 'primary';
  let modalCancelButtonColor: ButtonColor = 'secondary';

  type ConfirmOptions = {
    func: () => void;
    title?: string;
    body?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: ButtonColor;
    cancelButtonColor?: ButtonColor;
  };
  const confirm = (options: ConfirmOptions) => {
    const {
      func,
      title,
      body,
      cancelButtonText,
      confirmButtonText,
      cancelButtonColor,
      confirmButtonColor
    } = options;

    modalConfirm = func;
    modalTitle = title;
    modalBody = body;
    modalCancelButtonText ??= cancelButtonText;
    modalConfirmButtonText ??= confirmButtonText;
    modalCancelButtonColor ??= cancelButtonColor;
    modalConfirmButtonColor ??= confirmButtonColor;

    if (!modalBody || !modalTitle) {
      modalBody = 'Are you sure?';
    }

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

<slot {confirm} />

<Modal isOpen={open} {toggle}>
  {#if modalTitle}
    <ModalHeader>{modalTitle}</ModalHeader>
  {/if}
  {#if modalBody || !modalTitle}
    <ModalBody class="confirmation-dialog-body">
      {modalBody}
    </ModalBody>
  {/if}
  <ModalFooter>
    <Button color={modalConfirmButtonColor} on:click={handleConfirm}>
      {modalConfirmButtonText}</Button
    >
    <Button color={modalCancelButtonColor} on:click={handleModalCancel}
      >{modalCancelButtonText}</Button
    >
  </ModalFooter>
</Modal>

<style lang="scss">
  :global(.confirmation-dialog-body) {
    white-space: pre;
  }
</style>
