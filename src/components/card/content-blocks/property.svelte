<script lang="ts">
  import { renderText } from '$lib/card-render-util';

  import { SPLIT_REGEX } from '$lib/constants';
  import type { CardContent } from '$model/card';

  export let content: CardContent;

  $: [name, description] = content.content.split(SPLIT_REGEX);
</script>

<span class="property">
  <h4>{@html renderText(name)}</h4>
  <p>{@html renderText(description)}</p>
</span>

<style lang="scss">
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
      font-size: var(--card-text-size);
      font-family: Draconis;
      margin: 0;
    }

    :global + .property,
    :global + .description {
      margin-top: -0.25em;
    }
  }
</style>
