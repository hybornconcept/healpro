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
		Bell,
		ChevronLeft
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
								<!-- Header -->

								<Sheet.Header class=" pb-4">
									<div class="flex items-center gap-3 pb-4">
										<button class="text-gray-600 hover:text-gray-800">
											<ChevronLeft class="h-6 w-6" />
										</button>
										<h2 class="text-xl font-semibold text-gray-900">Help & Support</h2>
									</div>
									<!-- Date and Guest Selection -->
									<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
										<div class="flex items-start justify-between">
											<div class="flex items-center gap-3">
												<div
													class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500"
												>
													<span class="text-sm font-bold text-white">A</span>
												</div>
												<div>
													<div class="text-sm text-gray-600">AXAMansard</div>
													<div class="text-xs text-gray-500">ENR001234567</div>
												</div>
											</div>
											<div class="text-right">
												<div class="text-sm text-gray-600">
													{new Date().toLocaleDateString('en-GB', {
														day: 'numeric',
														month: 'short',
														year: '2-digit'
													})}
												</div>
											</div>
										</div>
										<div class="mt-4">
											<div class="text-2xl font-bold text-gray-900">John Doe</div>
										</div>
										<div class="mt-3 flex gap-2">
											<span
												class="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
												>Gold</span
											>
											<span
												class="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
												>100%</span
											>
											<span
												class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
												>Male</span
											>
										</div>
									</div>
								</Sheet.Header>
								<div class="flex-1 space-y-6 px-4 py-3">
									<!-- Description -->
									<div class="text-center text-sm text-gray-600">
										If you are experiencing any issues, please let us know. We will try to solve
										them as soon as possible.
									</div>

									<!-- Form -->
									<div class="space-y-4">
										<div class="space-y-2">
											<Label for="title" class="text-sm font-medium text-gray-700">Title</Label>
											<Input id="title" placeholder="Please describe the issue" class="w-full" />
										</div>

										<div class="space-y-2">
											<Label for="problem" class="text-sm font-medium text-gray-700"
												>Explain the problem</Label
											>
											<textarea
												id="problem"
												rows="6"
												class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
												placeholder="Describe your issue in detail..."
											></textarea>
										</div>
									</div>
								</div>
								<Sheet.Footer class="border-t pt-4">
									<!-- Submit Button -->
									<button
										class="w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
									>
										SUBMIT
									</button>
								</Sheet.Footer>
							</Sheet.Content>
						</Sheet.Root>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
