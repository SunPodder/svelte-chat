<script>
	import { User } from './../../stores/user.store.js';
	import { get } from "svelte/store";
	import { pb } from "../../stores/user.store";
	import { selectedConversation } from "../../stores/message.store";
	let inputImage = [];
	let previewImage = [];
	let inputText = null;

	async function handleImageInput(e) {
		inputImage = [...e.target.files];
		let p = []
		for (let i = 0; i < inputImage.length; i++) {
			p.push(await getImageSource(inputImage[i]));
		}
		previewImage = p;
	}

	async function getImageSource(img) {
		let result_base64 = await new Promise((resolve) => {
			let fileReader = new FileReader();
			fileReader.onload = (e) => resolve(fileReader.result);
			fileReader.readAsDataURL(img);
		});
		return result_base64;
	}

	function removeImage(img){
		previewImage = previewImage.filter((i) => i !== img);
	}

	async function sendMsg(){
		const formData = new FormData();
		for(let i = 0; i < inputImage.length; i++){
			formData.append("attachments", inputImage[i]);
		}
		formData.append("content", inputText);
		formData.append("conversation", $selectedConversation.id);
		formData.append("sender", $User.id);

		await pb.collection("messages").create(formData);
	}
</script>

<div class="relative">
	{#if previewImage.length}
		<div class="absolute translate-y-[-100%] w-full h-20 flex items-center shadow-lg">
			{#each previewImage as img}
				<div class="w-fit h-fit ml-4 relative">
					<div class="absolute right-[5px] top-[5px] hover:cursor-pointer" role="button" tabindex="0" on:click={() => removeImage(img)} on:keydown={() => removeImage(img)} >
						<svg height="10" width="10" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512"><path class="dark:fill-white" d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>
					</div>
					<img src={img} alt="" height="64" width="64" class="rounded-xl"/>
				</div>
			{/each}
		</div>
	{/if}
	<form on:submit|preventDefault={sendMsg}>
		<div class="flex px-4 py-2 gap-2">
			<div>
				<label for="imgInput" class="cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="39"
						viewBox="0 0 384 512"
						fill="white"
						><path
							d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6H216 176 128 80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z"
						/></svg
					>
				</label>
				<input
					type="file"
					id="imgInput"
					class="hidden"
					multiple
					on:input={handleImageInput}
				/>
			</div>
			<div class="flex-grow">
				<input
					type="text"
					class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					bind:value={inputText}
					/>
			</div>
			<div>
				<button type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="39"
						viewBox="0 0 512 512"
						fill="white"
						><path
							d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
						/></svg
					>
				</button>
			</div>
		</div>
	</form>
</div>
