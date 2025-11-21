<script lang="ts">
	import {
		Star,
		Clock,
		Zap,
		Shield,
		Award,
		Crown,
		Gem,
		ArrowRight,
		ChevronDown,
		Search,
		Calendar,
		Bell
	} from '@lucide/svelte';
	import type { PageData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	let { data }: { data: PageData } = $props();

	const companyLogos = [
		'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg',
		'https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg',
		'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-logo_23-2149219632.jpg',
		'https://img.freepik.com/free-vector/gradient-logo-with-abstract-shape_23-2148195164.jpg',
		'https://img.freepik.com/free-vector/blue-futuristic-logo_1043-44.jpg'
	];

	const providers = [
		{
			id: 2,
			name: 'Blue Cross Blue Shield',
			rating: 4,
			logoUrl: companyLogos[1],
			serviceType: 'Out-patient Services',
			services: [
				'Out Patient Care, General and Specialist Consultation (Nephrologist, Urologist, Endocrinologist, etc)',
				'Prescribed Medications',
				'Management of Chronic Conditions'
			],
			plans: [
				{ name: 'Bronze', coverage: '100% Covered', color: 'bg-amber-600' },
				{ name: 'Silver', coverage: '100% Covered', color: 'bg-gray-400' },
				{ name: 'Gold', coverage: '100% Covered', color: 'bg-yellow-500' },
				{ name: 'Platinum Plus', coverage: '100% Covered', color: 'bg-purple-600' }
			]
		},
		{
			id: 3,
			name: 'Cigna',
			rating: 4,
			logoUrl: companyLogos[2],
			serviceType: 'Out-patient Services',
			services: [
				'Out Patient Care, General and Specialist Consultation (Nephrologist, Urologist, Endocrinologist, etc)',
				'Prescribed Medications',
				'Management of Chronic Conditions'
			],
			plans: [
				{ name: 'Bronze', coverage: '100% Covered', color: 'bg-amber-600' },
				{ name: 'Silver', coverage: '100% Covered', color: 'bg-gray-400' },
				{ name: 'Gold', coverage: '100% Covered', color: 'bg-yellow-500' },
				{ name: 'Platinum Plus', coverage: '100% Covered', color: 'bg-purple-600' }
			]
		},
		{
			id: 4,
			name: 'Humana',
			rating: 3,
			logoUrl: companyLogos[3],
			serviceType: 'Out-patient Services',
			services: [
				'Out Patient Care, General and Specialist Consultation (Nephrologist, Urologist, Endocrinologist, etc)',
				'Prescribed Medications',
				'Management of Chronic Conditions'
			],
			plans: [
				{ name: 'Bronze', coverage: '100% Covered', color: 'bg-amber-600' },
				{ name: 'Silver', coverage: '100% Covered', color: 'bg-gray-400' },
				{ name: 'Gold', coverage: '100% Covered', color: 'bg-yellow-500' },
				{ name: 'Platinum Plus', coverage: '100% Covered', color: 'bg-purple-600' }
			]
		},
		{
			id: 5,
			name: 'UnitedHealth',
			rating: 4,
			logoUrl: companyLogos[4],
			serviceType: 'Out-patient Services',
			services: [
				'Out Patient Care, General and Specialist Consultation (Nephrologist, Urologist, Endocrinologist, etc)',
				'Prescribed Medications',
				'Management of Chronic Conditions'
			],
			plans: [
				{ name: 'Bronze', coverage: '100% Covered', color: 'bg-amber-600' },
				{ name: 'Silver', coverage: '100% Covered', color: 'bg-gray-400' },
				{ name: 'Gold', coverage: '100% Covered', color: 'bg-yellow-500' },
				{ name: 'Platinum Plus', coverage: '100% Covered', color: 'bg-purple-600' }
			]
		}
	];
</script>

<div class="mx-auto min-h-screen w-[80%] p-6 font-['Nunito_Sans']">
	<!-- Header -->
	<!-- Dashboard Header -->
	<div class="mb-2 flex items-center justify-between py-2">
		<div class="flex w-full items-center justify-between">
			<!-- Search Input -->
			<div class="flex w-1/2">
				<div class="relative w-[70%]">
					<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<Input placeholder="Search" class="w-full pr-12 pl-10" />
					<span class="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">⌘F</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<!-- Platform 1 -->
				<button
					class="flex w-32 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
				>
					<span>Platform</span>
					<ChevronDown class="ml-auto h-4 w-4" />
				</button>
				<!-- Platform 1 -->
				<button
					class="flex w-32 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
				>
					<span>Platform</span>
					<ChevronDown class="ml-auto h-4 w-4" />
				</button>
				<!-- Platform 1 -->
				<button
					class="flex w-32 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
				>
					<span>Platform</span>
					<ChevronDown class="ml-auto h-4 w-4" />
				</button>
			</div>
		</div>
	</div>

	<!-- Provider Cards -->
	<div class="space-y-4">
		{#each providers as provider}
			<div
				class="relative border-t-4 border-blue-500 bg-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
			>
				<div class="absolute top-0 left-0 bg-blue-500 px-3 py-1 text-xs font-medium text-white">
					Out-patient Services
				</div>

				<div class="flex items-center p-4">
					<!-- Left Section: Logo - 15% -->
					<div class="flex w-[15%] flex-col items-start">
						<div
							class="flex h-24 w-20 items-center justify-center overflow-hidden border border-gray-200 bg-white"
						>
							<img src={provider.logoUrl} alt={provider.name} class="h-12 w-20 object-contain" />
						</div>
					</div>

					<!-- Services Section - 40% -->
					<div class="flex w-[40%] flex-col">
						<div class="space-y-1">
							{#each provider.services || [] as service}
								<div class="flex items-start gap-2 text-xs">
									<div class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></div>
									<span class="text-xs leading-tight text-gray-600">{service}</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Plans Section - 15% -->
					<div class="flex w-[15%] flex-col">
						<div class="mb-2 text-xs font-medium text-gray-700">Plans</div>
						<div class="space-y-1">
							{#each provider.plans || [] as plan}
								<div class="flex items-center gap-2 text-xs">
									{#if plan.name === 'Bronze'}
										<Shield class="h-3 w-3 text-amber-600" />
									{:else if plan.name === 'Silver'}
										<Award class="h-3 w-3 text-gray-400" />
									{:else if plan.name === 'Gold'}
										<Crown class="h-3 w-3 text-yellow-500" />
									{:else if plan.name === 'Platinum Plus'}
										<Gem class="h-3 w-3 text-purple-600" />
									{/if}
									<span class="text-gray-700">{plan.name}</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Coverage Section - 15% -->
					<div class="flex w-[15%] flex-col">
						<div class="mb-2 text-xs font-medium text-gray-700">Coverage</div>
						<div class="space-y-1">
							{#each provider.plans || [] as plan}
								<div class="flex items-center gap-2 text-xs">
									{#if plan.coverage === '100% Covered'}
										<Zap class="h-3 w-3 text-green-500" />
									{:else}
										<Clock class="h-3 w-3 text-gray-500" />
									{/if}
									<span class="text-gray-700">{plan.coverage}</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Right Section: Action Button - 15% -->
					<div class="flex w-[15%] flex-col items-center justify-center">
						<div class="mb-2 text-center text-sm font-medium text-gray-700">See details</div>
						<Sheet.Root>
							<Sheet.Trigger
								class="text-md flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 font-normal text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-300 hover:shadow-lg"
							>
								Choose
								<div class="flex h-5 w-5 items-center justify-center rounded-full bg-white">
									<ArrowRight
										class="h-2.5 w-2.5 text-blue-500 transition-transform duration-200 group-hover:translate-x-1"
									/>
								</div>
							</Sheet.Trigger>
							<Sheet.Content side="right" class="w-[800px]">
								<Sheet.Header class="border-b pb-4">
									<div class="flex items-center justify-between">
										<div>
											<h2 class="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
											<p class="text-sm text-gray-600">
												Track performance, monitor campaigns, and uncover insights to optimize your
												marketing strategy.
											</p>
										</div>
										<div class="flex items-center gap-3">
											<!-- Search Input -->
											<div class="relative">
												<Search
													class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
												/>
												<Input placeholder="Search" class="w-64 pr-12 pl-10" />
												<span
													class="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400"
													>⌘F</span
												>
											</div>

											<!-- Date Dropdown -->
											<button
												class="flex w-40 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
											>
												<Calendar class="h-4 w-4" />
												<span>February 2024</span>
												<ChevronDown class="ml-auto h-4 w-4" />
											</button>

											<!-- Platform Dropdown -->
											<button
												class="flex w-32 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
											>
												<span>Platform</span>
												<ChevronDown class="ml-auto h-4 w-4" />
											</button>

											<!-- Notification Bell -->
											<button class="p-2 text-gray-400 hover:text-gray-600">
												<Bell class="h-5 w-5" />
											</button>

											<!-- Export Button -->
											<button
												class="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													/>
												</svg>
												Export
											</button>
										</div>
									</div>
								</Sheet.Header>
								<div class="grid flex-1 auto-rows-min gap-6 px-4 py-6">
									<!-- Date and Guest Selection -->
									<div class="grid grid-cols-2 gap-4 rounded-lg border p-4">
										<div>
											<Label class="text-sm font-semibold text-gray-700">DATES</Label>
											<div class="mt-2 flex items-center justify-between">
												<span class="text-lg">Dec 20 - 31</span>
												<ChevronDown class="h-4 w-4" />
											</div>
										</div>
										<div class="border-l pl-4">
											<Label class="text-sm font-semibold text-gray-700">GUESTS</Label>
											<div class="mt-2 flex items-center justify-between">
												<span class="text-lg">1 guest</span>
												<ChevronDown class="h-4 w-4" />
											</div>
										</div>
									</div>

									<!-- Available Dates -->
									<div class="space-y-4">
										<div class="flex items-center justify-between border-b py-4">
											<div>
												<div class="text-lg font-semibold">Sat, Dec 25</div>
												<div class="text-gray-600">1:00 PM - 2:30 PM</div>
												<div class="text-gray-600">Join 3 other guests</div>
											</div>
											<div class="text-right">
												<div class="text-lg font-semibold">₦2 / person</div>
												<button
													class="rounded-lg bg-pink-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-pink-600"
												>
													Choose
												</button>
											</div>
										</div>

										<div class="flex items-center justify-between border-b py-4">
											<div>
												<div class="text-lg font-semibold">Sun, Dec 26</div>
												<div class="text-gray-600">1:00 PM - 2:30 PM</div>
												<div class="text-gray-600">Join 2 other guests</div>
											</div>
											<div class="text-right">
												<div class="text-lg font-semibold">₦2 / person</div>
												<button
													class="rounded-lg bg-pink-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-pink-600"
												>
													Choose
												</button>
											</div>
										</div>
									</div>

									<!-- Show More Dates Button -->
									<button
										class="w-full rounded-lg border border-gray-300 py-3 text-center font-semibold transition-colors hover:bg-gray-50"
									>
										Show more dates
									</button>

									<!-- Gift Experience -->
									<div class="flex items-center justify-center gap-2 py-4">
										<div
											class="flex h-6 w-6 items-center justify-center rounded border-2 border-gray-400"
										>
											<div class="h-3 w-3 rounded-sm bg-gray-400"></div>
										</div>
										<span class="cursor-pointer text-gray-700 underline">Gift this experience</span>
									</div>
								</div>
								<Sheet.Footer class="border-t pt-4">
									<div class="flex items-center gap-2 text-gray-600">
										<div
											class="flex h-5 w-5 items-center justify-center rounded border border-gray-400"
										>
											<div class="h-2 w-2 bg-gray-400"></div>
										</div>
										<span class="cursor-pointer underline">Report this experience</span>
									</div>
								</Sheet.Footer>
							</Sheet.Content>
						</Sheet.Root>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
