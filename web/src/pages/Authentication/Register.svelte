<script>
	import { zRegisterUser } from "../../../../common/zod_schema";
	import {POST} from "../../lib/fetch";
	import { User } from "../../stores/user.store";

	let first_name = "";
	let last_name = "";
	$: username = first_name + last_name;
	let email = "";
	let password = "";
	let error = "";

	let showTerms = true;

	async function register() {
		const data = {
			name: {
				first: first_name,
				last: last_name,
			},
			username,
			email,
			password,
		};

		try {
			zRegisterUser.parse(data);

			const user = await POST("http://localhost:5000/register", {
				body: JSON.stringify(data),
			});
			
			User.set(user);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div>
	<form on:submit|preventDefault={register} class="p-8">
		{#if error}
			<div class="text-red-600 dark:text-red-500 mb-2">
				{error}
			</div>
		{/if}
		<div class="grid gap-8 mb-6 md:grid-cols-2">
			<div>
				<label
					for="first_name"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>First Name:</label
				>
				<input
					type="text"
					id="first_name"
					bind:value={first_name}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div>
				<label
					for="last_name"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Last Name:</label
				>
				<input
					type="text"
					id="last_name"
					bind:value={last_name}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div>
				<label
					for="username"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Username:</label
				>
				<input
					type="text"
					id="username"
					bind:value={username}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
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
		</div>
		<div class="flex items-start mb-4">
			<div class="flex items-center h-5">
				<input
					id="remember"
					type="checkbox"
					value=""
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					required
				/>
			</div>
			<label
				for="remember"
				class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				I agree with the
				<div class="group relative cursor-pointer py-2 inline">
					<div
						class="invisible absolute bottom-7 mb-3 w-80 rounded-md dark:bg-slate-700 px-4 py-2 text-sm text-black group-hover:visible"
					>
						<p class="leading-2 pb-2 pt-2 dark:text-white">
							This is a demo project. Your data may deleted at any
							time.
						</p>
						<svg
							class="absolute bottom-[-10px] z-10"
							width="16"
							height="10"
							viewBox="0 0 16 10"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8 10L0 0L16 1.41326e-06L8 10Z"
								fill="rgb(51 65 85)"
							/>
						</svg>
					</div>
					<span
						class="underline hover:cursor-pointer text-blue-700 dark:text-blue-600"
						>terms and conditions</span
					>
				</div>
			</label>
		</div>
		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Register</button
		>
	</form>
</div>
