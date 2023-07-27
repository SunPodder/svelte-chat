<script>
	import { selectedConversation } from './../../stores/message.store.js';
</script>

<div class="flex items-center text-xl gap-4 px-4 py-6">
			<div>
				<img
					src={$selectedConversation.recipient.avatar}
					alt=""
					width="48"
					height="48"
				/>
			</div>
			<div>
				{$selectedConversation.recipient.first_name}
				{$selectedConversation.recipient.last_name}
			</div>
		</div>

