<script>
	export let msg;
	export let attachments = [];
</script>

<div class="flex flex-col gap-2">
	{#if attachments.length != 0}
		<div class="flex gap-2">
			{#each attachments as img}
				<img src={img} alt="" width="128" height="128" class="rounded-xl" />
			{/each}
		</div>
	{/if}

	{#if msg.content != "null"}
		<div class="flex justify-end">
			<div
				class="dark:bg-slate-500 rounded-lg py-2 px-4 w-fit"
			>
				{msg.content}
			</div>
		</div>
	{/if}
</div>
