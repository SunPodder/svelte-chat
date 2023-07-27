import { writable } from "svelte/store";
import Home from "../lib/Home/Home.svelte";

export let activeRoute = writable(Home);