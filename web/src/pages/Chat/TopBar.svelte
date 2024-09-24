<script>
	import { activeConversation } from './../../stores/message.store.js';
</script>

<div class="flex items-center text-xl gap-4 px-4 py-6">
			<div>
				<img
					src={$activeConversation.recipient.avatar}
					alt=""
					width="48"
					height="48"
				/>
			</div>
			<div>
				{$activeConversation.recipient.first_name}
				{$activeConversation.recipient.last_name}
			</div>
		</div>

