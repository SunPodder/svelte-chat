<script>
	import { selectedConversation } from './../../stores/message.store.js';
	import { User, pb } from "../../stores/user.store";

	export let conversation;
	$: recipient = conversation.recipient;
</script>

<div class="flex mt-8 px-6 py-2 gap-6 hover:bg-slate-700"
	role="button" tabindex="0"
	on:keydown={(e) => {
		if (e.key == "Enter") {
			selectedConversation.set(conversation.id);
		}
	}}
	on:click={() => selectedConversation.set(conversation)}>
	<div>
		<img src={recipient.avatar} alt="" width="52" height="52" class="rounded-full" />
	</div>
	<div class="flex flex-col">
		<div>
			{recipient.first_name}
			{recipient.last_name}
		</div>
		<div>
            {#if conversation.lastMessage.sender == $User.id}
                You:
            {/if}
            {conversation.lastMessage.content}
        </div>
	</div>
</div>
