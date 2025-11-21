<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Trash2, Plus, Stethoscope, Pill } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let showPreview = $state(true);

	// Dynamic data from server
	let states = $state(data.states || []);
	let facilities = $state(data.facilities || {});
	let patients = $state(data.patients || []);
	let defaultItems = $state(data.defaultItems || []);
	let invoiceNumber = $state(data.invoiceNumber || 'MED-INV-2024-001');
	let serviceDate = $state(data.serviceDate || new Date().toLocaleDateString('en-GB'));
	let dueDate = $state(data.dueDate || '30 days from issue');
	let defaultProvider = $state(data.defaultProvider || null);

	// Define State type
	type State = 'lagos' | 'abuja' | 'rivers' | 'kano' | 'oyo';

	// Define Facility type
	type Facility = {
		value: string;
		label: string;
		address: string;
		phone: string;
		email: string;
		license: string;
	};

	let selectedState = $state<State>('lagos');
	let selectedFacility = $state(defaultProvider?.value || 'lagos-hospital');
	const currentFacilities = $derived(facilities[selectedState] || []);

	let billTo = $state('john-doe');
	const selectedPatient = $derived(patients.find((p) => p.value === billTo));

	// Form data
	let providerName = $state('');
	let providerDetails = $state<Facility | null>(null);

	let items = $state([...defaultItems]);

	let total = $derived(items.reduce((sum, item) => sum + item.qty * item.price, 0));

	function addItem() {
		items.push({
			name: '',
			qty: 1,
			price: 0
		});
	}

	function removeItem(index: number) {
		items.splice(index, 1);
	}

	// Update provider when facility changes
	$effect(() => {
		const facility = currentFacilities.find((f: Facility) => f.value === selectedFacility);
		if (facility) {
			providerName = facility.label;
			providerDetails = facility;
		}
	});
</script>

<div class="min-h-screen p-6">
	<div class="mx-auto flex max-w-7xl flex-col items-center">
		<!-- Header -->
		<div class="mb-6 flex w-full items-center justify-between">
			<h1 class="text-2xl font-semibold">Health Service Invoice</h1>
			<div class="flex items-center gap-4">
				<div class="flex items-center space-x-2">
					<Switch id="show-preview" bind:checked={showPreview} />
					<Label for="show-preview">Show Preview</Label>
				</div>

				<Button class="bg-blue-600 hover:bg-blue-700">Submit to Insurance</Button>
			</div>
		</div>

		<div class="flex w-full gap-6 transition-all duration-500 ease-in-out">
			<!-- Left Panel - Form -->
			<div class="transition-all duration-500 ease-in-out {showPreview ? 'w-[40%]' : 'w-[80%]'}">
				<div class="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
					<!-- Invoice Details -->
					<div class="space-y-4">
						<h2 class="flex items-center gap-2 text-lg font-semibold">
							<Stethoscope class="h-5 w-5" /> Invoice details
						</h2>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label>Invoice Number</Label>
								<Input bind:value={invoiceNumber} />
							</div>
							<div class="space-y-2">
								<Label>Service Date</Label>
								<Input bind:value={serviceDate} />
							</div>
						</div>

						<div class="space-y-2">
							<Label>Patient</Label>
							<div class="rounded-md bg-gray-100 px-3 py-2 font-medium">
								{selectedPatient?.label || 'Patient name from backend'}
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label>Location</Label>
								<Select.Root type="single" name="state" bind:value={selectedState}>
									<Select.Trigger class="w-full">
										{states.find((s) => s.value === selectedState)?.label || 'Select state'}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>States</Select.Label>
											{#each states as state (state.value)}
												<Select.Item value={state.value} label={state.label}>
													{state.label}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</div>

							<div class="space-y-2">
								<Label>Provider</Label>
								<Select.Root
									type="single"
									name="facility"
									bind:value={selectedFacility}
									disabled={!selectedState}
								>
									<Select.Trigger class="w-full">
										{currentFacilities.find((f: Facility) => f.value === selectedFacility)?.label ||
											'Select provider'}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Facilities</Select.Label>
											{#each currentFacilities as facility (facility.value)}
												<Select.Item value={facility.value} label={facility.label}>
													{facility.label}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</div>
						</div>
					</div>

					<!-- Service Items -->
					<div class="space-y-4">
						<h2 class="flex items-center gap-2 text-lg font-semibold">
							<Pill class="h-5 w-5" /> Service Items
						</h2>

						<div class="space-y-3">
							<div class="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
								<div class="col-span-6">Service</div>
								<div class="col-span-2">QTY</div>
								<div class="col-span-2">Price</div>
							</div>

							{#each items as item, index}
								<div class="grid grid-cols-12 items-center gap-2">
									<Input bind:value={item.name} placeholder="Service name" class="col-span-6" />
									<Input bind:value={item.qty} type="number" class="col-span-2" />
									<div class="col-span-4 flex items-center gap-1">
										<Input bind:value={item.price} type="number" class="flex-1" />
										<Button
											variant="ghost"
											size="xs"
											onclick={() => removeItem(index)}
											class="rounded-full p-1"
										>
											<Trash2 size={16} />
										</Button>
									</div>
								</div>
							{/each}

							<Button onclick={addItem} class="w-fit rounded-full">
								<Plus size={16} class="mr-2" />
								Add Service
							</Button>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Panel - Preview -->
			{#if showPreview}
				<div
					class="w-[60%] rounded-lg bg-white p-8 shadow-sm transition-all duration-500 ease-in-out"
				>
					<!-- Header -->
					<div class="mb-8 flex items-start justify-between">
						<div>
							<h1 class="text-4xl font-bold text-gray-900">Invoice</h1>
							<div class="mt-1 text-sm text-gray-600">#{invoiceNumber}</div>
						</div>
						<div class="text-right">
							<h2 class="text-2xl font-bold text-gray-900">{providerName}</h2>
						</div>
					</div>

					<!-- Service and Dates -->
					<div class="mb-8 grid grid-cols-2 gap-8">
						<div>
							<div class="mb-4">
								<div class="text-sm text-gray-600">Service Date</div>
								<div class="font-medium text-gray-900">{serviceDate}</div>
							</div>
						</div>
						<div class="text-right">
							<div>
								<div class="text-sm text-gray-600">Due Date</div>
								<div class="font-medium text-gray-900">{dueDate}</div>
							</div>
						</div>
					</div>

					<!-- Provider and Patient -->
					<div class="mb-8 grid grid-cols-2 gap-8">
						<div>
							<div class="mb-2 text-sm text-gray-600">Provider</div>
							<div class="font-medium text-gray-900">{providerName}</div>
							<div class="text-sm text-gray-600">123 Health Street, Lagos</div>
							<div class="text-sm text-gray-600">+234 701 234 5678</div>
							<div class="text-sm text-gray-600">billing@medicare.com</div>
							<div class="text-sm text-gray-600">License: MED-123456</div>
						</div>
						<div class="text-right">
							
							<div class="mb-2 text-sm text-gray-600">Patient</div>
							<div class="font-medium text-gray-900">
								{selectedPatient?.label || 'Patient name from backend'}
							</div>
							<div class="text-sm text-gray-600">Policy: {selectedPatient?.policy || ''}</div>
							<div class="text-sm text-gray-600">DOB: {selectedPatient?.dob || ''}</div>
							<div class="text-sm text-gray-600">{selectedPatient?.address || ''}</div>
							<div class="text-sm text-gray-600">{selectedPatient?.phone || ''}</div>
						</div>
					</div>

					<!-- Services Table -->
					<div class="mb-8">
						<table class="w-full">
							<thead>
								<tr class="border-b border-gray-200 text-left text-sm text-gray-600">
									<th class="w-[20%] pb-3 font-medium">Service</th>
									<th class="w-[15%] pb-3 font-medium">Service Code</th>
									<th class="w-[10%] pb-3 text-center font-medium">QTY</th>
									<th class="w-[15%] pb-3 text-center font-medium">Unit Price</th>
									<th class="w-[15%] pb-3 text-right font-medium">Amount</th>
								</tr>
							</thead>
							<tbody>
								{#each items as item, index}
									<tr class="border-b border-gray-100">
										<td class="w-[20%] py-4 text-gray-900">
											<div class="break-words whitespace-normal">{item.name}</div>
										</td>
										<td class="w-[15%] py-4 text-gray-900">SVC-{index + 1}</td>
										<td class="w-[10%] py-4 text-center text-gray-900">{item.qty}</td>
										<td class="w-[15%] py-4 text-center text-gray-900">
											₦{item.price.toLocaleString()}
										</td>
										<td class="w-[15%] py-4 text-right text-gray-900">
											₦{(item.qty * item.price).toLocaleString()}.00
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Total Amount -->
					<div class="mb-8 flex items-center justify-between border-t border-gray-200 pt-4">
						<div class="text-lg font-semibold text-gray-900">Total Amount</div>
						<div class="text-xl font-bold text-gray-900">
							₦{total.toLocaleString()}.00
						</div>
					</div>

					<!-- Note -->
					<div class="mb-8 text-sm text-gray-600">
						<strong>Note:</strong> There will be a late payment fee of 0% per annum calculated daily
						for payments made after the due date.
					</div>

					<!-- Payment Method -->
					<div class="grid grid-cols-2 gap-8">
						<div>
							<div class="mb-4">
								<div class="mb-2 text-lg font-semibold text-gray-900">Payment Method</div>
								<div class="space-y-1 text-sm text-gray-600">
									<div>EFT Bank Transfer</div>
									<div>Account Name: Medicare Billing</div>
									<div>Bank: Zenith Bank</div>
									<div>Account Number: 1234567890</div>
								</div>
							</div>
						</div>
						<div class="text-right">
							<div class="mb-4">
								<div class="text-sm text-gray-600">Note: Payment due within 30 days.</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
