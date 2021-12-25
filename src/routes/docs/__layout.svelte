<script>
  import '../../styles/documentation.scss';
  import '../../styles/prism/gh.css';
</script>

<div class="content">
  <slot />
</div>

<style lang="scss">
  .content {
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;

    width: 800px;
    max-width: 100%;
  }
</style>
