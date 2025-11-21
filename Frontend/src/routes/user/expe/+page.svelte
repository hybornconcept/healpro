<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Trash2, Plus } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let showPreview = $state(true);

	const clients = [
		{
			value: 'mary-stones',
			label: 'Mary Stones',
			address: '15 Ahmadu Bello Way, Victoria Island, Lagos',
			email: 'mary@gmail.com',
			phone: '+234 803 123 4567',
			website: 'marystones.com'
		},
		{
			value: 'john-doe',
			label: 'John Doe',
			address: '42 Independence Avenue, Garki, Abuja',
			email: 'john@gmail.com',
			phone: '+234 809 876 5432',
			website: 'johndoe.com'
		}
	];

	let billTo = $state('mary-stones');

	const triggerContent = $derived(
		clients.find((c) => c.value === billTo)?.label ?? 'Select client'
	);

	const selectedClient = $derived(clients.find((c) => c.value === billTo));

	const currencies = [
		{ value: 'usd', label: 'US Dollars', symbol: '$' },
		{ value: 'eur', label: 'Euro', symbol: '€' },
		{ value: 'ngn', label: 'Nigerian Naira', symbol: '₦' }
	];

	let invoiceNumber = $state('CRX-INV0039');
	let dueDate = $state('13 Sept 2024');
	let currency = $state('usd');

	const currencyTriggerContent = $derived(
		currencies.find((c) => c.value === currency)?.label ?? 'Select currency'
	);

	const currencySymbol = $derived(currencies.find((c) => c.value === currency)?.symbol ?? '$');

	// Form data that will be reactive
	let projectName = $state('Fillo Product Design');
	let issuedDate = $state('Feb 15, 2025');
	let fromName = $state('Washim Chowdhory');
	let fromAddress = $state('23 Herbert Macaulay Street, Yaba, Lagos');
	let fromABN = $state('RC 123456');
	let fromEmail = $state('washim@gmail.com');
	let fromPhone = $state('+234 801 234 5678');
	let fromWebsite = $state('washim.com');
	let toName = $state('Tony Stark');
	let toAddress = $state('15 Ahmadu Bello Way, Victoria Island, Lagos');
	let toEmail = $state('tony@gmail.com');
	let toPhone = $state('+234 803 123 4567');
	let toWebsite = $state('tonystark.com');

	let items = $state([
		{ name: 'Web & App Design', qty: 1, price: 2500 },
		{ name: 'Logo Design', qty: 1, price: 500 }
	]);

	let total = $derived(items.reduce((sum, item) => sum + item.qty * item.price, 0));

	function addItem() {
		items.push({ name: '', qty: 1, price: 0 });
	}

	function removeItem(index: number) {
		items.splice(index, 1);
	}
</script>

<div class="min-h-screen p-6">
	<div class="mx-auto flex max-w-7xl flex-col items-center">
		<!-- Header -->
		<div class="mb-6 flex w-full items-center justify-between">
			<h1 class="text-2xl font-semibold">New invoice</h1>
			<div class="flex items-center gap-4">
				<div class="flex items-center space-x-2">
					<Switch id="show-preview" bind:checked={showPreview} />
					<Label for="show-preview">Show Preview</Label>
				</div>
				<Button variant="outline">Save as Draft</Button>
				<Button class="bg-blue-600 hover:bg-blue-700">Send Invoice</Button>
			</div>
		</div>

		<div class="flex w-full gap-6 transition-all duration-500 ease-in-out">
			<!-- Left Panel - Form -->
			<div class="transition-all duration-500 ease-in-out {showPreview ? 'w-[40%]' : 'w-[80%]'}">
				<div class="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
					<!-- Invoice Details -->
					<div class="space-y-4">
						<h2 class="text-lg font-semibold">Invoice Details</h2>

						<div class="space-y-2">
							<Label>Project Name</Label>
							<Input bind:value={projectName} placeholder="Enter project name" />
						</div>

						<div class="space-y-2">
							<Label>Issued Date</Label>
							<Input bind:value={issuedDate} placeholder="Enter issued date" />
						</div>

						<div class="space-y-2">
							<Label>Bill To</Label>
							<Select.Root type="single" name="billTo" bind:value={billTo}>
								<Select.Trigger class="w-full">
									{triggerContent}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Clients</Select.Label>
										{#each clients as client (client.value)}
											<Select.Item value={client.value} label={client.label}>
												{client.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label>Invoice Number</Label>
								<Input bind:value={invoiceNumber} />
							</div>
							<div class="space-y-2">
								<Label>Due Date</Label>
								<Input bind:value={dueDate} />
							</div>
						</div>
					</div>

					<!-- Invoice Items -->
					<div class="space-y-4">
						<h2 class="text-lg font-semibold">Invoice Items</h2>

						<div class="space-y-2">
							<Label>Currency</Label>
							<Select.Root type="single" name="currency" bind:value={currency}>
								<Select.Trigger class="w-[180px]">
									{currencyTriggerContent}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Currencies</Select.Label>
										{#each currencies as curr (curr.value)}
											<Select.Item value={curr.value} label={curr.label}>
												{curr.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>

						<div class="space-y-3">
							<div class="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
								<div class="col-span-6">Items</div>
								<div class="col-span-2">QTY</div>
								<div class="col-span-3">Unit Price</div>
								<div class="col-span-1"></div>
							</div>

							{#each items as item, index}
								<div class="grid grid-cols-12 gap-2">
									<Input bind:value={item.name} placeholder="Item name" class="col-span-6" />
									<Input bind:value={item.qty} type="number" class="col-span-2" />
									<Input bind:value={item.price} type="number" class="col-span-3" />
									<Button
										variant="ghost"
										size="sm"
										onclick={() => removeItem(index)}
										class="col-span-1"
									>
										<Trash2 size={16} />
									</Button>
								</div>
							{/each}

							<Button variant="ghost" onclick={addItem} class="w-fit">
								<Plus size={16} class="mr-2" />
								Add Item
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
							<h2 class="text-2xl font-bold text-gray-900">Clorio</h2>
						</div>
					</div>

					<!-- Project and Dates -->
					<div class="mb-8 grid grid-cols-2 gap-8">
						<div>
							<div class="mb-4">
								<div class="text-sm text-gray-600">Project</div>
								<div class="font-medium text-gray-900">{projectName}</div>
							</div>
						</div>
						<div class="text-right">
							<div class="grid grid-cols-2 gap-4">
								<div>
									<div class="text-sm text-gray-600">Issued Date</div>
									<div class="font-medium text-gray-900">{issuedDate}</div>
								</div>
								<div>
									<div class="text-sm text-gray-600">Due Date</div>
									<div class="font-medium text-gray-900">{dueDate}</div>
								</div>
							</div>
						</div>
					</div>

					<!-- From and To -->
					<div class="mb-8 grid grid-cols-2 gap-8">
						<div>
							<div class="mb-2 text-sm text-gray-600">From</div>
							<div class="font-medium text-gray-900">{fromName}</div>
							<div class="text-sm text-gray-600">{fromAddress}</div>
							<div class="text-sm text-gray-600">{fromABN}</div>
							<div class="text-sm text-gray-600">{fromEmail}</div>
							<div class="text-sm text-gray-600">{fromPhone}</div>
							<div class="text-sm text-gray-600">{fromWebsite}</div>
						</div>
						<div class="text-right">
							<div class="mb-2 text-sm text-gray-600">To</div>
							<div class="font-medium text-gray-900">
								{selectedClient?.label || 'Select client'}
							</div>
							<div class="text-sm text-gray-600">{selectedClient?.address || ''}</div>
							<div class="text-sm text-gray-600">{selectedClient?.email || ''}</div>
							<div class="text-sm text-gray-600">{selectedClient?.phone || ''}</div>
							<div class="text-sm text-gray-600">{selectedClient?.website || ''}</div>
						</div>
					</div>

					<!-- Items Table -->
					<div class="mb-8">
						<table class="w-full">
							<thead>
								<tr class="border-b border-gray-200 text-left text-sm text-gray-600">
									<th class="pb-3 font-medium">Description</th>
									<th class="pb-3 text-center font-medium">Units</th>
									<th class="pb-3 text-center font-medium">Price</th>
									<th class="pb-3 text-center font-medium">GST</th>
									<th class="pb-3 text-right font-medium">Amount</th>
								</tr>
							</thead>
							<tbody>
								{#each items as item}
									<tr class="border-b border-gray-100">
										<td class="py-4 text-gray-900">{item.name}</td>
										<td class="py-4 text-center text-gray-900">{item.qty}</td>
										<td class="py-4 text-center text-gray-900"
											>{currencySymbol}{item.price.toLocaleString()}</td
										>
										<td class="py-4 text-center text-gray-900">0.00</td>
										<td class="py-4 text-right text-gray-900"
											>{currencySymbol}{(item.qty * item.price).toLocaleString()}.00</td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Total Amount -->
					<div class="mb-8 flex items-center justify-between border-t border-gray-200 pt-4">
						<div class="text-lg font-semibold text-gray-900">Total Amount</div>
						<div class="text-xl font-bold text-gray-900">
							{currencySymbol}{total.toLocaleString()}.00
						</div>
					</div>

					<!-- Note -->
					<div class="mb-8 text-sm text-gray-600">
						<strong>Note:</strong> There will be a late payment fee of 10% per annum calculated daily
						for payments made after the due date.
					</div>

					<!-- Payment Method -->
					<div class="grid grid-cols-2 gap-8">
						<div>
							<div class="mb-4">
								<div class="mb-2 text-lg font-semibold text-gray-900">Payment Method</div>
								<div class="space-y-1 text-sm text-gray-600">
									<div>EFT Bank Transfer</div>
									<div>Account Name: Washim Chowdhury</div>
									<div>Code: 123456</div>
									<div>Account Number: 991188343445123</div>
								</div>
							</div>
						</div>
						<div class="text-right">
							<div class="mb-4">
								<div class="mb-8 text-lg font-semibold text-gray-900">Washim Chowdhury</div>
								<div class="text-sm text-gray-600">Note: GST will be paid by me, Tony Stark.</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
