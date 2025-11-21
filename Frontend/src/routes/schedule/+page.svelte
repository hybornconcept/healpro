<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import CalendarIcon from '@lucide/svelte/icons/calendar';

	import Clock2Icon from '@lucide/svelte/icons/clock-2';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import AnimatedButton from '$lib/components/AnimatedButton.svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let { data } = $props();

	const {
		locations,
		facilitiesByLocation
	}: {
		locations: { value: string; label: string }[];
		facilitiesByLocation: Record<string, { value: string; label: string }[]>;
	} = data;

	let selectedLocation = $state('');
	let selectedFacility = $state('');
	let value = $state<DateValue | undefined>();
	let contentRef = $state<HTMLElement | null>(null);

	const locationTriggerContent = $derived(
		locations.find((l) => l.value === selectedLocation)?.label ?? 'Select a location'
	);

	const facilityTriggerContent = $derived(
		selectedLocation && facilitiesByLocation[selectedLocation]
			? (facilitiesByLocation[selectedLocation].find((f) => f.value === selectedFacility)?.label ??
					'Select a facility')
			: 'Select a location first'
	);

	const availableFacilities = $derived(
		selectedLocation ? facilitiesByLocation[selectedLocation] || [] : []
	);

	$effect(() => {
		if (selectedLocation) {
			selectedFacility = '';
		}
	});
</script>

<div class="flex min-h-screen w-full items-center justify-center bg-[#f8fafc] p-4">
	<Card.Root class="flex w-full max-w-6xl overflow-hidden rounded-tl-3xl rounded-bl-3xl shadow-lg">
		<Card.Content class="flex w-full flex-row p-0">
			<!-- Left: Appointment Form (3/5 width) -->
			<div class="flex w-full flex-col px-12 py-10 md:w-3/5">
				<!-- Logo and Welcome -->
				<div class="mb-10 flex items-center gap-3">
					<h1 class="border-blue-300 p-2 text-2xl font-bold">
						Heal<span class="text-blue-500">Pro.</span>
					</h1>
				</div>

				<Card.Header class="mb-6 p-0">
					<Card.Title class="flex items-center gap-2 text-4xl font-light">Hello !</Card.Title>
					<Card.Description class="text-base">
						Get an appointment in less than a minute ...
					</Card.Description>
				</Card.Header>

				<!-- Location and Facility select -->
				<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="location" class="text-base">Location</Label>
						<Select.Root type="single" name="location" bind:value={selectedLocation}>
							<Select.Trigger class="w-full bg-gray-50">
								<div class="flex items-center gap-2">
									{locationTriggerContent}
								</div>
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Available Locations</Select.Label>
									{#each locations as location (location.value)}
										<Select.Item value={location.value} label={location.label}>
											<span>{location.label}</span>
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-2">
						<Label for="facility" class="text-base">Health Facility</Label>
						<Select.Root type="single" name="facility" bind:value={selectedFacility}>
							<Select.Trigger class="w-full bg-gray-50" disabled={!selectedLocation}>
								<div class="flex items-center gap-2">
									{facilityTriggerContent}
								</div>
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Available Facilities</Select.Label>
									{#each availableFacilities as facility (facility.value)}
										<Select.Item value={facility.value} label={facility.label}>
											<span>{facility.label}</span>
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
				</div>

				<!-- Reason and Comments -->
				<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="reason" class="text-base">Reason for appointment</Label>
						<Textarea id="reason" placeholder="ex: Annual monthly check-up" class="bg-gray-50" />
					</div>
					<div class="space-y-2">
						<Label for="comments" class="text-base">Additional comments/notes</Label>
						<Textarea
							id="comments"
							placeholder="ex: Prefer afternoon appointments, if possible"
							class="bg-gray-50"
						/>
					</div>
				</div>

				<!-- Appointment Date and Time -->
				<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="date" class="text-base">Expected appointment date</Label>
						<Popover.Root>
							<Popover.Trigger
								class={cn(
									buttonVariants({
										variant: 'outline',
										class: 'w-full justify-start text-left font-normal'
									}),
									!value && 'text-muted-foreground'
								)}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
							</Popover.Trigger>
							<Popover.Content bind:ref={contentRef} class="w-auto p-0">
								<Calendar type="single" bind:value />
							</Popover.Content>
						</Popover.Root>
					</div>
					<div class="space-y-2">
						<Label for="time-from" class="text-base">Time</Label>
						<div class="relative flex w-full items-center gap-2">
							<Clock2Icon
								class="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none"
							/>
							<Input
								id="time-from"
								type="time"
								step="1"
								value="10:30:00"
								class="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
							/>
						</div>
					</div>
				</div>
				<!-- Submit Button -->
				<AnimatedButton
					title="Submit"
					rounded="full"
					icon={CalendarIcon}
					href="/schedule"
					width="w-full"
				/>
			</div>
			<!-- Right: Illustration (2/5 width) -->
			<div class="hidden w-2/5 md:block">
				<img
					src="schedule.jpg"
					alt="Medical background"
					width="1920"
					height="1080"
					class="h-full w-full object-cover"
				/>
			</div>
		</Card.Content>
	</Card.Root>
</div>
