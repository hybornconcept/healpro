<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Paperclip, Send, ArrowRight, Search, Phone } from '@lucide/svelte';

	let messageText = $state('');
	let selectedContactId = $state(1);
	let searchQuery = $state('');
	let selectedFilter = $state('All');

	// Get data from server
	const { data } = $props();
	let contacts = $state(data.contacts);

	// Reactive state and computed properties
	const currentContact = $derived(contacts.find((c) => c.id === selectedContactId) || contacts[0]);
	const currentChatMessages = $derived(currentContact.chatMessages);
	const currentMedicalHistory = $derived(currentContact.medicalHistory);

	// Filtered contacts based on search and filter
	const filteredContacts = $derived(() => {
		let filtered = contacts;

		// Filter by search query
		if (searchQuery.trim()) {
			filtered = filtered.filter(
				(contact) =>
					contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					contact.role.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Filter by notification status
		if (selectedFilter === 'Appointment') {
			filtered = filtered.filter((contact) => contact.hasNotification);
		}

		return filtered;
	});

	function selectContact(contactId: number) {
		selectedContactId = contactId;
	}

	function setFilter(filter: string) {
		selectedFilter = filter;
	}

	function sendMessage() {
		if (!messageText.trim()) return;

		// Find the current contact and add the message
		const contact = contacts.find((c) => c.id === selectedContactId);
		if (contact) {
			const newMessage = {
				id: contact.chatMessages.length + 1,
				sender: 'You',
				message: messageText.trim(),
				time: new Date().toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true
				}),
				isUser: true,
				avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
			};

			contact.chatMessages.push(newMessage);
			messageText = '';
		}
	}
</script>

<!-- Header -->
<div class="-mb-5 px-6 py-2">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold text-gray-900">Message</h1>
		<Button
			class="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
		>
			+ New Message
		</Button>
	</div>
</div>

<!-- Main Content -->
<div class="flex gap-4 p-4">
	<!-- Left Card - Message List (30% width) -->
	<Card.Root class="flex h-[calc(100vh-10px)] w-[30%] flex-col">
		<Card.Content class="flex h-full flex-col p-0">
			<!-- Message Header -->
			<div class="border-b border-gray-200 px-4 py-0 pb-3">
				<!-- Message List Filters -->
				<div class="space-y-3">
					<div class="relative">
						<input
							bind:value={searchQuery}
							type="text"
							placeholder="Message list"
							class="w-full rounded-full border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						/>
						<div class="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400">
							<Search class="h-4 w-4" />
						</div>
					</div>

					<div class="flex gap-2">
						<button
							onclick={() => setFilter('All')}
							class="rounded-full px-3 py-1 text-sm {selectedFilter === 'All'
								? 'bg-blue-600 text-white'
								: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
						>
							All
						</button>
						<button
							onclick={() => setFilter('Appointment')}
							class="flex items-center gap-1 rounded-full px-3 py-1 text-sm {selectedFilter ===
							'Appointment'
								? 'bg-blue-600 text-white'
								: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
						>
							<div class="h-2 w-2 rounded-full bg-red-500"></div>
							Appointment
						</button>
						<button
							onclick={() => setFilter('Lab Result')}
							class="rounded-full px-3 py-1 text-sm {selectedFilter === 'Lab Result'
								? 'bg-blue-600 text-white'
								: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
						>
							Lab Result
						</button>
					</div>
				</div>
			</div>

			<!-- Message List -->
			<div class="flex-1 overflow-y-auto">
				{#each filteredContacts() as contact}
					<button
						class="w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 {contact.id ===
						selectedContactId
							? 'border-l-4 border-l-blue-600 bg-blue-50'
							: ''}"
						onclick={() => selectContact(contact.id)}
					>
						<div class="flex items-start gap-3">
							<div class="relative">
								<img
									src={contact.avatar}
									alt={contact.name}
									class="h-10 w-10 rounded-full object-cover"
								/>
								{#if contact.hasNotification}
									<div class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
								{/if}
							</div>
							<div class="min-w-0 flex-1">
								<div class="flex items-center justify-between">
									<h3 class="truncate font-medium text-gray-900">{contact.name}</h3>
									<span class="text-xs text-gray-500">{contact.time}</span>
								</div>
								<p class="truncate text-sm text-gray-600">{contact.role}</p>
								{#if contact.hasNotification}
									<div class="mt-1 h-2 w-2 rounded-full bg-red-500"></div>
								{/if}
							</div>
						</div>
					</button>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Merged Card - Chat + Details (70% width) -->
	<Card.Root class="flex h-[calc(100vh-10px)] w-[70%] border border-gray-200 shadow-sm">
		<Card.Content class="flex h-full w-full p-0">
			<!-- Chat Area (40% of merged card) -->
			<div class="flex h-full w-full flex-col bg-white">
				<!-- Chat Header -->
				<div class=" border-0 border-b border-gray-200 bg-white px-4 py-0 pb-3">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<img
								src={currentContact.avatar}
								alt={currentContact.name}
								class="h-10 w-10 rounded-full object-cover"
							/>
							<div>
								<h2 class="font-semibold text-gray-900">{currentContact.name}</h2>
								<p class="text-sm text-gray-600">{currentContact.role}</p>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<Button variant="outline" size="sm" class="flex items-center gap-2">
								<Phone class="h-4 w-4" />
								Call Patient
							</Button>
						</div>
					</div>
				</div>

				<!-- Chat Messages Container -->
				<div class="flex min-h-0 flex-1 flex-col">
					<!-- Messages Area -->
					<div class="flex-1 space-y-4 overflow-y-auto p-4">
						{#each currentChatMessages as msg}
							<div class="flex {msg.isUser ? 'justify-end' : 'justify-start'}">
								<div
									class="flex max-w-[70%] items-start gap-3 {msg.isUser ? 'flex-row-reverse' : ''}"
								>
									<img
										src={msg.avatar}
										alt={msg.sender}
										class="h-8 w-8 rounded-full object-cover"
									/>
									<div class="flex flex-col {msg.isUser ? 'items-end' : 'items-start'}">
										<div
											class="rounded-lg px-4 py-2 {msg.isUser
												? 'bg-blue-600 text-white'
												: 'bg-gray-100 text-gray-900'}"
										>
											<p class="text-sm">{msg.message}</p>
											{#if msg.hasAttachment}
												<div class="mt-2 rounded border bg-white p-2">
													<div class="flex items-center gap-2">
														<div
															class="flex h-10 w-8 items-center justify-center rounded bg-red-100"
														>
															<span class="text-xs font-bold text-red-600">PDF</span>
														</div>
														<span class="text-xs text-gray-600">{msg.attachmentName}</span>
													</div>
												</div>
											{/if}
										</div>
										<span class="mt-1 text-xs text-gray-500">{msg.time}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Message Input - Fixed at bottom -->
					<div class="-mb-5 border-t border-gray-200 bg-white px-4 py-2">
						<div class="relative flex items-center">
							<input
								bind:value={messageText}
								type="text"
								placeholder="Enter message"
								class="w-full rounded-full border-0 bg-gray-100 px-4 py-3 pr-24 text-sm placeholder-gray-500 focus:outline-none"
								onkeydown={(e) => e.key === 'Enter' && sendMessage()}
							/>
							<div class="absolute right-5 flex items-center gap-2">
								<button
									class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600"
								>
									<Paperclip class="h-4 w-4" />
								</button>
								<button
									onclick={sendMessage}
									class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
								>
									<Send class="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Detail Information Panel (43% of merged card) -->
			<!-- <div class="w-[35%] border-l border-gray-200 bg-gray-50">
				<!-- Detail Header -->
			<!-- <div class="border-b border-gray-200 bg-white p-4">
					<h3 class="font-semibold text-gray-900">Detail information</h3>
				</div> -->

			<!-- Detail Content -->
			<!-- <div class="p-4">
					<div class="space-y-3">
					
						<div class="space-y-1">
							<div class="flex justify-between">
								<span class="text-sm text-gray-500">ID</span>
								<span class="text-sm font-medium">{currentContact.patientInfo.id}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-500">Date of Birth</span>
								<span class="text-sm font-medium">{currentContact.patientInfo.dateOfBirth}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-500">Contact</span>
								<span class="text-sm font-medium">{currentContact.patientInfo.contact}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-500">Appointment</span>
								<span class="text-sm font-medium">{currentContact.patientInfo.appointment}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-500">Medications</span>
								<span class="text-sm font-medium">{currentContact.patientInfo.medications}</span>
							</div>
						</div>

						<!-- Medical History -->
			<!-- <div>
							<div class="mb-3 flex items-center justify-between">
								<h3 class="font-semibold text-gray-900">Medical history</h3>
								<ArrowRight class="h-4 w-4 text-gray-400" />
							</div>
							<div class="relative">
								<div class="absolute top-2 bottom-2 left-1 w-px bg-blue-200"></div>
								<div class="space-y-4">
									{#each currentMedicalHistory as item}
										<div class="relative flex items-start gap-3">
											<div class="relative z-10 h-2 w-2 rounded-full bg-blue-500"></div>
											<div class="-mt-0.5 flex-1">
												<p class="text-sm font-medium text-gray-900">{item.type}</p>
												<p class="text-xs text-gray-500">{item.date} • {item.time}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div> -->
			<!-- </div> -->
			<!-- </div> -->
			<!-- </div> -->
		</Card.Content>
	</Card.Root>
</div>
