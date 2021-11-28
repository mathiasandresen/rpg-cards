<script lang="ts">
  import Card from '../components/card.svelte';
  import exampleCards from '../../static/rpg-cards_many.json';
  import 'ress/dist/ress.min.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { parseCard } from '../lib/card-json-parser';
  import { Container, Row, Col, Navbar, NavbarBrand } from 'sveltestrap';
  import Sidebar from '../components/sidebar.svelte';
  import CardEditor from '../components/card-editor.svelte';
  import { deck } from '../stores';
  import CurrentCard from '../components/current-card.svelte';

  const cards = exampleCards.map((json) => parseCard(JSON.stringify(json)));

  deck.set(cards);
</script>

<Navbar>
  <NavbarBrand href="/">RPG Card Generator</NavbarBrand>
</Navbar>
<Container fluid>
  <Row cols="sm-3">
    <Col sm={3}>
      <Sidebar />
    </Col>
    <Col sm>
      <CardEditor />
    </Col>
    <Col sm={3}>
      <CurrentCard />
    </Col>
  </Row>
</Container>
