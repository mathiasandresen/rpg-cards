<script lang="ts">
  import 'ress/dist/ress.min.css';
  import { Styles } from 'sveltestrap';
  import { Container, Row, Col, Navbar, NavbarBrand } from 'sveltestrap';
  import Sidebar from '../components/sidebar.svelte';
  import CardEditor from '../components/card-editor.svelte';
  import CurrentCard from '../components/current-card.svelte';
</script>

<Styles />

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
