<script>
  import '../../styles/documentation.scss';
  import '../../styles/prism/gh.css';
</script>

<div class="content">
  <slot />
</div>

<style lang="scss">
  .content {
    $width: 800px;

    padding: 2rem 1rem;
    margin: 0 auto;

    width: $width;
    max-width: 100%;

    @media (min-width: $width) {
    }
  }
</style>
