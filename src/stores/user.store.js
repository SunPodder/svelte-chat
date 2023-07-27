import { writable } from "svelte/store";
import PocketBase from "pocketbase";

export let pb = new PocketBase('http://localhost:8090');
export let User = writable(pb.authStore.model);


pb.authStore.onChange((token, model) => {
    if (model && !model.avatar)
        model.avatar = "https://api.dicebear.com/6.x/pixel-art/svg?seed=" + model.username + "&background=%23fff&radius=50";
    User.set(model);
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});

pb.authStore.loadFromCookie(document.cookie);
if (pb.authStore.isValid) pb.collection('users').authRefresh();
