<script context="module" lang="ts">
  export type ImportEventPayload = {
    cards: Card[];
  };
</script>

<script lang="ts">
  import { parseCards } from '$lib/card-json-parser';
  import type Card from '$model/card';
  import { createEventDispatcher } from 'svelte';
  import {
    Alert,
    Button,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from 'sveltestrap';
  import { settings } from '../stores';
  import { shortcut } from '$lib/shortcut';

  const dispatch = createEventDispatcher<{ import: ImportEventPayload }>();

  let open = false;
  let json = '';
  let error: string = undefined;

  $: {
    if (open) {
      json = '';
    }
  }

  const handleImportClick = () => {
    try {
      const cards = parseCards(
        json,
        $settings.convertFirstSubtitle,
        $settings.convertDndSpellblock
      );
      error = undefined;

      if (cards.length === 0) {
        error = 'Uknown import format!';
        return;
      }

      dispatch('import', { cards });
      toggle();
    } catch (err) {
      console.warn(err);
      error = err.message;
    }
  };

  export const toggle = () => {
    open = !open;
  };
</script>

<Modal isOpen={open} {toggle} size="xl" backdrop="static">
  <ModalHeader {toggle}>Import JSON</ModalHeader>
  <ModalBody>
    <div use:shortcut={{ code: 'Escape', callback: toggle }} />
    {#if error}
      <Alert color="danger">
        <Icon name="exclamation-triangle-fill" />
        &nbsp; {error}
      </Alert>
    {/if}
    <div class="input-wrapper">
      <Input type="textarea" bind:value={json} />
    </div>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" on:click={handleImportClick}>Import</Button>
    <Button color="secondary" on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>

<style lang="scss">
  .input-wrapper {
    height: 70vh;

    :global(textarea) {
      height: 100%;
      resize: none;
    }
  }
</style>
