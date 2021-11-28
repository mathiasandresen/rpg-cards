<script lang="ts">
  import type { CardContent } from '../model/card';

  export let content: CardContent;
</script>

{#if content?.type === 'subtitle'}
  <h2>{content.content}</h2>
{:else if content?.type === 'rule'}
  <div class="rule" />
{:else if content?.type === 'section'}
  <h3 class="section">{content.content}</h3>
{:else if content?.type === 'property'}
  <span class="property">
    {#each content.content.split(' | ') as element, index}
      {#if index === 0}
        <h4>{element}</h4>
      {:else}
        <p>{element}</p>
      {/if}
    {/each}
  </span>
{:else if content?.type === 'text'}
  <p class="text">{content.content}</p>
{:else}
  <p>{content.content}</p>
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

    :global + .property {
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
    font-size: 1em;
  }
</style>
