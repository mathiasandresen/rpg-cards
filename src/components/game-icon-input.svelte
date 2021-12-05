<script lang="ts">
  import { Input, InputGroup, InputGroupText, Icon } from 'sveltestrap';
  import GameIcon from './game-icon.svelte';

  export let icon: string;
  export let name: string;
  export let id: string;
</script>

<InputGroup>
  <InputGroupText>
    <GameIcon bind:name={icon} color="black" size="1.5em" />
  </InputGroupText>
  <Input type="text" {name} {id} bind:value={icon} autocomplete="off" placeholder="Icon" />
  <InputGroupText>
    <a href="https://game-icons.net" target="_blank">
      <Icon name="box-arrow-up-right" />
    </a>
  </InputGroupText>
</InputGroup>

<style lang="scss">
</style>
