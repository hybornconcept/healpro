<script lang="ts">
	import { onMount } from 'svelte';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { PageData } from './$types';
	import { XIcon, CheckIcon, LoaderCircle } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	// Claims data using Svelte 5 runes
	let selectedClaimId = $state(0);
	let isClaimSheetOpen = $state(false);
	let sheetAction = $state(''); // 'approve', 'reject', or 'pending'
	let actionComment = $state('');

	// Implement virtual scrolling for better performance
	let visibleClaims = $state(data.claims.slice(0, 10)); // Show only first 10 initially
	let isLoading = $state(false);

	const claims = data.claims;

	// Priority filter combobox
	const priorities = [
		{ value: 'all', label: 'All Priorities' },
		{ value: 'high', label: 'High Priority' },
		{ value: 'medium', label: 'Medium Priority' },
		{ value: 'low', label: 'Low Priority' }
	];

	let priorityValue = $state('all');

	const selectedPriorityLabel = $derived(priorities.find((p) => p.value === priorityValue)?.label);

	// Lazy load more claims when scrolling
	const loadMoreClaims = () => {
		if (isLoading || visibleClaims.length >= claims.length) return;

		isLoading = true;
		setTimeout(() => {
			const nextBatch = claims.slice(visibleClaims.length, visibleClaims.length + 10);
			visibleClaims = [...visibleClaims, ...nextBatch];
			isLoading = false;
		}, 100);
	};

	// Filtered claims based on priority with virtual scrolling
	const filteredClaims = $derived(() => {
		const filtered =
			priorityValue === 'all'
				? visibleClaims
				: visibleClaims.filter((claim) => claim.priority.toLowerCase() === priorityValue);
		return filtered;
	});

	// Function to select a claim
	function selectClaim(id: number) {
		selectedClaimId = id;
	}

	// Intersection observer for infinite scroll
	let scrollContainer: HTMLElement;

	onMount(() => {
		if (!scrollContainer) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreClaims();
				}
			},
			{ threshold: 0.1 }
		);

		const sentinel = scrollContainer.querySelector('.scroll-sentinel');
		if (sentinel) observer.observe(sentinel);

		return () => observer.disconnect();
	});

	// Computed property for selected claim using Svelte 5 derived state
	const selectedClaim = $derived(
		filteredClaims().find((claim) => claim.id === selectedClaimId) || filteredClaims()[0]
	);

	// Function to open claim details sheet
	function openClaimSheet(action = '') {
		sheetAction = action;
		actionComment = '';
		isClaimSheetOpen = true;
	}

	// Function to approve claim
	function approveClaim() {
		openClaimSheet('approve');
	}

	// Function to reject claim
	function rejectClaim() {
		openClaimSheet('reject');
	}

	// Function to set pending
	function setPending() {
		openClaimSheet('pending');
	}

	// Function to submit action
	function submitAction() {
		if (!actionComment.trim()) {
			alert('Please provide a comment for this action.');
			return;
		}

		const actionText =
			sheetAction === 'approve'
				? 'approved'
				: sheetAction === 'reject'
					? 'rejected'
					: 'set to pending';

		alert(`Claim ${selectedClaim.claimNumber} has been ${actionText}.\nComment: ${actionComment}`);
		isClaimSheetOpen = false;
		actionComment = '';
		sheetAction = '';
	}
</script>

<!-- Main Section -->
<div class="flex flex-1 gap-6 overflow-auto px-8 py-6">
	<!-- Claims List -->
	<div class="w-[400px] flex-shrink-0" style="font-family: 'Source Sans Pro', sans-serif;">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-semibold">Insurance Claims</h2>
			<Select.Root type="single" name="priority" bind:value={priorityValue}>
				<Select.Trigger class="w-[140px]">
					{selectedPriorityLabel}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each priorities as priority (priority.value)}
							<Select.Item value={priority.value} label={priority.label}>
								{priority.label}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<div
			bind:this={scrollContainer}
			class="flex flex-col gap-4 overflow-y-auto pr-2"
			style="height: calc(100vh - 160px);"
		>
			{#each filteredClaims() as claim}
				<div
					class="cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition
                                {claim.id === selectedClaimId
						? 'border-blue-500 ring-2 ring-blue-100'
						: 'hover:border-blue-300'}"
					role="button"
					tabindex="0"
					onclick={() => selectClaim(claim.id)}
					onkeydown={(e) => e.key === 'Enter' && selectClaim(claim.id)}
				>
					<div class="mb-3 flex items-start justify-between">
						<div class="flex items-center gap-3">
							<img
								src={claim.personalInfo.avatar}
								alt={claim.personalInfo.fullName}
								class="h-10 w-10 rounded-full object-cover"
								loading="lazy"
								decoding="async"
							/>
							<div>
								<div class="font-semibold text-gray-800">{claim.claimNumber}</div>
								<div class="text-sm text-gray-600">{claim.personalInfo.fullName}</div>
							</div>
						</div>
						<div class="flex flex-col items-end">
							<span
								class="rounded-full px-2 py-1 text-xs font-medium
								{claim.priority === 'High'
									? 'bg-red-100 text-red-800'
									: claim.priority === 'Medium'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-gray-100 text-gray-800'}"
							>
								{claim.priority} Priority
							</span>
							<span
								class="mt-1 text-xs font-medium
								{claim.plan === 'Platinum'
									? 'text-purple-600'
									: claim.plan === 'Gold'
										? 'text-yellow-600'
										: 'text-gray-600'}"
							>
								{claim.plan} Plan
							</span>
						</div>
					</div>

					<div class="mb-2 space-y-1">
						<div class="flex justify-between text-xs">
							<span class="text-gray-500">Submitted:</span>
							<span class="text-gray-700">{claim.submissionDate}</span>
						</div>
						<div class="flex justify-between text-xs">
							<span class="text-gray-500">Service Date:</span>
							<span class="text-gray-700">{claim.visitDetails.serviceDate}</span>
						</div>
						<div class="flex justify-between text-xs">
							<span class="text-gray-500">Visit Type:</span>
							<span class="text-gray-700">{claim.visitDetails.visitType}</span>
						</div>
					</div>

					<div class="flex items-center justify-between border-t pt-2">
						<span class="text-xs text-gray-500">Claim Amount</span>
						<span class="font-semibold text-gray-800">{claim.claimAmount}</span>
					</div>
				</div>
			{/each}

			<!-- Scroll sentinel for infinite loading -->
			{#if visibleClaims.length < claims.length}
				<div class="scroll-sentinel flex justify-center py-4">
					{#if isLoading}
						<div class="flex items-center gap-2 text-gray-500">
							<LoaderCircle class="h-4 w-4 animate-spin" />
							<span class="text-sm">Loading more claims...</span>
						</div>
					{:else}
						<div class="h-4"></div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<!-- Claim Details -->
	<div class="flex-1">
		<div class="rounded-xl border bg-white p-6 shadow-sm">
			<!-- Claim Header -->
			<div class="mb-6 flex items-center justify-between">
				<div class="flex items-center gap-4">
					<img
						src={selectedClaim.personalInfo.avatar}
						alt={selectedClaim.personalInfo.fullName}
						class="h-16 w-16 rounded-full object-cover"
					/>
					<div>
						<h2 class="text-xl font-semibold text-gray-800">{selectedClaim.claimNumber}</h2>
						<div class="text-sm text-gray-500">
							{selectedClaim.personalInfo.fullName} |
							<span
								class="text-xs font-medium
								{selectedClaim.plan === 'Platinum'
									? 'text-purple-600'
									: selectedClaim.plan === 'Gold'
										? 'text-yellow-600'
										: 'text-gray-600'}"
							>
								{selectedClaim.plan} Plan
							</span>
						</div>
						<div class="mt-1 flex items-center gap-2">
							<span
								class="rounded-full px-2 py-1 text-xs font-medium
								{selectedClaim.priority === 'High'
									? 'bg-red-100 text-red-800'
									: selectedClaim.priority === 'Medium'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-gray-100 text-gray-800'}"
							>
								{selectedClaim.priority} Priority
							</span>
						</div>
					</div>
				</div>
				<div class="flex gap-2">
					<button
						class="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
						onclick={approveClaim}
					>
						Approve
						<div class="h-4 w-px bg-white/30"></div>
						<CheckIcon class="h-4 w-4" />
					</button>
					<button
						class="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
						onclick={rejectClaim}
					>
						Reject
						<div class="h-4 w-px bg-white/30"></div>
						<XIcon class="h-4 w-4" />
					</button>
					<button
						class="flex items-center gap-2 rounded-full bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
						onclick={setPending}
					>
						Pending
						<div class="h-4 w-px bg-white/30"></div>
						<LoaderCircle class="h-4 w-4" />
					</button>
				</div>
			</div>

			<!-- Claim Summary -->
			<div
				class="mb-6 rounded-lg border bg-blue-50 p-4"
				style="font-family: 'Source Sans Pro', sans-serif;"
			>
				<h3 class="text-lg font-semibold text-blue-900">Claim Summary</h3>
				<p class="text-2xl font-bold text-blue-800">Amount: {selectedClaim.claimAmount}</p>
			</div>

			<!-- Claim Details Sections -->
			<div class="grid grid-cols-2 gap-6" style="font-family: 'Source Sans Pro', sans-serif;">
				<!-- Left Column -->
				<div class="space-y-6">
					<!-- Personal Information -->
					<div class="border-b border-gray-200 pb-4">
						<h3 class="mb-3 text-sm font-medium text-gray-400">Personal Information</h3>
						<div class="space-y-2">
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Full Name:</span>
								<span class="text-sm text-gray-800">{selectedClaim.personalInfo.fullName}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Date of Birth:</span>
								<span class="text-sm text-gray-800">{selectedClaim.personalInfo.dateOfBirth}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Gender:</span>
								<span class="text-sm text-gray-800">{selectedClaim.personalInfo.gender}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Phone:</span>
								<span class="text-sm text-gray-800">{selectedClaim.personalInfo.phone}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Email:</span>
								<span class="text-sm text-gray-800">{selectedClaim.personalInfo.email}</span>
							</div>
						</div>
					</div>

					<!-- Medical History -->
					{#if selectedClaim?.medicalHistory}
						<div class="border-b border-gray-200 pb-4">
							<h3 class="mb-3 text-sm font-medium text-gray-400">Medical History</h3>
							<div class="space-y-3">
								{#if selectedClaim.medicalHistory?.allergies && selectedClaim.medicalHistory.allergies.length > 0 && selectedClaim.medicalHistory.allergies[0] !== 'None known'}
									<div>
										<span class="text-sm font-medium text-gray-600">Allergies:</span>
										<div class="mt-1 text-sm text-gray-800">
											{selectedClaim.medicalHistory.allergies.join(', ')}
										</div>
									</div>
								{/if}
								{#if selectedClaim.medicalHistory?.chronicConditions && selectedClaim.medicalHistory.chronicConditions.length > 0 && selectedClaim.medicalHistory.chronicConditions[0] !== 'None'}
									<div>
										<span class="text-sm font-medium text-gray-600">Chronic Conditions:</span>
										<div class="mt-1 text-sm text-gray-800">
											{selectedClaim.medicalHistory.chronicConditions.join(', ')}
										</div>
									</div>
								{/if}
								{#if selectedClaim.medicalHistory?.previousSurgeries && selectedClaim.medicalHistory.previousSurgeries.length > 0 && selectedClaim.medicalHistory.previousSurgeries[0] !== 'None'}
									<div>
										<span class="text-sm font-medium text-gray-600">Previous Surgeries:</span>
										<div class="mt-1 text-sm text-gray-800">
											{selectedClaim.medicalHistory.previousSurgeries.join(', ')}
										</div>
									</div>
								{/if}
								{#if selectedClaim.medicalHistory?.currentMedications && selectedClaim.medicalHistory.currentMedications.length > 0 && !selectedClaim.medicalHistory.currentMedications[0].includes('None')}
									<div>
										<span class="text-sm font-medium text-gray-600">Current Medications:</span>
										<div class="mt-1 text-sm text-gray-800">
											{selectedClaim.medicalHistory.currentMedications.join(', ')}
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Insurance Details -->
					{#if selectedClaim.insuranceDetails}
						<div class="border-b border-gray-200 pb-4">
							<h3 class="mb-3 text-sm font-medium text-gray-400">Insurance Details</h3>
							<div class="space-y-2">
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Company:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.insuranceDetails.companyName}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Policy Number:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.identificationDetails.insurancePolicyNumber}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Member ID:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.identificationDetails.memberHealthPlanId}</span
									>
								</div>
							</div>
						</div>
					{/if}

					<!-- Visit Details -->
					<div class="border-b border-gray-200 pb-4">
						<h3 class="mb-3 text-sm font-medium text-gray-400">Visit Details</h3>
						<div class="space-y-2">
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Service Date:</span>
								<span class="text-sm text-gray-800">{selectedClaim.visitDetails.serviceDate}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Visit Type:</span>
								<span class="text-sm text-gray-800">{selectedClaim.visitDetails.visitType}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-gray-600">Reason:</span>
								<span class="text-sm text-gray-800"
									>{selectedClaim.visitDetails.reasonForVisit}</span
								>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column -->
				<div class="space-y-6">
					<!-- Medical Provider Details -->
					{#if selectedClaim.medicalProviderDetails}
						<div class="border-b border-gray-200 pb-4">
							<h3 class="mb-3 text-sm font-medium text-gray-400">Medical Provider Details</h3>
							<div class="space-y-2">
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Provider:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.medicalProviderDetails.providerName}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Physician:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.medicalProviderDetails.physicianName}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">License:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.medicalProviderDetails.physicianLicense}</span
									>
								</div>
							</div>
						</div>
					{/if}

					<!-- Diagnosis & Treatment -->
					{#if selectedClaim.diagnosisAndTreatment}
						<div class="border-b border-gray-200 pb-4">
							<h3 class="mb-3 text-sm font-medium text-gray-400">Diagnosis & Treatment</h3>
							<div class="space-y-2">
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">ICD-10 Codes:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.diagnosisAndTreatment.icd10Codes.join(', ')}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">CPT Codes:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.diagnosisAndTreatment.cptCodes.join(', ')}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Diagnosis:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.diagnosisAndTreatment.diagnosisDescription}</span
									>
								</div>
							</div>
						</div>
					{/if}

					<!-- Billing Information -->
					{#if selectedClaim.billingInfo}
						<div class="border-b border-gray-200 pb-4">
							<h3 class="mb-3 text-sm font-medium text-gray-400">Billing Information</h3>
							<div class="space-y-2">
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Total Cost:</span>
									<span class="text-sm font-semibold text-gray-800"
										>{selectedClaim.billingInfo.totalCost}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Co-pay:</span>
									<span class="text-sm text-gray-800">{selectedClaim.billingInfo.copay}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Deductible:</span>
									<span class="text-sm text-gray-800">{selectedClaim.billingInfo.deductible}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-sm text-gray-600">Patient Paid:</span>
									<span class="text-sm text-gray-800"
										>{selectedClaim.billingInfo.patientPaidAmount}</span
									>
								</div>
							</div>
						</div>
					{/if}

					<!-- Supporting Documents -->
					{#if selectedClaim.supportingDocuments}
						<div>
							<h3 class="mb-3 text-sm font-medium text-gray-400">Supporting Documents</h3>
							<div class="space-y-1">
								{#each selectedClaim.supportingDocuments as document}
									<div class="flex items-center gap-2">
										<div class="h-2 w-2 rounded-full bg-blue-500"></div>
										<span class="text-sm text-gray-800">{document}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Claim Details Sheet -->
<Sheet.Root bind:open={isClaimSheetOpen}>
	<Sheet.Content side="right" class="w-[500px] sm:w-[600px]">
		<Sheet.Header>
			<Sheet.Title>
				{sheetAction === 'approve'
					? 'Approve Claim'
					: sheetAction === 'reject'
						? 'Reject Claim'
						: sheetAction === 'pending'
							? 'Set Claim to Pending'
							: 'Claim Details'}
			</Sheet.Title>
			<Sheet.Description>
				{sheetAction
					? `Provide a reason for ${sheetAction === 'approve' ? 'approving' : sheetAction === 'reject' ? 'rejecting' : 'setting to pending'} this claim`
					: 'Complete claim information'}
			</Sheet.Description>
		</Sheet.Header>

		<div
			class="flex max-h-[80vh] flex-1 flex-col gap-6 overflow-y-auto px-6 py-6"
			style="font-family: 'Source Sans Pro', sans-serif;"
		>
			{#if sheetAction}
				<!-- Action Form -->
				<div class="space-y-6">
					<!-- Client Information -->
					<div class="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
						<div class="flex items-center gap-4">
							<img
								src={selectedClaim.personalInfo.avatar}
								alt={selectedClaim.personalInfo.fullName}
								class="h-16 w-16 rounded-full object-cover"
							/>
							<div>
								<h4 class="text-lg font-bold text-gray-900">
									{selectedClaim.personalInfo.fullName} |
									<span
										class="text-xs font-medium
										{selectedClaim.plan === 'Platinum'
											? 'text-purple-600'
											: selectedClaim.plan === 'Gold'
												? 'text-yellow-600'
												: 'text-gray-600'}"
									>
										{selectedClaim.plan} Plan
									</span>
								</h4>
								<p class="text-sm font-medium text-gray-700">
									Claim ID: {selectedClaim.claimNumber}
								</p>
								<p class="text-sm text-gray-600">{selectedClaim.claimAmount}</p>
							</div>
						</div>
						<span
							class="rounded-full px-2 py-1 text-xs font-medium
							{selectedClaim.priority === 'High'
								? 'bg-red-100 text-red-800'
								: selectedClaim.priority === 'Medium'
									? 'bg-yellow-100 text-yellow-800'
									: 'bg-gray-100 text-gray-800'}"
						>
							{selectedClaim.priority} Priority
						</span>
					</div>

					<!-- Comment Textarea -->
					<div class="space-y-2">
						<Label for="comment" class="text-sm font-medium text-gray-700">
							Reason for {sheetAction === 'approve'
								? 'approval'
								: sheetAction === 'reject'
									? 'rejection'
									: 'pending status'}:
						</Label>
						<textarea
							id="comment"
							bind:value={actionComment}
							placeholder="Please provide a detailed reason for this action..."
							class="min-h-[150px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						></textarea>
					</div>
				</div>
			{:else}
				<!-- Original Claim Details -->
				<!-- Claim Status -->
				<div class="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
					<div class="flex items-center gap-3">
						<img
							src={selectedClaim.personalInfo.avatar}
							alt={selectedClaim.personalInfo.fullName}
							class="h-12 w-12 rounded-full object-cover"
						/>
						<div>
							<h4 class="font-semibold text-gray-900">{selectedClaim.claimNumber}</h4>
							<p class="text-sm text-gray-600">{selectedClaim.personalInfo.fullName}</p>
							<p class="text-sm font-medium text-blue-600">{selectedClaim.claimAmount}</p>
						</div>
					</div>
					<span
						class="rounded-full px-3 py-1 text-sm font-medium
						{selectedClaim.priority === 'High'
							? 'bg-red-100 text-red-800'
							: selectedClaim.priority === 'Medium'
								? 'bg-yellow-100 text-yellow-800'
								: 'bg-gray-100 text-gray-800'}"
					>
						{selectedClaim.priority} Priority
					</span>
				</div>
			{/if}
		</div>

		<Sheet.Footer class="flex gap-2">
			<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Submit</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
