<script lang="ts">
  import { InputGroup, InputGroupText, Icon } from 'sveltestrap';
  import GameIcon from './game-icon.svelte';
  import AutoComplete from 'simple-svelte-autocomplete';
  import { getAllIconNames } from '../lib/icons';

  export let icon: string;
  export let name: string;
  export let id: string;
  export let placeholder: string = undefined;
  export let isMultiEditing: boolean;

  $: text = icon ?? null;
  let changed = false;

  const handleTextChanges = () => {
    if (!changed || (isMultiEditing && text === '')) {
      return;
    }

    icon = text;
  };
  $: {
    text;
    handleTextChanges();
  }

  const searchIcons = (query: string) => {
    return getAllIconNames(query);
  };
</script>

<InputGroup>
  <InputGroupText class="game-icon-input-icon-wrapper">
    {#if (text === null && isMultiEditing) || (text === '' && isMultiEditing)}
      <GameIcon name={'stack'} color="black" size="1.5em" />
    {:else}
      <GameIcon name={icon} color="black" size="1.5em" />
    {/if}
  </InputGroupText>

  <!-- <Input type="text" {name} {id} bind:value={icon} autocomplete="off" placeholder="Icon" /> -->
  <AutoComplete
    searchFunction={searchIcons}
    delay="200"
    hideArrow
    inputId={id}
    {name}
    inputClassName="form-control autocomplete-input"
    bind:selectedItem={icon}
    bind:text
    onChange={() => (changed = true)}
    class="autocomplete"
    {placeholder}
  >
    <div class="autocomplete-result-item" slot="item" let:item let:label>
      <GameIcon name={item} color="black" size="1.5em" />
      <span>
        {@html label}
      </span>
    </div>
  </AutoComplete>

  <InputGroupText>
    <a href="https://game-icons.net" target="_blank">
      <Icon name="box-arrow-up-right" />
    </a>
  </InputGroupText>
</InputGroup>

<style lang="scss">
  :global(.autocomplete) {
    flex: 1;
    height: 38px !important;
    // height: auto !important;
  }

  :global(.input-container) {
    height: 100%;
    :global(*) {
      border-radius: 0;
    }
  }

  .autocomplete-result-item {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  :global(.game-icon-input-icon-wrapper) {
    width: 3.25em;
    display: flex;
    justify-content: center;
  }
</style>
