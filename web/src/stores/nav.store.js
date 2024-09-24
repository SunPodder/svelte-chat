import { writable } from "svelte/store";
import Home from "../pages/Home/Home.svelte";

export let activeRoute = writable(Home);