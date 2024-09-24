<script type="ts">
	import { onMount } from "svelte";
	import VScroll from "../VScroll.svelte";
	import { GET, POST } from "../../lib/fetch";
	import { activeConversation } from "../../stores/message.store";

	let suggestedUsers = [];

	onMount(async () => {
		suggestedUsers = await GET("http://localhost:5000/contacts");
	});

	let search = "";

	async function setActiveConversation(user) {
    let data = { recipient_id: user };
    
		let conversation = await POST(
			`http://localhost:5000/conversations/create`,
			{
				body: JSON.stringify(data),
			},
		);
		activeConversation.set(conversation);
	}

	async function searchUser() {}
</script>

<div class="flex flex-col items-center gap-4 mt-8">
	<div class="w-full flex justify-center">
		<form class="w-full" on:submit|preventDefault={searchUser}>
			<input
				on:blur={searchUser}
				bind:value={search}
				type="search"
				placeholder="Search..."
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			/>
		</form>
	</div>
	<VScroll Class="w-full flex flex-col gap-4">
		{#each suggestedUsers as user}
			<div
				class="w-4/5 flex items-center gap-6 mx-8 mt-6 cursor-pointer"
				on:click={() => setActiveConversation(user.id)}
			>
				<div class="rounded-2xl">
					<img
						src={user.profile_picture}
						alt=""
						width="52"
						height="52"
					/>
				</div>
				<div>{user.name.first} {user.name.last}</div>
			</div>
		{/each}
	</VScroll>
</div>
