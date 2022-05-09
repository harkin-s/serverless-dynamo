<script>
	const baseURL =
		"https://jpofvz1x5m.execute-api.eu-west-1.amazonaws.com/live/";
	let newItem = "";

	let todoList = [1, 2, 3];

	async function getTodos() {
		const respose = await fetch(`${baseURL}list`, {
			method: "GET",
		});

		const json = await respose.json();
		console.log(json);
		todoList = [json];
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
	<!-- {#each todoList as item, index}
		<input bind:checked={item.status} type="checkbox" />
		<span class:checked={item.status}>{item.text}</span>
		<span on:click={() => removeFromList(index)}>❌</span>
		<br />
	{/each} -->
{/await}

<style>
	.checked {
		text-decoration: line-through;
	}
</style>
