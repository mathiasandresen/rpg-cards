<script lang="ts">
  import 'ress/dist/ress.min.css';
  import { Icon, Nav, NavItem, NavLink, Styles } from 'sveltestrap';
  import { Container, Row, Col, Navbar, NavbarBrand } from 'sveltestrap';
  import Sidebar from '../components/sidebar.svelte';
  import CardEditor from '../components/card-editor.svelte';
  import CurrentCard from '../components/current-card.svelte';
</script>

<Styles />

<Navbar color="light" light class="shadow-sm">
  <NavbarBrand href="/">RPG Card Generator</NavbarBrand>
  <Nav navbar>
    <NavItem>
      <NavLink href="https://github.com/mathiasandresen/rpg-cards">
        <Icon name="github" />
      </NavLink>
    </NavItem>
  </Nav>
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
    margin-top: 1em;

    @media (min-width: 992px) {
      grid-template-columns: 0.5fr 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-columns: 0.5fr 1fr 0.5fr;
    }
  }
</style>
