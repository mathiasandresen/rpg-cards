<script lang="ts">
  import { recentColors } from '../stores';
  import { Icon, Popover, TabContent, TabPane, Tooltip } from 'sveltestrap';
  import colorSets from '../../static/colors.json';

  let isOpen = false;
  export let value: string;

  $: recentsSet = {
    set: 'Recents',
    colors: $recentColors.map((v) => ({ name: v, color: v }))
  };

  const close = () => {
    isOpen = false;
  };

  const handleBodyClick = () => {
    if (isOpen) {
      close();
    }
  };

  const handleColorClick = (color: string) => {
    value = color;
    recentColors.add(color);
    close();
  };
</script>

<svelte:body on:click={handleBodyClick} />

<a id="color-select-button" tabindex="0" on:click|preventDefault|stopPropagation>
  <Icon name="palette-fill" />
</a>
<Popover class="popover" placement="bottom" target="color-select-button" bind:isOpen>
  <div class="wrapper" on:click|preventDefault|stopPropagation>
    <TabContent vertical pills>
      {#each [...colorSets, recentsSet] as set, setIndex}
        <TabPane tabId={setIndex} tab={set.set} active={setIndex === 0}>
          <div class="color-set">
            {#each set.colors as color, index (`${set.set}-${index}-${color.name}-${color.color}`)}
              <div
                class="color-item"
                id="color-item-{setIndex}-{index}"
                on:click={() => handleColorClick(color.color)}
              >
                <div class="color rounded" style="--color: {color.color}" />
                <Tooltip target="color-item-{setIndex}-{index}">{color.name}</Tooltip>
              </div>
            {/each}
          </div>
        </TabPane>
      {/each}
    </TabContent>
  </div>
</Popover>

<style lang="scss">
  a {
    cursor: pointer;
  }

  .wrapper {
    width: 300px;

    :global(.nav-item) {
      overflow-x: hidden;
      /* word-wrap: break-word; */
      white-space: nowrap;
    }
  }

  .color-set {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .color-item {
    width: 2em;
    height: 2em;
    cursor: pointer;

    .color {
      background-color: var(--color);

      border: 1px solid lightgray;

      width: 2em;
      height: 2em;
    }
  }
</style>
