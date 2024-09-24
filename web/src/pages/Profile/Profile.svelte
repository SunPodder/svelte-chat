<script>
	import { User } from "../../stores/user.store";

	let email = $User.email;
	let username = $User.username;
	let profile_picture = $User.profile_picture;
	let first_name = $User.name.first;
	let last_name = $User.name.last;
	let password = "";
	let old_password = "";

	async function updateUSer() {
        if(!email || !username || !first_name || !last_name) {
            return;
        }

        const data = {
            email,
            username,
            first_name,
            last_name,
        }
        if(password && old_password) {
            data.password = password;
            data.passwordConfirm = password;
            data.old_password = old_password;
        }

        const record = await pb.collection('users').update($User.id, data);
        if(!record.avatar) record.avatar = $User.avatar;
        User.set(record);
    }
</script>

<div class="px-8">
	<h1 class="text-2xl p-6">
		{$User.username}
	</h1>
	<div>
		<form on:submit|preventDefault={updateUSer}>
            <div class="grid place-items-center">
                <img
                    src={$User.profile_picture}
                    alt=""
                    width="256"
                    height="256"
                    class="rounded-full"
                />
            </div>
			<div class="grid gap-8 mb-6 md:grid-cols-2 mt-12">
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
						for="old_password"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Old Password:</label
					>
					<input
						type="text"
						id="0ld_password"
						bind:value={old_password}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div>
					<label
						for="password"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>New Password:</label
					>
					<input
						type="text"
						id="password"
						bind:value={password}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
			</div>
			<button
				type="submit"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Update</button
			>
		</form>
	</div>
</div>
