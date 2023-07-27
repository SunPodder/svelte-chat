<script>
	import MessageInput from "./MessageInput.svelte";

	import TopBar from "./TopBar.svelte";

	import Message from "./Message/Message.svelte";

	import { messages, selectedConversation } from "../../stores/message.store";
	import { pb } from "../../stores/user.store";

	$: {
		if ($selectedConversation != null) {
			(async function () {
				let res = (
					await pb.collection("messages").getList(1, 50, {
						filter: `conversation="${$selectedConversation.id}"`,
						expand: "sender",
						sort: "created",
					})
				).items;

				await Promise.all(
					res.map(async (msg) => {
						if (!msg.expand.sender.avatar)
							msg.expand.sender.avatar =
								"https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
								msg.expand.sender.username +
								"&background=%23fff&radius=50";

						msg.sender = msg.expand.sender;
						return msg;
					})
				);
				messages.set(res);
			})();
		}
	}
</script>

{#if $selectedConversation != null}
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
