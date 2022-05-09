<script>
	import { onMount } from "svelte";

	onMount(async () => {
		fetch("https://jsonplaceholder.typicode.com/todos/1'")
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
