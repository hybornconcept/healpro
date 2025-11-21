<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import type { ComponentProps } from 'svelte';

	import { getIcon } from '$lib/config/navigation';
	import type { NavItem } from '$lib/config/navigation';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		currentPath = '/',
		navItems = [],
		brandName = 'HealPro.',
		brandUrl = '/',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		currentPath?: string;
		navItems?: NavItem[];
		brandName?: string;
		brandUrl?: string;
	} = $props();

	// Function to check if a nav item is active
	const isActive = (url: string) => {
		return currentPath === url;
	};
</script>

<Sidebar.Root {collapsible} bind:ref {...restProps}>
	<Sidebar.Header>
		<div
			class="flex items-center justify-center px-4 py-2 group-data-[collapsible=icon]:px-0"
			style="font-family: 'Source Sans Pro', sans-serif;"
		>
			<a
				href={brandUrl}
				class="flex items-center gap-2 text-2xl group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center"
			>
				<svg
					class="h-5 w-5 text-blue-500 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
					/>
				</svg>
				<span class="font-bold group-data-[collapsible=icon]:sr-only">
					{brandName.split('.')[0]}<span class="text-blue-500"
						>.{brandName.split('.')[1] || ''}</span
					>
				</span>
			</a>
		</div>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navItems as item}
						{@const itemIsActive = isActive(item.url)}
						{@const iconPath = getIcon(item.icon)}
						<Sidebar.MenuItem
							class={itemIsActive
								? 'mx-2 rounded-lg bg-blue-100 group-data-[collapsible=icon]:mx-1'
								: 'mx-2 group-data-[collapsible=icon]:mx-1'}
						>
							<Sidebar.MenuButton isActive={itemIsActive}>
								<a
									href={item.url}
									class="flex w-full items-center justify-between px-2 py-4 text-base font-normal transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2
										{itemIsActive ? 'text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-gray-900'}"
									style="font-family: 'Nunito Sans', sans-serif;"
									data-sveltekit-preload-data="hover"
								>
									<div
										class="flex items-center gap-3 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
									>
										<svg
											class="h-4 w-4 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d={iconPath}
											/>
										</svg>
										<span class="group-data-[collapsible=icon]:sr-only">{item.title}</span>
									</div>
									<svg
										class="h-4 w-4 text-gray-400 transition-colors group-data-[collapsible=icon]:sr-only {itemIsActive
											? 'text-blue-500'
											: 'group-hover:text-gray-600'}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="m9 18 6-6-6-6"
										/>
									</svg>
								</a>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<div
			class="p-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2"
		>
			<div class="text-xs text-gray-500 group-data-[collapsible=icon]:text-center">
				<span class="group-data-[collapsible=icon]:sr-only">© 2025 {brandName.split('.')[0]}</span>
				<span class="hidden text-lg group-data-[collapsible=icon]:inline">©</span>
			</div>
		</div>
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
