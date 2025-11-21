<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { scrollY } from 'svelte/reactivity/window';
	import { ArrowRight, ArrowDown, Landmark, Hospital, User, Activity } from '@lucide/svelte';
	import SlideButton from '$lib/components/SlideButton.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from './ui/button/button.svelte';

	let position = $state('bottom');
	let menuItems = $state([
		{ name: 'Features', href: '#features', label: 'Features' },
		{ name: 'About', href: '#about', label: 'About' },
		{ name: 'How it works', href: '#process', label: 'How it works' },
		{ name: 'Testimonials', href: '#testimonials', label: 'Testimonials' }
	]);

	let menuState = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	// Use $derived for computed values
	let isScrolled = $derived(
		mounted && browser && scrollY.current !== undefined && scrollY.current > 50
	);

	// Smooth scroll function
	function smoothScroll(event: MouseEvent, targetId: string) {
		if (!browser) return;

		event.preventDefault();

		const targetElement = document.querySelector(targetId);
		if (!targetElement) return;

		const headerOffset = 80;
		const elementPosition = targetElement.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});

		menuState = false;
	}
</script>

<!-- Header -->
<header
	class="fixed top-0 right-0 left-0 z-50 w-full bg-white py-4 transition-all duration-300"
	class:bg-white={isScrolled}
	class:shadow-md={isScrolled}
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6">
		<!-- Logo (10%) -->
		<a href="/" class="flex w-[10%] items-center text-2xl">
			<Activity class="h-5 w-5 text-blue-500" />
			<span class="border-blue-300 p-2 font-bold">
				Heal<span class="text-blue-500">Pro.</span>
			</span>
		</a>

		<!-- Navigation (60%) -->
		<nav class="hidden w-[60%] items-center justify-center gap-8 md:flex">
			{#each menuItems as item}
				<a
					href={item.href}
					class="font-medium text-gray-800 transition-colors hover:text-blue-600"
					onclick={(e) => smoothScroll(e, item.href)}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- login Button (30%) -->
		<div class="flex w-[30%] items-center justify-end gap-2">
			<div>
				<SlideButton title="Login" rounded="full" icon={ArrowRight} href="/login" width="w-auto" />
			</div>
			<div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="hidden items-center justify-center rounded-lg border-2 border-blue-600 px-4 py-2 text-blue-500 transition-colors hover:bg-blue-50 md:flex"
					>
						Register
						<ArrowDown class="ml-1 h-4 w-4" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="z-50 w-30">
						<DropdownMenu.Group>
							<DropdownMenu.Item onSelect={() => (window.location.href = '/register?type=user')}>
								<User class="mr-2 h-4 w-4" />
								<span>Patient</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item
								onSelect={() => (window.location.href = '/register?type=hospital')}
							>
								<Hospital class="mr-2 h-4 w-4" />
								<span>Hospital</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item onSelect={() => (window.location.href = '/register?type=hmo')}>
								<Landmark class="mr-2 h-4 w-4" />
								<span>HMO</span>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</div>
</header>
