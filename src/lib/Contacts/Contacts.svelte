<script>
	import { onMount } from "svelte";
	import VScroll from "../VScroll.svelte";
	import { User, pb } from "../../stores/user.store";

	//@type {pb.authStore.model}
	let suggestedUsers = [];

	onMount(async () => {
		suggestedUsers = (await pb.collection("users").getList(1, 10)).items;
		suggestedUsers = suggestedUsers
			.filter((user) => user.id !== $User.id)
			.map((user) => {
				if (!user.avatar)
					user.avatar =
						"https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
						user.username +
						"&background=%23fff&radius=50";
				return user;
			});
	});

	let search = "";

	async function searchUser() {
		suggestedUsers = (
			await pb.collection("users").getList(1, 10, {
				filter: `username ~ "${search}" || first_name ~ "${search}" || last_name ~ "${search}"`,
			})
		).items
        .filter((user) => user.id !== $User.id)
        .map((user) => {
			if (!user.avatar)
				user.avatar =
					"https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
					user.username +
					"&background=%23fff&radius=50";
			return user;
		});
	}
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
			<div class="w-4/5 flex items-center gap-6 mx-8 mt-6">
				<div class="rounded-2xl">
					<img src={user.avatar} alt="" width="52" height="52" />
				</div>
				<div>{user.first_name} {user.last_name}</div>
			</div>
		{/each}
	</VScroll>
</div>
