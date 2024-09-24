<script type="ts">
	import MessageInput from "./MessageInput.svelte";
	import TopBar from "./TopBar.svelte";
	import Message from "./Message/Message.svelte";
	import { messages, activeConversation } from "../../stores/message.store";
	import { GET } from "../../lib/fetch";
	import { onMount } from "svelte";

	onMount(async () => {
		if ($activeConversation != null) {
			let m = await GET(
				`http://localhost:5000/messages/${$activeConversation.id}`,
			);
			messages.set(m);
		}
	});
</script>

{#if $activeConversation != null}
	<div class="w-full h-full shadow-xl">
		<TopBar />
		<div class="h-[80%] px-8 py-6 flex flex-col gap-6">
			{#each $messages as msg}
				<Message {msg} />
			{/each}
		</div>
		<MessageInput />
	</div>
{:else}
	<div class="grid place-items-center h-full w-full shadow-xl">
		<div>Select a conversation to start chatting</div>
	</div>
{/if}
