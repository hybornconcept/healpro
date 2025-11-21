<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Venus, Flame, MapPin, Calendar, Clock, FileText } from '@lucide/svelte';

	interface Appointment {
		id: number;
		clientName: string;
		clientAge: number;
		clientSex: string;
		clientPhone: string;
		unit: string;
		date: string;
		time: string;
		reason: string;
		plan: string;
		clientId: string;
		avatar: string;
	}

	// State for appointments
	let appointments = $state<Appointment[]>([]);
	let loading = $state(false);

	// Sheet state
	let sheetOpen = $state(false);
	let noteTitle = $state('');
	let note = $state('');
	let selectedTags = $state<string[]>([]);

	const tags = ['Urgent', 'Follow-up', 'Consultation', 'Emergency', 'Routine'];

	// Load appointments if not provided
	onMount(async () => {
		if (!appointments.length) {
			loading = true;
			try {
				const response = await fetch('/api/appointments');
				if (response.ok) {
					appointments = await response.json();
				} else {
					// Fallback data
					appointments = [
						{
							id: 1,
							clientName: 'John Adebayo',
							clientAge: 34,
							clientSex: 'Male',
							clientPhone: '+234 801 234 5678',
							unit: 'Pediatrics',
							date: '2024-01-15',
							time: '10:00 AM',
							reason: 'Annual dental check-up',
							plan: 'Gold',
							clientId: 'CLI-001',
							avatar:
								'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
						},
						{
							id: 2,
							clientName: 'Sarah Okafor',
							clientAge: 28,
							clientSex: 'Female',
							clientPhone: '+234 802 345 6789',
							unit: 'O&G',
							date: '2024-01-16',
							time: '2:30 PM',
							reason: 'Orthodontic consultation',
							plan: 'Platinum',
							clientId: 'CLI-002',
							avatar:
								'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
						},
						{
							id: 3,
							clientName: 'Matthew Okoro',
							clientAge: 45,
							clientSex: 'Male',
							clientPhone: '+234 803 456 7890',
							unit: 'Cardiology',
							date: '2024-01-17',
							time: '11:15 AM',
							reason: 'Dental surgery follow-up',
							plan: 'Silver',
							clientId: 'CLI-003',
							avatar:
								'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
						}
					];
				}
			} catch (error) {
				console.error('Failed to load appointments:', error);
				// Set fallback data on error
				appointments = [
					{
						id: 1,
						clientName: 'John Adebayo',
						clientAge: 34,
						clientSex: 'Male',
						clientPhone: '+234 801 234 5678',
						unit: 'Pediatrics',
						date: '2024-01-15',
						time: '10:00 AM',
						reason: 'Annual dental check-up',
						plan: 'Gold',
						clientId: 'CLI-001',
						avatar:
							'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
					}
				];
			} finally {
				loading = false;
			}
		}
	});
</script>

<div class="mx-auto flex w-full flex-col gap-8 px-10 py-8">
	<div>
		{#if loading}
			<div class="flex justify-center py-8">
				<div class="text-lg">Loading...</div>
			</div>
		{:else}
			<div class="mb-6 text-lg font-semibold">{appointments.length} Upcoming Appointments</div>
			<div class="mx-auto flex w-3/4 flex-col gap-6">
				{#each appointments as appointment (appointment.id)}
					<Card.Root
						class="mx-auto flex w-full flex-col items-center rounded-lg border border-gray-200 p-0 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-lg md:flex-row md:items-start"
					>
						<!-- Part 1: 30% width, split into avatar (40%) and details (60%) -->
						<div class="w-[35%] rounded-l-lg bg-gray-50 px-4 py-6">
							<div class="flex h-full gap-4">
								<!-- Avatar Section (40%) -->
								<div class="flex w-[40%] flex-col items-center justify-center">
									<Avatar.Root class="h-24 w-24 overflow-hidden rounded-lg">
										<Avatar.Image
											src={appointment.avatar}
											alt={appointment.clientName}
											class="h-full w-full object-cover"
										/>
										<Avatar.Fallback
											class="flex h-full w-full items-center justify-center bg-gray-300 text-2xl font-bold text-gray-700"
										>
											{appointment.clientName[0]}
										</Avatar.Fallback>
									</Avatar.Root>
								</div>
								<!-- Details Section (60%) -->
								<div class="flex w-[60%] flex-col justify-center">
									<!-- Name -->
									<div class=" flex items-center gap-2">
										<h3 class="text-xl leading-tight font-bold text-gray-900">
											{appointment.clientName}
										</h3>
									</div>
									<!-- Role and Experience -->
									<p class=" flex items-center gap-2">
										<Venus size={16} class="text-blue-600" />
										<span class="text-sm font-medium text-gray-700">{appointment.clientSex}</span>
										<span>|</span>
										<span class="text-sm font-extralight text-gray-500"
											>{appointment.clientAge} years</span
										>
									</p>
									<!-- Priority -->
									<div class="flex items-center gap-2">
										<Flame size={16} class="text-red-600" />
										<span class="text-sm font-semibold text-red-600">High</span>
										<span>|</span>
										<p class="flex items-center gap-1 text-xs text-gray-600">
											<MapPin size={12} />
											Lagos, NG
										</p>
									</div>
									<!-- Plan and Location below details -->
									<div class=" flex items-center gap-1">
										<Badge
											class="inline-flex items-center gap-1 rounded-full border-1 px-2 py-1 text-xs font-medium {appointment.plan ===
											'Platinum'
												? 'bg-gray-100 text-gray-800'
												: appointment.plan === 'Gold'
													? 'bg-yellow-100 text-yellow-800'
													: 'bg-slate-100 text-slate-700'}"
										>
											{appointment.plan}
										</Badge>
										<span>|</span>
										<span class="text-sm text-gray-500">eru1983</span>
									</div>
									<div class="flex items-center">
										<p class="text-sm text-gray-500">
											Client ID: {appointment.clientId}
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Part 2: 70%/30% split -->
						<div class="-ml-5 flex w-[65%] flex-row justify-between gap-3 p-4">
							<!-- Left Column: 70% -->
							<div class="flex h-full w-[70%] flex-col justify-center space-x-3">
								<div>
									<div class="text-md mb-1 font-semibold">Appointment Details:</div>
									<div class="flex gap-2 border-gray-200 pb-2 text-sm">
										<div class="flex items-center text-nowrap">
											<Calendar size={12} class="text-blue-500" />
											<span class="text-gray-500">{appointment.date} </span>
										</div>
										<span class="text-gray-400">|</span>
										<div class="flex items-center gap-2 text-nowrap">
											<Clock size={12} class="text-blue-500" />
											<span class="text-gray-500">{appointment.time} </span>
										</div>
										<span class="text-gray-400">|</span>
										<div class="flex items-center gap-2 text-nowrap">
											<FileText size={12} class="text-blue-500" />
											<span class="text-gray-500">{appointment.reason}</span>
										</div>
									</div>
									<div class="my-1 border bg-gray-400"></div>
									<div class="">
										<div class="text-sm font-medium text-gray-500">Additional Information:</div>
										<div class="text-sm text-gray-500">
											Patient requires special attention due to previous complications. Please
											review medical history before consultation.
										</div>
									</div>
								</div>
							</div>
							<!-- Right Column: 30% -->
							<div
								class="mx-auto flex h-full w-[30%] flex-col items-center justify-center self-center"
							>
								<Button
									class="mb-2 w-32 rounded-full bg-green-500 px-6 py-2 text-white hover:bg-green-600"
									onclick={() => (sheetOpen = true)}
								>
									Accept
								</Button>
								<Button
									class="w-32 rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600"
									onclick={() => (sheetOpen = true)}
								>
									Reject
								</Button>
							</div>
						</div>
					</Card.Root>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Sheet Modal for Add Note -->
	<Sheet.Root bind:open={sheetOpen}>
		<Sheet.Content side="right" class="w-full max-w-lg">
			<Sheet.Header>
				<Sheet.Title>Add Note</Sheet.Title>
			</Sheet.Header>
			<div class="flex flex-col gap-6 px-6 py-6">
				<div class="flex flex-col gap-4">
					<Label for="note-title" class="text-sm font-medium">Note Title</Label>
					<Input
						id="note-title"
						bind:value={noteTitle}
						class="rounded border px-3 py-2"
						placeholder="Enter note title"
					/>
					<Label for="note" class="text-sm font-medium">Note</Label>
					<textarea
						id="note"
						bind:value={note}
						maxlength="250"
						rows="6"
						class="resize-none rounded border px-3 py-2"
						placeholder="Enter note..."
					></textarea>
					<div class="text-xs text-gray-400">Max character allowed 250</div>
				</div>
				<div class="flex flex-col gap-2">
					<div class="mb-2 text-sm font-medium">Select Tag</div>
					{#each tags as tag}
						<Label
							class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50"
						>
							<Checkbox
								id={tag}
								checked={selectedTags.includes(tag)}
								onCheckedChange={(checked) => {
									if (checked) {
										selectedTags = [...selectedTags, tag];
									} else {
										selectedTags = selectedTags.filter((t) => t !== tag);
									}
								}}
							/>
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">{tag}</p>
							</div>
						</Label>
					{/each}
				</div>
			</div>
			<Sheet.Footer>
				<Button
					variant="outline"
					class="rounded-full px-6 py-2"
					onclick={() => (sheetOpen = false)}
				>
					Cancel
				</Button>
				<Button
					class="rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
					onclick={() => {
						// Handle save note action
						sheetOpen = false;
					}}
				>
					Save Note
				</Button>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</div>
