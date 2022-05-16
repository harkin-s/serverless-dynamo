<script>
	const baseURL =
		"https://hw93br9xm1.execute-api.eu-west-1.amazonaws.com/live/";
	let newItem = {
		creator: null,
		taskDefinition: "",
	};
	let creator = "";
	let todoList = "";
	let error = { message: "not correct", valid: false };

	async function getItems() {
		const respose = await fetch(`${baseURL}list?creator=${creator}`, {
			method: "GET",
		});
		if (respose.ok) {
			const json = await respose.json();
			todoList = json;
			return true;
		}
	}
	async function addToList() {
		try {
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
			}
		} catch (error) {
			error.valid = true;
			error.message = "Error adding item";
		}
	}

	async function removeFromList(index, creator, id) {
		try {
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
		} catch (error) {
			console.log(error);
			error.valid = true;
			error.message = "Error adding item";
		}
	}

	function setCreator() {
		newItem.creator = creator;
	}

	function resetCreator() {
		newItem.creator = null;
	}
</script>

{#if newItem.creator}
	{#await getItems() then}
		<input
			bind:value={newItem.taskDefinition}
			type="text"
			placeholder="new todo item.."
		/>
		<button on:click={addToList}>Add</button>
		{#if error.valid}
			<p>{error.message}</p>
		{/if}
		<br />
		<p>TODOs:</p>
		{#each todoList as item, index}
			<span class:checked={item.status}>OWNER: {item.creator}</span>
			<span>TODO: {item.taskDefinition}</span>
			<span on:click={() => removeFromList(index, item.creator, item.id)}
				>❌</span
			>
			<br />
		{:else}
			<p>No TODOs</p>
		{/each}
		<button on:click={resetCreator}>back</button>
	{/await}
{:else}
	<p>Enter User Name</p>
	<input bind:value={creator} type="text" />
	<button on:click={setCreator}>Add</button>
{/if}

<style>
</style>
