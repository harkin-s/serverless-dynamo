<script>
	import { onMount } from "svelte";

	const baseURL =
		"https://hw93br9xm1.execute-api.eu-west-1.amazonaws.com/live/";
	let newItem = {
		creator: "ma",
		taskDefinition: "",
	};

	let todoList = "";

	onMount(async () => {
		const respose = await fetch(`${baseURL}list`, {
			method: "GET",
		});
		const json = await respose.json();
		todoList = json;
	});

	async function addToList() {
		const res = await fetch(`${baseURL}add`, {
			method: "PUT",
			body: newItem,
		});

		const json = await res.json();
		result = JSON.stringify(json);
	}

	function removeFromList(index) {
		todoList.splice(index, 1);
		todoList = todoList;
	}
</script>

<input
	bind:value={newItem.taskDefinition}
	type="text"
	placeholder="new todo item.."
/>
<button on:click={addToList}>Add</button>

<br />

{#each todoList as item, index}
	<input bind:checked={item.status} type="checkbox" />
	<span class:checked={item.status}>{item.creator}</span>
	<span>{item.taskDefinition}</span>
	<span on:click={() => removeFromList(index.id)}>❌</span>
	<br />
{:else}
	<p>wati</p>
{/each}

<style>
	.checked {
		text-decoration: line-through;
	}
</style>
