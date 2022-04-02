<script lang="ts">
  import { uuid4 } from '$lib/uuid';
  import { Badge, Tooltip } from 'sveltestrap';

  export let id: string = uuid4();
</script>

<Badge {id} pill color="info">?</Badge>
<Tooltip target={id}>
  <slot />
</Tooltip>
