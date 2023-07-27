<script>
	import Nav from "./lib/Nav.svelte";
	import Authentication from "./lib/Authentication/Authentication.svelte";
	import { activeRoute } from "./stores/nav.store";
	import Chat from "./lib/Chat/Chat.svelte";
	import { User } from "./stores/user.store";
</script>

<main class="dark:bg-slate-800 w-screen h-screen">
	{#if $User}
		<div class="h-full w-full flex">
			<div class="w-[80px] h-full">
				<Nav />
			</div>
			<div class="w-1/3 md:w-1/4 h-full lg:ml-8">
				<svelte:component this={$activeRoute} />
			</div>
			<div class="w-2/5 h-full mx-8">
				<Chat />
			</div>
			<!-- ads -->
		</div>
	{:else}
		<div class="w-full h-full grid place-items-center">
			<Authentication />
		</div>
	{/if}
</main>
