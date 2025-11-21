<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Mail,
		MapPin,
		Phone,
		Feather,
		Star,
		ThumbsUp,
		Rss,
		Check,
		CheckCircle,
		Clock,
		XCircle,
		ChevronRight,
		Calendar,
		Send,
		Pencil
	} from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import AnimatedButton from '$lib/components/AnimatedButton.svelte';
	import SlideButton from '$lib/components/SlideButton.svelte';

	let showFeedback = $state(false);
	let sheetOpen = $state(false);
	let selectedAppointment: any = $state(null);
	let activeDetailsTab = $state('personal');
	let sliderValues = $state([[0], [0], [0], [0], [0]]);

	// Initialize slider values based on data length
	$effect(() => {
		if (data?.sliders) {
			sliderValues = data.sliders.map(() => [0]);
		}
	});

	let { data } = $props();

	function abbreviateHospital(facility: string): string {
		const abbreviations: { [key: string]: string } = {
			'Lagos University Teaching Hospital': 'LUTH',
			'General Hospital Lagos': 'GH Lagos',
			'National Hospital Abuja': 'NH Abuja'
		};
		return abbreviations[facility] || facility;
	}

	function getCoveragePercentage(coverage: string): number {
		// Extract number from coverage string like "₦85,000" and convert to percentage
		const amount = parseInt(coverage.replace(/[₦,]/g, ''));
		// Assuming max coverage is 150,000 for percentage calculation
		return Math.min(Math.round((amount / 150000) * 100), 100);
	}

	function getAverage(value: number): string {
		if (value >= 9) return 'Excellent';
		if (value >= 6) return 'Good';
		if (value >= 3) return 'Fair';
		return 'Poor';
	}

	function getTextColorByValue(val: number): string {
		if (val <= 2) return 'text-red-600';
		if (val <= 5) return 'text-orange-500';
		if (val <= 8) return 'text-yellow-600';
		return 'text-green-600';
	}

	function getRatingColor(val: number): string {
		if (val <= 2) return '#dc2626'; // red-600 - Poor
		if (val <= 5) return '#ea580c'; // orange-600 - Fair
		if (val <= 8) return '#ca8a04'; // yellow-600 - Good
		return '#16a34a'; // green-600 - Excellent
	}

	// Tab filtering
	let activeTab = $state('all');

	const filteredAppointments = $derived(() => {
		if (activeTab === 'upcoming') {
			return data.appointments.filter((apt: any) => apt.status === 'upcoming');
		}
		if (activeTab === 'completed') {
			return data.appointments.filter((apt: any) => apt.status === 'completed');
		}
		return data.appointments;
	});

	// Tabs for appointment filtering
	const tabs = [
		{ id: 'all', label: 'All' },
		{ id: 'upcoming', label: 'Upcoming' },
		{ id: 'completed', label: 'Completed' }
	];

	// Reusable function for text wrapping
	function wrapText(text: string): string {
		if (text.includes(' ')) {
			const [firstWord, ...rest] = text.split(' ');
			return `${firstWord}<br />${rest.join(' ')}`;
		}
		return text;
	}
</script>

<div class="header-poppins flex min-h-screen w-full items-start justify-center gap-8 p-6">
	<div class="flex w-full flex-col gap-6">
		<!-- Two-column layout -->
		<div class="grid grid-cols-4 gap-6">
			<!-- Column 1: Main content (75% width) -->
			<div class="col-span-3 flex flex-col gap-6">
				<!-- Main profile card -->
				<Card.Root class="rounded-2xl bg-white p-0 shadow-md">
					<div class="flex w-full flex-col md:flex-row">
						<!-- Left: Profile and stats -->
						<div class="flex w-full flex-col items-center p-8 md:w-1/3">
							<img
								src={data.userProfile.avatar}
								alt={data.userProfile.name}
								class="mb-4 h-20 w-20 rounded-full object-cover"
							/>
							<div class="w-full text-center">
								<h2 class="text-lg font-bold text-gray-800">{data.userProfile.name}</h2>
								<div class="mb-4 text-sm text-gray-500">{data.userProfile.phone}</div>
								<div class="mb-4 text-sm text-gray-500">{data.userProfile.address}</div>
							</div>
							<div class="flex w-full flex-col items-center">
								<div class="mb-2 font-semibold text-gray-800">Appointments</div>
								<div class="flex w-full items-center justify-center">
									<div class="flex flex-1 flex-col items-center">
										<span class="text-2xl font-bold text-gray-800"
											>{data.userProfile.stats.past}</span
										>
										<span class="text-sm text-gray-500">Past</span>
									</div>
									<div class="mx-4 h-10 w-px bg-gray-200"></div>
									<div class="flex flex-1 flex-col items-center">
										<span class="text-2xl font-bold text-gray-800"
											>{data.userProfile.stats.upcoming}</span
										>
										<span class="text-sm text-gray-500">Upcoming</span>
									</div>
								</div>
							</div>

							<AnimatedButton
								title="Send Message"
								rounded="full"
								icon={Send}
								href="/schedule"
								width="w-[90%]"
								class="text-md mt-4 py-5"
							/>
						</div>
						<!-- Vertical divider -->
						<div class="my-8 hidden w-px bg-gray-200 md:block"></div>
						<!-- Right: Details with horizontal lines -->
						<div class="flex-1 px-8 py-6 text-sm">
							<!-- Tab Navigation -->
							<div class="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1">
								<button
									class="flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors {activeDetailsTab ===
									'personal'
										? 'bg-white text-gray-900 shadow-sm'
										: 'text-gray-500 hover:text-gray-700'}"
									onclick={() => (activeDetailsTab = 'personal')}
								>
									Personal Details
								</button>
								<button
									class="flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors {activeDetailsTab ===
									'medical'
										? 'bg-white text-gray-900 shadow-sm'
										: 'text-gray-500 hover:text-gray-700'}"
									onclick={() => (activeDetailsTab = 'medical')}
								>
									Medical Details
								</button>
							</div>

							<!-- Tab Content -->
							{#if activeDetailsTab === 'personal'}
								<!-- Personal Details Header -->
								<div class="col-span-4 mb-4 flex justify-between">
									<h2 class="mb-2 text-base font-bold tracking-wide text-gray-700">
										Personal Details
									</h2>

									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger class="rounded-full bg-blue-100 p-2 hover:bg-blue-300">
												<a href="/schedule">
													<Pencil
														class="h-4 w-4 cursor-pointer text-blue-500 hover:text-gray-700"
													/>
												</a>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<p>Edit Profile</p>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								</div>
								<div class="grid grid-cols-4 gap-x-8 gap-y-2">
									{#each data?.userProfile?.personalDetails as detail}
										<div>
											<div class="text-gray-400">{detail.label}</div>
											<div class="font-medium text-gray-800">{detail.value}</div>
											<hr class="my-2 border-gray-200" />
										</div>
									{/each}
								</div>

								<!-- Dependents Details -->

								<h2 class="my-3 text-lg font-bold text-gray-800">Dependents</h2>

								<div class="grid grid-cols-4 gap-x-8 gap-y-2">
									{#each data?.userProfile?.dependents as detail}
										<div>
											<div class="text-gray-400">{detail.label}</div>
											<div class="font-medium text-gray-800">{detail.value}</div>
											<hr class="my-2 border-gray-200" />
										</div>
									{/each}
								</div>
							{:else if activeDetailsTab === 'medical'}
								<!-- Medical Details Header -->
								<div class="col-span-4 mb-4 flex justify-between">
									<h2 class="mb-2 text-base font-bold tracking-wide text-gray-700">
										Medical Details
									</h2>

									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger class="rounded-full bg-blue-100 p-2 hover:bg-blue-300">
												<a href="/schedule">
													<Pencil
														class="h-4 w-4 cursor-pointer text-blue-500 hover:text-gray-700"
													/>
												</a>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<p>Edit Profile</p>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								</div>
								<div class="grid grid-cols-4 gap-x-8 gap-y-2">
									{#each data.userProfile.medicalDetails || [] as detail}
										<div>
											<div class="text-gray-400">{detail.label}</div>
											<div class="font-medium text-gray-800">{detail.value}</div>
											<hr class="my-2 border-gray-200" />
										</div>
									{/each}
								</div>
								{#if !data.userProfile.medicalDetails || data.userProfile.medicalDetails.length === 0}
									<div class="text-gray-500">No medical details available</div>
								{/if}
							{/if}
						</div>
					</div>
				</Card.Root>

				<!-- Appointment Table -->
				<Card.Root class="w-full rounded-2xl bg-white p-6 shadow-md">
					<div class="mb-4 flex items-center justify-between">
						<h2 class="header-poppins text-lg font-bold text-gray-800">Appointment</h2>
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger class="rounded-full bg-blue-100 p-2 hover:bg-blue-300">
									<a href="/schedule">
										<Calendar class="h-4 w-4 cursor-pointer text-blue-500 hover:text-gray-700" />
									</a>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>Add appointment</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>

					<!-- Tabs -->
					<div class="nunito text-gray- -mt-10 flex border-b border-gray-200 text-sm">
						{#each tabs as tab}
							<div
								class="w-1/6 cursor-pointer py-3 font-semibold {activeTab === tab.id
									? 'border-b-2 border-blue-500 text-blue-600'
									: 'hover:text-blue-600'}"
								onclick={() => (activeTab = tab.id)}
								onkeydown={(e) => e.key === 'Enter' && (activeTab = tab.id)}
								role="button"
								tabindex="0"
							>
								{tab.label}
							</div>
						{/each}
					</div>

					<!-- Table -->
					<table class="nunito w-full table-fixed text-sm">
						<colgroup>
							<col class="w-[15%]" />
							<!-- Increased width for Date & Time -->
							<col class="w-[12.5%]" />
							<!-- Facility -->
							<col class="w-[12.5%]" />
							<!-- Unit -->
							<col class="w-[12.5%]" />
							<!-- Type with text wrap -->
							<col class="w-[1%]" />
							<!-- Spacer column between Type and Claim Status -->
							<col class="w-[12.5%]" />
							<!-- Claim Status -->
							<col class="w-[12.5%]" />
							<!-- Prescription -->
							<col class="w-[12.5%]" />
							<!-- Referral -->
							<col class="w-[12.5%]" />
							<!-- Feedback -->
						</colgroup>
						<thead>
							<tr class="text-left text-gray-500">
								<th class="py-2 font-semibold">Date & Time</th>
								<th class="py-2 font-semibold">Facility</th>
								<th class="py-2 font-semibold">Unit</th>
								<th class="py-2 font-semibold">Type</th>
								<th class="py-2 font-semibold"></th>
								<!-- Spacer column -->
								<th class="py-2 font-semibold">Claim Status</th>
								<th class="py-2 font-semibold">Prescription</th>
								<th class="py-2 font-semibold">Referral</th>
								<th class="py-2 font-semibold">Feedback</th>
							</tr>
						</thead>
						<tbody class="text-gray-700">
							{#each filteredAppointments() as appointment: any}
								<tr class="border-b last:border-b-0">
									<!-- Merged Date & Time Column -->
									<td class="py-3">
										<div class="flex flex-col">
											<div class="font-semibold text-gray-900">{appointment.date}</div>
											<div class="text-sm text-gray-500">{appointment.time}</div>
										</div>
									</td>
									<!-- Abbreviated Facility -->
									<td>
										<div class="break-words whitespace-normal">
											{@html wrapText(abbreviateHospital(appointment.facility))}
										</div>
									</td>
									<!-- Unit Column -->
									<td>
										<div class="break-words whitespace-normal">
											{@html wrapText(appointment.unit)}
										</div>
									</td>
									<!-- Type Column -->
									<td class="break-words whitespace-normal">{@html wrapText(appointment.type)}</td>
									<!-- Spacer Column -->
									<td></td>
									<!-- Claim Status with Icons -->
									<td>
										<span
											class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {appointment.claimStatus ===
											'In-Review'
												? 'bg-yellow-100 text-yellow-800'
												: appointment.claimStatus === 'Approved'
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'}"
										>
											{#if appointment.claimStatus === 'Approved'}
												<CheckCircle class="h-3 w-3" />
											{:else if appointment.claimStatus === 'In-Review'}
												<Clock class="h-3 w-3" />
											{:else}
												<XCircle class="h-3 w-3" />
											{/if}
											{appointment.claimStatus}
										</span>
									</td>
									<!-- Prescription Given -->
									<td>
										<span
											class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {appointment.prescriptionGiven ===
											'Yes'
												? 'bg-green-100 text-green-800'
												: 'bg-gray-100 text-gray-800'}"
										>
											{appointment.prescriptionGiven || 'No'}
										</span>
									</td>
									<!-- Referral Status -->
									<td>
										<span
											class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {appointment.referralStatus ===
											'Referred'
												? 'bg-blue-100 text-blue-800'
												: 'bg-gray-100 text-gray-800'}"
										>
											{appointment.referralStatus || 'None'}
										</span>
									</td>
									<!-- Feedback Button -->
									<td>
										<div
											onclick={() => {
												selectedAppointment = appointment;
												sheetOpen = true;
											}}
											onkeydown={(e) => {
												if (e.key === 'Enter') {
													selectedAppointment = appointment;
													sheetOpen = true;
												}
											}}
											role="button"
											tabindex="0"
										>
											<SlideButton
												title="Rate"
												icon={Star}
												rounded="full"
												width="w-full"
												class="cursor-pointer px-2 py-1 text-xs"
											/>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</Card.Root>
			</div>

			<!-- Sheet Component moved outside table -->
			<Sheet.Root bind:open={sheetOpen}>
				<Sheet.Content
					side="right"
					class="fixed top-0 right-0 z-50 h-full w-[50vw] max-w-none overflow-y-auto bg-white shadow-lg sm:w-[50vw]"
				>
					<Sheet.Header class="border-b px-6 py-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="relative">
									<div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
										<span class="text-sm font-medium text-white">
											{selectedAppointment
												? abbreviateHospital(selectedAppointment.facility).slice(0, 2)
												: 'GH'}
										</span>
									</div>
									<div
										class="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500"
									>
										<span class="text-xs">🏥</span>
									</div>
								</div>
								<div>
									<h3 class="font-semibold text-nowrap text-gray-900">
										{selectedAppointment ? selectedAppointment.facility : 'General Hospital Lagos'}
									</h3>
									<p class="text-xs text-gray-500">
										{selectedAppointment
											? `${selectedAppointment.date} • ${selectedAppointment.time}`
											: 'Victoria Island, Lagos State'}
									</p>
									<div class="mt-1 flex items-center space-x-4">
										<div class="flex items-center space-x-1">
											<div class="h-4 w-4 rounded-full bg-blue-400"></div>
											<span class="text-xs text-nowrap text-gray-700">
												{selectedAppointment ? selectedAppointment.unit : 'Cardiology'}
											</span>
										</div>
										<div class="flex items-center space-x-1">
											<span class="text-xs text-nowrap text-gray-700">
												{selectedAppointment ? selectedAppointment.type : 'Regular checkup'}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Sheet.Header>

					<div class="grid flex-1 auto-rows-min gap-6 px-4">
						<div class="grid gap-3">
							<Card.Root class="overflow-hidden">
								<Card.Header
									class="-mb-4 flex h-[20px] min-h-0 items-center justify-between border-b "
								>
									<h2 class="text-lg font-semibold">Rate Hospital Services</h2>
									<Rss class="ml-1 h-5 w-5 text-gray-400" />
								</Card.Header>
								<Card.Content>
									{#each data.sliders as slider, index}
										<div class="px-0">
											<h3 class=" mb-2 text-sm font-medium text-gray-700">
												{slider.title}
											</h3>
											<div class="mb-1 flex items-center justify-between">
												<span class="text-sm font-semibold text-gray-900">
													{sliderValues[index][0]}/10
												</span>
												<span
													class={`text-xs font-semibold ${getTextColorByValue(sliderValues[index][0])}`}
												>
													Average: {getAverage(sliderValues[index][0])}
												</span>
											</div>
											<div class="  py-2">
												<Slider
													type="single"
													bind:value={sliderValues[index]}
													min={0}
													max={10}
													step={1}
													thayzeRatingColor={sliderValues[index][0]}
													thayzeGetRatingColor={getRatingColor}
													class="w-full"
												/>
											</div>
										</div>
										{#if index < data.sliders.length - 1}
											<div class="mx-0 my-4 -mr-6 -ml-6">
												<Separator orientation="horizontal" class="w-full" />
											</div>
										{/if}
									{/each}
								</Card.Content>
							</Card.Root>

							<Card.Root class="p-3">
								<div class="flex items-center justify-between">
									<h3 class="text-base font-medium text-gray-700">Additional Information</h3>
									<Switch bind:checked={showFeedback} />
								</div>
								{#if showFeedback}
									<textarea
										class=" h-34 w-full resize-none rounded-md border border-gray-300 p-2 text-sm"
										placeholder="Please share your feedback about the services..."
									></textarea>
								{/if}
							</Card.Root>
						</div>
					</div>
					<Sheet.Footer class="border-t bg-gray-50 px-6 py-4">
						<Sheet.Close
							class="w-full cursor-pointer rounded-full bg-blue-600 py-3 text-white hover:bg-blue-700"
							>Submit your feedback</Sheet.Close
						>
					</Sheet.Footer>
				</Sheet.Content>
			</Sheet.Root>
			<!-- Column 2: Sidebar content (25% width) -->
			<div class="col-span-1 flex flex-col gap-6">
				<!-- Assurance Card -->
				<Card.Root
					class="relative w-full rounded-2xl p-5 shadow-md"
					style="background: linear-gradient(135deg, #1e3cff 0%, #2d6aff 100%); min-height: 140px;"
				>
					<!-- Top Row: Logo and Check -->
					<div class="mb-2 flex items-start justify-between">
						<h2 class="flex items-center gap-2 text-lg font-semibold text-white">
							<Feather class="h-5 w-5" />
							<span> Axa Mansard</span>
						</h2>
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
							<svg
								class="h-4 w-4 text-white"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						</span>
					</div>
					<!-- Card Number -->
					<div class="mt-2 mb-4">
						<div class="mb-1 text-xs font-medium text-white/80">Enrolee ID</div>
						<div class="flex items-center gap-2">
							<span class="text-lg font-semibold tracking-widest text-white md:text-xl"
								>5323 2099 2000</span
							>
							<svg
								class="h-4 w-4 text-white/70"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
							>
								<rect x="9" y="9" width="13" height="13" rx="2" />
								<rect x="3" y="3" width="13" height="13" rx="2" />
							</svg>
						</div>
					</div>
					<!-- Expiry, CVC, Mastercard -->
					<div class="mt-2 flex items-end justify-between">
						<div>
							<div class="text-xs text-white/80">Exp Date</div>
							<div class="flex items-center gap-2">
								<span class="text-sm font-semibold text-white">05/26</span>
								<svg
									class="h-4 w-4 text-white/70"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<rect x="9" y="9" width="13" height="13" rx="2" />
									<rect x="3" y="3" width="13" height="13" rx="2" />
								</svg>
							</div>
						</div>
						<div>
							<div class="text-xs text-white/80">CVC</div>
							<div class="flex items-center gap-2"></div>
						</div>
						<div class="flex flex-col items-end">
							<div class="flex items-center gap-1">
								<!-- Mastercard logo -->
								<span class="inline-block h-7 w-7 rounded-full bg-[#ff5f00]"></span>
								<span class="-ml-3 inline-block h-7 w-7 rounded-full bg-[#f9bc15]"></span>
							</div>
							<span class="mt-1 text-xs text-white/80">Platinum</span>
						</div>
					</div>
				</Card.Root>

				<!-- Medications Card -->
				<Card.Root>
					<Card.Header class="flex h-[35px] min-h-0 items-center justify-between border-b pb-1.5">
						<h2 class="text-lg font-semibold">Service Timeline</h2>
						<ChevronRight class="ml-1 h-5 w-5 text-gray-400" />
					</Card.Header>
					<Card.Content class="px-4 py-0">
						<div class="relative">
							<!-- Vertical Timeline Line -->
							<div class="absolute top-0 bottom-0 left-4 w-px bg-gray-200"></div>

							<div class="space-y-0">
								{#each data.serviceTimeline as service}
									<div class="relative flex items-center gap-3 py-3 hover:bg-gray-50">
										<div
											class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full {service.status ===
											'completed'
												? 'bg-blue-100'
												: 'border-2 border-gray-300 bg-white'}"
										>
											<div
												class="h-2 w-2 rounded-full {service.status === 'completed'
													? 'bg-blue-500'
													: 'bg-gray-400'}"
											></div>
										</div>
										<div class="flex-1">
											<div class="text-sm font-medium text-gray-900">{service.title}</div>
											<div class="mt-0.5 text-xs text-gray-400">{service.details}</div>
											<div class="text-xs text-gray-500">{service.date}</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</div>
