<script>
	import Login from "./Login.svelte";
	import Register from "./Register.svelte";
	let activeTab = "login";

	let activeLogin = "bg-blue-500 text-white";
	let activeRegister = "text-blue-500";

	function activateLogin() {
		activeTab = "login";
		activeLogin = "bg-blue-500 text-white border-b";
		activeRegister = "text-blue-500";
	}

	function activateReg() {
		activeTab = "register";
		activeLogin = "text-blue-500";
		activeRegister = "bg-blue-500 text-white border-b";
	}
</script>

<style>
    button {
        transition: background 0.2s ease-in-out;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>

<div class="md:min-h-[480px] md:min-w-[680px]">
	<div class="flex px-2">
		<button
			class="py-2 px-4 {activeLogin} font-semibold"
			class:active={activeTab === "login"}
			on:click={() => activateLogin()}
		>
			Login
		</button>
		<button
			class="py-2 px-4 {activeRegister} font-semibold"
			class:active={activeTab === "register"}
			on:click={() => activateReg()}
		>
			Register
		</button>
	</div>

	{#if activeTab === "login"}
		<Login />
	{:else}
		<Register />
	{/if}
</div>
