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
					creator,
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

<body>
	<div class="container">
		{#if newItem.creator}
			{#await getItems() then}
				<div id="newtask">
					<input
						bind:value={newItem.taskDefinition}
						type="text"
						placeholder="Add new Task"
					/>
					<button on:click={addToList}>Add</button>
					{#if error.valid}
						<p>{error.message}</p>
					{/if}
				</div>
				<div id="tasks">
					<h3>{creator}'s Tasks:</h3>
					{#each todoList as item, index}
						<div class="task">
							<span id="taskname">{item.taskDefinition}</span>
							<span
								on:click={() =>
									removeFromList(
										index,
										item.creator,
										item.id
									)}>❌</span
							>
						</div>
					{:else}
						<h3>No Tasks</h3>
					{/each}
				</div>

				<div id="logout">
					<button on:click={resetCreator}>Logout</button>
				</div>
			{/await}
		{:else}
			<div id="newtask">
				<p>Enter User Name</p>
				<input bind:value={creator} type="text" />
				<button on:click={setCreator}>Enter</button>
			</div>
		{/if}
	</div>
</body>

<style>
	*,
	*:before,
	*:after {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	body {
		height: 100vh;
		background: #066acd;
	}
	.container {
		width: 40%;
		min-width: 450px;
		position: absolute;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		background: white;
		border-radius: 10px;
	}
	#newtask {
		position: relative;
		padding: 30px 20px;
	}
	#newtask input {
		width: 75%;
		height: 45px;
		font-family: "Poppins", sans-serif;
		font-size: 15px;
		border: 2px solid #d1d3d4;
		padding: 12px;
		color: #111111;
		font-weight: 500;
		position: relative;
		border-radius: 5px;
	}
	#newtask input:focus {
		outline: none;
		border-color: #0d75ec;
	}
	#newtask button {
		position: relative;
		float: right;
		width: 20%;
		height: 45px;
		border-radius: 5px;
		font-family: "Poppins", sans-serif;
		font-weight: 500;
		font-size: 16px;
		background-color: #0d75ec;
		border: none;
		color: #ffffff;
		cursor: pointer;
		outline: none;
	}
	#tasks {
		background-color: #ffffff;
		padding: 30px 20px;
		margin-top: 10px;
		border-radius: 10px;
		width: 100%;
		position: relative;
	}
	#tasks h3 {
		padding-bottom: 10px;
	}
	.task {
		background-color: #c5e1e6;
		height: 50px;
		margin-bottom: 8px;
		padding: 5px 10px;
		display: flex;
		border-radius: 5px;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #939697;
		cursor: pointer;
	}
	.task span {
		font-family: "Poppins", sans-serif;
		font-size: 15px;
		font-weight: 400;
	}
	#logout button {
		position: relative;
		float: left;
		width: 10%;
		height: 45px;
		border-radius: 5px;
		font-family: "Poppins", sans-serif;
		font-weight: 500;
		font-size: 16px;
		background-color: #e61511;
		border: none;
		color: #ffffff;
		cursor: pointer;
		outline: none;
		margin: 15px;
	}
</style>
