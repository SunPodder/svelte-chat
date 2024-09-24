<script>
	import { User } from "../../../stores/user.store";
	import MessageContent from "./MessageContent.svelte";

	export let msg;
	$: attachments = msg.attachments.map((img) => {
		return `http://127.0.0.1:8090/api/files/messages/${msg.id}/${img}`;
	});
</script>

{#if msg.sender.id == $User.id}
	<div class="flex items-end w-full justify-end gap-2">
		<MessageContent {msg} {attachments} />
		<div>
			<img src={msg.sender.avatar} alt="" width="42" height="42" />
		</div>
	</div>
{:else}
	<div class="flex items-end gap-2">
		<div>
			<img src={msg.sender.avatar} alt="" width="42" height="42" />
		</div>
		<MessageContent {msg} {attachments} />
	</div>
{/if}
