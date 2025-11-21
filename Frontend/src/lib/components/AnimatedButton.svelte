<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Component } from 'svelte';

	interface Props {
		title: string;
		rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
		icon: Component;
		href?: string;
		width?: string;
		class?: string;
	}

	let {
		title,
		rounded = 'full',
		icon: Icon,
		href,
		width = 'w-1/2',
		class: className = '',
		...restProps
	}: Props = $props();

	const roundedClasses = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		full: 'rounded-full'
	};
</script>

<Button
	{href}
	class="font-nunito group flex {width} items-center justify-between {roundedClasses[
		rounded
	]} bg-blue-600 p-6 text-base font-bold text-white transition-all duration-500 hover:bg-blue-700 {className}"
	{...restProps}
>
	<div class="relative h-6 flex-1 overflow-hidden text-center">
		<span
			class="absolute inset-0 flex items-center justify-center opacity-100 transition-transform duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0"
		>
			{title}
		</span>
		<span
			class="absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
		>
			{title}
		</span>
	</div>
	<div class="relative h-8 w-8 overflow-hidden {roundedClasses[rounded]}">
		<div
			class="absolute inset-0 flex items-center justify-center {roundedClasses[
				rounded
			]} bg-white opacity-100 transition-all duration-500 ease-in-out group-hover:translate-x-full group-hover:opacity-0"
		>
			<Icon class="h-4 w-4 text-blue-600" />
		</div>
		<div
			class="absolute inset-0 flex -translate-x-full items-center justify-center {roundedClasses[
				rounded
			]} border-2 border-white bg-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
		>
			<Icon class="h-4 w-4 text-white" />
		</div>
	</div>
</Button>
