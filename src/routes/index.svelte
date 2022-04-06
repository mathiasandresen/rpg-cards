<script lang="ts">
  import 'ress/dist/ress.min.css';
  import {
    Accordion,
    AccordionItem,
    Icon,
    Image,
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
</script>

<Navbar id="navbar" color="light" light class="shadow-sm">
  <NavbarBrand href="/">
    <div class="navbar-logo">
      <Image src="/logo-128.png" height="32" />
      RPG Card Generator
    </div>
  </NavbarBrand>

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
  <CardEditor />
  <CurrentCard />
</div>
<Modal header="Info" class="info-modal" isOpen={infoModalOpen} toggle={toggleInfoModal}>
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
      grid-template-columns: 400px 1fr 0.5fr;
    }
  }

  :global(#navbar) {
    padding-left: 1em;
    padding-right: 1em;
  }

  .nav-icons {
    display: flex;
    flex-direction: row;
    gap: 1.5em;
  }

  .navbar-logo {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    color: var(--bs-primary);
    font-weight: 500;
  }
  :global(.navbar-icon) {
    font-size: 1.5em;
    color: var(--bs-primary);
  }

  .info-modal-text {
    padding: 1em;
  }

  :global(.info-modal) {
    $width: 700px;
    margin: 0 auto;
    @media (min-width: $width) {
      min-width: $width;
    }
  }

  :global(.modal) {
    overflow-y: scroll;
  }
</style>
