<script>
	import { Separator } from '$lib/components/ui/separator/index.js';
	// Svelte 5 props using runes
	let { text = 'Section Title' } = $props();
</script>

<div>
	<h2 class="mb-4 mt-4 text-xl font-semibold text-gray-900">{text}</h2>
	<Separator class="-mt-2 mb-6" />
</div>
