import { get, writable } from "svelte/store";

export const conversations = writable([]);
export const messages = writable([]);
export const activeConversation = writable(null);
