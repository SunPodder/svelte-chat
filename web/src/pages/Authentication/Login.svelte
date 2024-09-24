<script type="ts">
	import { zLoginUser } from "../../../../common/zod_schema";
	import {POST} from "../../lib/fetch";
	import { User } from "../../stores/user.store";
	let email = "";
	let password = "";
	let error = null;

	async function login() {
		try {
			zLoginUser.parse({ email, password });

			let user = await POST("http://localhost:5000/login", {
				body: JSON.stringify({ email, password }),
			});

			User.set(user);
		} catch (err) {
			error = err.errors;
			console.log(err.errors);
		}
	}
</script>

<div>
	<form on:submit|preventDefault={login} class="p-8">
		<div class="grid gap-8 mb-6 md:grid-cols-2">
			<div>
				<label
					for="email"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Email:</label
				>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div>
				<label
					for="password"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Password:</label
				>
				<input
					type="text"
					id="password"
					bind:value={password}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			{#if error}
				<div>
					{#each error as err}
						<p class="text-red-600 dark:text-red-500 mb-2">{err.message}</p>
					{/each}
				</div>
			{/if}
		</div>
		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Login</button
		>
	</form>
</div>
