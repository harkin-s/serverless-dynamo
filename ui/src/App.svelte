<script>
	import { onMount } from "svelte";

	const baseURL =
		"https://hw93br9xm1.execute-api.eu-west-1.amazonaws.com/live/";
	let newItem = {
		creator: "ma",
		taskDefinition: "",
	};
	let todoList = "";
	let addError = true;

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
			body: JSON.stringify(newItem),
		});

		if (res.ok) {
			todoList = [newItem, ...todoList];
			newItem = {
				creator: "ma",
				taskDefinition: "",
			};
		} else {
			addError = true;
		}
	}

	async function removeFromList(index, creator, id) {
		const res = await fetch(
			`${baseURL}remove?creator=${creator}&id=${id}`,
			{
				method: "DELETE",
			}
		);

		if (res.ok) {
			todoList.splice(index, 1);
			todoList = todoList;
		}
	}
</script>

<input
	bind:value={newItem.taskDefinition}
	type="text"
	placeholder="new todo item.."
/>
<button on:click={addToList}>Add</button>
{#if addError}
	<p>Fades in and out</p>
{/if}
<br />

{#each todoList as item, index}
	<input bind:checked={item.status} type="checkbox" />
	<span class:checked={item.status}>{item.creator}</span>
	<span>{item.taskDefinition}</span>
	<span on:click={() => removeFromList(index, item.creator, item.id)}>❌</span
	>
	<br />
{:else}
	<p>wati</p>
{/each}

<style>
	.checked {
		text-decoration: line-through;
	}
</style>
