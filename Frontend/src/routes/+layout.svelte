<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isNavigating = $state(false);

	beforeNavigate(() => {
		isNavigating = true;
	});

	afterNavigate(() => {
		isNavigating = false;
	});
</script>

{#if isNavigating}
	<div class="fixed top-0 right-0 left-0 z-50 h-1 bg-blue-500"></div>
{/if}

{@render children()}
<Toaster position="top-center"   class="flex justify-center"/>
