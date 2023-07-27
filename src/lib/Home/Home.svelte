<script>
	import { conversations } from "../../stores/message.store";
	import VScroll from "./../VScroll.svelte";
	import Conversation from "./Conversation.svelte";
</script>

<div class="w-full">
	<VScroll>
		{#each $conversations as conv (conv.id)}
			<Conversation conversation={conv} />
		{/each}
	</VScroll>
</div>
