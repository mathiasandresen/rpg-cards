<script lang="ts">
  import { Input, InputGroup, InputGroupText, Icon } from 'sveltestrap';
  import GameIcon from './game-icon.svelte';
  import AutoComplete from 'simple-svelte-autocomplete';
  import { getAllIconNames } from '../lib/icons';

  export let icon: string;
  export let name: string;
  export let id: string;

  const searchIcons = (query: string) => {
    return getAllIconNames(query);
  };
</script>

<InputGroup>
  <InputGroupText>
    <GameIcon bind:name={icon} color="black" size="1.5em" />
  </InputGroupText>

  <!-- <Input type="text" {name} {id} bind:value={icon} autocomplete="off" placeholder="Icon" /> -->
  <AutoComplete
    searchFunction={searchIcons}
    delay="200"
    hideArrow
    inputClassName="form-control autocomplete-input"
    bind:selectedItem={icon}
    bind:text={icon}
    class="autocomplete"
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
</style>
