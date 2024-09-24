<script>
	import { onMount } from "svelte";
	import { conversations } from "../../stores/message.store";
	import VScroll from "./../VScroll.svelte";
	import Conversation from "./Conversation.svelte";
	import { GET } from "../../lib/fetch";

	onMount(async () => {
		conversations.set(await GET("http://localhost:5000/conversations"));
	});
</script>

<div class="w-full">
	<VScroll>
		{#each $conversations as conv (conv.id)}
			<Conversation conversation={conv} />
		{/each}
	</VScroll>
</div>
