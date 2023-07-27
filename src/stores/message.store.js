import { get, writable } from "svelte/store";
import { pb, User } from "./user.store";

export const conversations = writable([]);
export const messages = writable([]);
export const selectedConversation = writable(null);

(async () => {
    let res = await pb.collection("conversations").getFullList({
        expand: 'users'
    });
    await Promise.all(
        res.map(async (conv) => {
            conv.expand.users.map((user) => {
                if (!user.avatar)
                    user.avatar =
                        "https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
                        user.username +
                        "&background=%23fff&radius=50";
                return user;
            });
            const lastMsg = await pb
                .collection("messages")
                .getFirstListItem(`conversation="${conv.id}"`, {
                    sort: "-created",
                });
  
            if(lastMsg.content == 'null')
                lastMsg.content = "📎 Attachment";

            conv.lastMessage = lastMsg;
            conv.recipient = conv.expand.users[0].id == get(User).id
                ? conv.expand.users[1]
                : conv.expand.users[0];

            return conv;
        })
    );

    conversations.set(res);

    pb.collection("conversations").subscribe("*", async ({ action, record }) => {

    });

    pb.collection("messages").subscribe("*", async ({ action, record }) => {
        if (action === "create") {
			const sender = await pb.collection("users").getOne(record.sender);
            if (!sender.avatar)
                sender.avatar =
                    "https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
                    sender.username +
                    "&background=%23fff&radius=50";

            conversations.update(function(convs){
          		//update the conversation object where conv.id == record.conversation
				convs = convs.map(c => {
					if(c.id == record.conversation){
                        let content = record.content;
                        if(content.length > 20)
                            content = content.substring(0, 20) + "...";
                        if(content == 'null')
                            content = "📎 Attachment";
						c.lastMessage = {
							content: content,
							sender: record.sender,
						}
                    }
                	return c;
				})
                return convs;
			})

            if(record.conversation == get(selectedConversation).id){
                record.sender = sender;
                messages.update(function(msgs){
                    msgs.push(record);
                    return msgs;
                })
            }
        }
    });
})();