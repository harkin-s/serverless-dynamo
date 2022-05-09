<script>
	import { onMount } from "svelte";

	onMount(async () => {
		fetch(
			"https://hw93br9xm1.execute-api.eu-west-1.amazonaws.com/live/list"
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	});
</script>

<main>
	<h1>Whiskey Drinks Menu</h1>
</main>

<style>
</style>
