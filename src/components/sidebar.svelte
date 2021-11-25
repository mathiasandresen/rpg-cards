<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
  } from 'sveltestrap';
  import Deck from './deck.svelte';
</script>

<Accordion stayOpen>
  <AccordionItem active header="General">
    <Container fluid>
      <Row class="gy-2">
        <Button color="primary">Import from file</Button>
      </Row>
    </Container>
  </AccordionItem>
  <AccordionItem active header="Card Defaults">
    <Form>
      <FormGroup>
        <Input id="" placeholder="Paper" />
        <Label for="exampleEmail">Hello</Label>
      </FormGroup>
    </Form>
  </AccordionItem>
  <AccordionItem active header="Deck">
    <Deck />
  </AccordionItem>
</Accordion>
