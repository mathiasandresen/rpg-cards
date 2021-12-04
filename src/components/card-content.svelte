<script lang="ts">
  import { SPLIT_REGEX } from '../lib/constants';

  import type { CardContent } from '../model/card';
  import Dndstats from './dndstats.svelte';

  export let content: CardContent;

  const getBoxSize = (content: CardContent): number => {
    return Number.parseFloat(content.content.split(SPLIT_REGEX)[1]) || 1;
  };

  const getBoxAmount = (content: CardContent): number => {
    return Number.parseInt(content.content.split(SPLIT_REGEX)[0], 10) || 1;
  };

  const renderText = (input: string) => {
    return input.replace('\\|', '|');
  };
</script>

{#if content?.type === 'subtitle'}
  <h2>{@html content.content}</h2>
{:else if content?.type === 'rule'}
  <div class="rule" />
{:else if content?.type === 'fill'}
  <div class="fill" />
{:else if content?.type === 'boxes'}
  <div class="boxes">
    {#each Array(getBoxAmount(content)) as _}
      <div class="box" style="width: {getBoxSize(content)}em; height: {getBoxSize(content)}em;" />
    {/each}
  </div>
{:else if content?.type === 'section'}
  <h3 class="section">{@html renderText(content.content)}</h3>
{:else if content?.type === 'property'}
  <span class="property">
    {#each content.content.split(SPLIT_REGEX) as element, index}
      {#if index === 0}
        <h4>{@html renderText(element)}</h4>
      {:else}
        <p>{@html renderText(element)}</p>
      {/if}
    {/each}
  </span>
{:else if content?.type === 'description'}
  <span class="description">
    {#each content.content.split(SPLIT_REGEX) as element, index}
      {#if index === 0}
        <h4>{@html renderText(element)}</h4>
      {:else}
        <p>{@html renderText(element)}</p>
      {/if}
    {/each}
  </span>
{:else if content?.type === 'dndstats'}
  <Dndstats {content} />
{:else if content?.type === 'text'}
  <p class="text">{@html renderText(content.content)}</p>
{:else}
  <p>{@html renderText(content.content)}</p>
{/if}

<style lang="scss">
  $section-height: 0.3cm;

  p {
    padding: 0 0.5em;
    margin-bottom: 0.2em;
    font-size: 1em;
    line-height: 1em;
  }

  h2 {
    font-size: 1.2em;
  }

  .section {
    background-color: var(--card-color);
    display: flex;
    place-content: center;
    place-items: center;
    color: white;
    height: $section-height;
    font-size: 0.8em;
    margin-bottom: 0.2em;
    margin-left: -2px;
    margin-right: -2px;
  }

  .property {
    display: block;
    text-indent: -1em;
    margin-left: 1em;
    margin-bottom: 0.2em;
    padding: 0 0.5em;
    line-height: 1em;

    p {
      display: inline;
      padding: unset;
      line-height: 2px;
      margin-left: 0.3em;
    }

    h4 {
      font-weight: bold;
      display: inline;
      font-size: 1em;
      margin: 0;
    }

    :global + .property,
    :global + .description {
      margin-top: -0.25em;
    }
  }
  .description {
    display: block;
    margin-bottom: 0.2em;
    padding: 0 0.5em;
    line-height: 1em;

    p {
      display: inline;
      padding: unset;
      line-height: 2px;
      margin-left: 0.3em;
    }

    h4 {
      font-weight: bold;
      font-style: italic;
      display: inline;
      font-size: 1em;
      margin: 0;
    }
    :global + .property,
    :global + .description {
      margin-top: -0.25em;
    }
  }

  .rule {
    border-bottom: 2px solid var(--card-color);
    margin-bottom: 0.2em;
    margin-left: -2px;
    margin-right: -2px;
  }

  .text {
    font-size: var(--card-text-size);
  }

  .fill {
    flex: 1;
  }

  .boxes {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.5em;
    gap: 0.5em;

    .box {
      border: 0.35em solid var(--card-color);
    }
  }
</style>
