<script lang="ts">
	import { page } from '$app/stores';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Search, Bell, Settings } from '@lucide/svelte';
	import { facilityNavItems, getPageTitle } from '$lib/config/navigation';
	import NavigationSidebar from '$lib/components/NavigationSidebar.svelte';

	let { children } = $props();

	// Using Svelte 5 runes for reactive state
	let activeTab = $state('All');
	let searchQuery = $state('');

	let pageTitle = $derived(getPageTitle($page.url.pathname, 'facility'));
</script>

<Sidebar.Provider>
	<NavigationSidebar
		currentPath={$page.url.pathname}
		navItems={facilityNavItems}
		brandName="HealPro."
		brandUrl="/"
	/>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-8 shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<!-- Left Section: Trigger and Page Title -->
			<div class="flex items-center gap-2">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<h1 class="text-xl font-semibold text-gray-900">{pageTitle}</h1>
			</div>

			<!-- Right Section: Search and User -->
			<div class="flex items-center gap-4">
				<div class="relative">
					<input
						type="text"
						placeholder="Search doctors or specialist..."
						class="w-80 rounded-full border border-gray-200 bg-[#f8fafc] px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none"
						bind:value={searchQuery}
					/>
					<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
				</div>
				<button
					class="rounded-full bg-white p-2 shadow hover:bg-gray-100"
					aria-label="Notifications"
				>
					<Bell class="h-5 w-5 text-gray-400" />
				</button>
				<button class="rounded-full bg-white p-2 shadow hover:bg-gray-100" aria-label="Settings">
					<Settings class="h-5 w-5 text-gray-400" />
				</button>
				<div class="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
					<img
						src="https://randomuser.me/api/portraits/women/44.jpg"
						alt="User"
						class="h-8 w-8 rounded-full"
						loading="lazy"
						decoding="async"
					/>
					<div class="flex flex-col text-left">
						<span class="text-sm font-semibold text-gray-800">Laurie Jean</span>
						<span class="text-xs text-gray-400">Patient</span>
					</div>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<main class="flex gap-4 p-4 pt-0">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
