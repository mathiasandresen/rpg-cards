<script lang="ts">
  import { Form, FormGroup, Input, Label } from 'sveltestrap';
  import { currentCard, deck } from '../stores';

  const card = $deck[$currentCard];
  $: console.log(card);
</script>

<Form>
  <FormGroup row>
    <Label class="col-sm-2 col-form-label" for="name">Name</Label>
    <div class="col-sm-10">
      <Input type="text" name="name" id="name" bind:value={card.title} placeholder="Name" />
    </div>
  </FormGroup>
  <FormGroup row>
    <Label class="col-sm-2 col-form-label" for="count">Count</Label>
    <div class="col-sm-10">
      <Input type="number" name="name" id="name" bind:value={card.count} placeholder="Count" />
    </div>
  </FormGroup>
  <FormGroup row>
    <Label class="col-sm-2 col-form-label" for="count">Icon</Label>
    <div class="col-sm-10">
      <Input type="text" name="name" id="name" bind:value={card.icon} placeholder="Icon" />
    </div>
  </FormGroup>
</Form>
