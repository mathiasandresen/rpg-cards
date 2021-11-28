<script lang="ts">
	import type Card from '../model/card';
	import CardContent from './card-content.svelte';

	export let card: Card;
</script>

<div class="rpg-card-wrapper">
	<div class="rpg-card">
		<h1>{card.title}</h1>
		{#each card.contents as content}
			<CardContent {content} />
		{/each}
	</div>
</div>

<style lang="scss">
	$border-width: 0.3cm;

	h1 {
		margin: 0;
	}

	.rpg-card-wrapper {
		width: 2.5in;
		height: 3.5in;

		box-sizing: border-box;
		border: $border-width solid red;
		border-radius: 0.25cm;
		background-color: red;
	}

	.rpg-card {
		display: flex;
		flex-direction: column;
		// gap: 0.2rem;
		height: 100%;

		font-size: 10px;

		border-radius: 0.1cm;
		background-color: white;

		h1 {
			font-size: 1.3em;
			text-transform: uppercase;
			text-align: center;
			font-weight: bold;
		}
	}
</style>
