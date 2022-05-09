<script>
	const baseURL =
		"https://hw93br9xm1.execute-api.eu-west-1.amazonaws.com/live/";
	let newItem = "";

	let todoList = [1, 2, 3];

	async function getTodos() {
		const respose = await fetch(`${baseURL}list`, {
			method: "GET",
		});
		console.log(respose);
		todoList = respose.body;
	}

	function addToList() {
		todoList = [...todoList, { text: newItem, status: false }];
		newItem = "";
	}

	function removeFromList(index) {
		todoList.splice(index, 1);
		todoList = todoList;
	}
</script>

<input bind:value={newItem} type="text" placeholder="new todo item.." />
<button on:click={addToList}>Add</button>

<br />
{#await getTodos()}
	<p>Getting todos</p>
{:then todoList}
	{#each todoList as item, index}
		<input bind:checked={item.status} type="checkbox" />
		<span class:checked={item.status}>{item.text}</span>
		<span on:click={() => removeFromList(index)}>❌</span>
		<br />
	{/each}
{/await}

<style>
	.checked {
		text-decoration: line-through;
	}
</style>
