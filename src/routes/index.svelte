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
<div class="grid">
  <Sidebar />
  <CardEditor />
  <CurrentCard />
</div>

<style lang="scss">
  .grid {
    display: grid;
    gap: 2em;
    padding: 0 1em;

    @media (min-width: 992px) {
      grid-template-columns: 0.5fr 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-columns: 0.5fr 1fr 0.5fr;
    }
  }
</style>
