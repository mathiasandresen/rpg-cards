<script lang="ts">
  import type Card from '../model/card';
  export let card: Card;
</script>

<div
  class="rpg-card-wrapper"
  style="--card-color: {card.color}; --card-text-size: {card.layout?.text_font_size ?? '10px'}"
>
  <div class="rpg-card">
    <div class="line">
      <div class="content-top">
        <div class="content">
          <p>1</p>
        </div>
      </div>
      <div class="icon-wrapper">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          ><g class="" transform="translate(0,0)" style=""
            ><path
              d="M247.79 18.734C137.967 17.596 19.874 96.94 19.73 244.53l21.403-51.395c-9.485 72.28-7.75 147.236 38.79 202.502L38.2 377.355c39.24 69.774 126.333 90.976 200.855 92.51C124.11 429.9 67.87 342.277 63.912 246.492c-6.722-211.78 260.658-217.694 340.78-75.77-3.417-19.492-8.623-38.426-15.618-56.11 77.406 89.155 59.293 214.875-21.29 253.036-24.25 3.95-48.93 12.06-60.954 19-58.548 33.802-6.27 126.536 53.225 92.188 9.44-5.45 23.404-17.303 36.494-31.352 64.36-59.52 98.1-118.24 93.108-188.94-6.52 29.1-19.175 57.904-35.623 84.683 63.158-146.822 7.956-263.89-144.838-301.354 12.097 5.835 23.503 13.63 33.873 23.36-57.415-23.752-131.123-22.62-186.884 3.505 28.066-26.2 64.776-43.73 102.2-49.642-3.52-.205-7.054-.325-10.597-.362zm-19.74 160.202l-19.843 100.566c-2.958 3.81-5.64 6.852-9.033 9.94l-25.688-49.096-22.705 11.93 31.37 60.945c4.48 11.474 10.02 20.68 15.162 28.524 28.063 42.803 64.547 35.252 95.303 9.555l87.28-48.452-12.71-22.498-66.136 36.94c-1.517-3.154-3.266-6.552-5.056-9.51l67.818-64.96-17.54-18.695-66.47 63.762c-2.356-2.318-4.238-4.527-6.765-6.54l45.084-78.085-22.733-13.127-45.864 78.297c-3.79-1.31-7.72-2.2-11.595-2.745l15.656-81.896-25.533-4.854z"
              fill="#fff"
              fill-opacity="1"
            /></g
          ></svg
        >
      </div>
      <div class="content-bottom">
        <div class="content">
          <p>1</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  $border-width: 0.3cm;
  $border-radius: 0.25cm;

  .rpg-card-wrapper {
    width: 2.5in;
    height: 3.5in;
    background-color: var(--card-color);

    box-sizing: border-box;
    border: $border-width solid var(--card-color);
    border-radius: $border-radius;
    background-color: var(--card-color);
  }

  .rpg-card {
    height: 100%;
    border-radius: $border-radius;
    padding: 0.75em;
    /* background-color: white; */
    background: radial-gradient(ellipse at center, white 20%, var(--card-color) 120%);
  }

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--card-color);
    padding: 1em;
    border-radius: 1em;
  }

  .line {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    width: 100%;
    border: 0.25em solid var(--card-color);
    border-radius: $border-radius;
  }

  .icon {
    height: 5rem;
  }

  .content-top {
    display: flex;
    width: 100%;
    justify-content: end;
  }

  .content-bottom {
    display: flex;
    width: 100%;
    justify-content: start;
  }

  .content {
    width: 4em;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
      padding: 0;
      font-size: 3em;
      font-weight: bold;
      color: var(--card-color);
    }
  }
</style>
