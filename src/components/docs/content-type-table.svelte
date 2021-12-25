<script lang="ts">
  import { CARD_CONTENT_TYPES } from '$lib/card-content-types.svelte';
</script>

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col" class="name">Name</th>
      <th scope="col" class="description">Description</th>
      <th scope="col" class="parameters">Parameters</th>
    </tr>
  </thead>
  <tbody>
    {#each CARD_CONTENT_TYPES as contentType}
      <tr>
        <td><code>{contentType.name}</code></td>
        <td>{contentType.description}</td>
        <td>
          <ul class="param-list">
            {#each contentType.params as param}
              <li>
                <i>{param.name}</i>{#if param.type}&nbsp;({param.type}){/if}:
                {param.description}
              </li>
            {/each}
          </ul>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  .param-list {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  th.description {
    width: 35%;
  }
</style>
