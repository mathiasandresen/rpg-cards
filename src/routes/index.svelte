<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { getCurrentCardFromLocalStorage, getDeckFromLocalStorage } from '../stores';
  import type Card from '$model/card';

  export const load: Load = async ({ page, fetch, session, stuff }) => {
    const current = getCurrentCardFromLocalStorage();
    const deck = getDeckFromLocalStorage();

    const card = current > -1 ? deck[current] : undefined;

    return {
      status: 200,
      props: {
        card: card
      }
    };
  };
</script>

<script lang="ts">
  import 'ress/dist/ress.min.css';
  import {
    Accordion,
    AccordionItem,
    Icon,
    Modal,
    ModalBody,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap';
  import { Navbar, NavbarBrand } from 'sveltestrap';
  import Sidebar from '$components/sidebar.svelte';
  import CardEditor from '$components/card-editor.svelte';
  import CurrentCard from '$components/card/current-card.svelte';
  import InfoContent from '../content/info.svx';
  import ThanksAndLicensesContent from '../content/thanks-and-licenses.svx';

  let infoModalOpen = false;
  const toggleInfoModal = () => (infoModalOpen = !infoModalOpen);

  export let card: Card;
</script>

<Navbar color="light" light class="shadow-sm">
  <NavbarBrand href="/">RPG Card Generator</NavbarBrand>

  <Nav navbar>
    <div class="nav-icons">
      <NavItem>
        <NavLink href="https://github.com/mathiasandresen/rpg-cards">
          <Icon name="github" class="navbar-icon" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink on:click={toggleInfoModal}>
          <Icon name="info-circle-fill" class="navbar-icon" />
        </NavLink>
      </NavItem>
    </div>
  </Nav>
</Navbar>
<div class="grid">
  <Sidebar />
  <CardEditor {card} />
  <CurrentCard {card} />
</div>
<Modal header="Info" isOpen={infoModalOpen} toggle={toggleInfoModal}>
  <ModalBody class="p-0">
    <div class="info-modal-text">
      <InfoContent />
    </div>
    <Accordion flush>
      <AccordionItem header="Thanks and licenses">
        <ThanksAndLicensesContent />
      </AccordionItem>
    </Accordion>
  </ModalBody>
</Modal>

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

  .nav-icons {
    display: flex;
    flex-direction: row;
    gap: 1.5em;
  }
  :global(.navbar-icon) {
    font-size: 1.5em;
  }

  .info-modal-text {
    padding: 1em;
  }
</style>
