<script lang="ts">
  import { SPLIT_REGEX } from '../lib/constants';
  import type { CardContent } from '../model/card';

  export let content: CardContent;

  let str = 0,
    dex = 0,
    con = 0,
    int = 0,
    wis = 0,
    cha = 0;

  $: {
    str = Number.parseInt(content.content.split(SPLIT_REGEX)[0]) || 0;
    dex = Number.parseInt(content.content.split(SPLIT_REGEX)[1]) || 0;
    con = Number.parseInt(content.content.split(SPLIT_REGEX)[2]) || 0;
    int = Number.parseInt(content.content.split(SPLIT_REGEX)[3]) || 0;
    wis = Number.parseInt(content.content.split(SPLIT_REGEX)[4]) || 0;
    cha = Number.parseInt(content.content.split(SPLIT_REGEX)[5]) || 0;
  }

  const displayNumberWithSign = (number: number): string => {
    return `${number >= 0 ? '+' : ''}${number}`;
  };

  const getModifier = (score: number): string => {
    return displayNumberWithSign(Math.floor((score - 10) / 2));
  };
</script>

<table class="card-stats">
  <tbody class="card-stats-body">
    <tr>
      <th class="card-stats-header">STR</th>
      <th class="card-stats-header">DEX</th>
      <th class="card-stats-header">CON</th>
      <th class="card-stats-header">INT</th>
      <th class="card-stats-header">WIS</th>
      <th class="card-stats-header">CHA</th>
    </tr>
    <tr>
      <td class="card-stats-cell">{str} ({getModifier(str)})</td>
      <td class="card-stats-cell">{dex} ({getModifier(dex)})</td>
      <td class="card-stats-cell">{con} ({getModifier(con)})</td>
      <td class="card-stats-cell">{int} ({getModifier(int)})</td>
      <td class="card-stats-cell">{wis} ({getModifier(wis)})</td>
      <td class="card-stats-cell">{cha} ({getModifier(cha)})</td>
    </tr>
  </tbody>
</table>

<style lang="scss">
  .card-stats {
    font-size: 9px;
    margin: 0 0.5em;
    color: var(--card-color);

    /* .card-stats-body {
      display: flex;
      justify-content: space-between;
    } */
  }

  .card-stats-header,
  .card-stats-cell {
    text-align: center;
  }
</style>
