<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import FormStep from './FormStep.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { HmoFormState } from './hmo-form.svelte.js';
	import { Eye, EyeOff } from '@lucide/svelte';

	const formState = new HmoFormState();

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	const planTypesList = [
		{ id: 'hmo', label: 'HMO' },
		{ id: 'ppo', label: 'PPO' },
		{ id: 'epo', label: 'EPO' },
		{ id: 'pos', label: 'POS' },
		{ id: 'indemnity', label: 'Indemnity' },
		{ id: 'medicare', label: 'Medicare' },
		{ id: 'medicaid', label: 'Medicaid' }
	] as const;

	// File handling helpers
	let documentUpload = $state<HTMLInputElement | null>(null);
	let financialInput = $state<HTMLInputElement | null>(null);

	function handleFileChange(e: Event, type: 'license' | 'financial') {
		const files = (e.target as HTMLInputElement).files;
		if (!files) return;
		formState.addFiles(Array.from(files), type);
	}
</script>

<div class="flex w-full flex-col px-8 py-10 sm:px-12 md:w-3/5">
	<!-- Logo and Welcome -->
	<div class="mb-8 flex items-center gap-3">
		<h1 class="border-blue-300 p-2 text-xl font-bold">
			Heal<span class="text-blue-500">Pro.</span>
		</h1>
	</div>
	<h1 class="mb-1 flex items-center gap-2 text-3xl font-bold text-gray-900">
		Register Your HMO <span class="text-2xl">🏛️</span>
	</h1>
	<p class="mb-8 text-gray-500">Join our network of healthcare insurers</p>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			formState.handleSubmit();
		}}
	>
		<!-- Company Information -->
		<FormStep text="Company Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="companyName" class={formState.errors.companyName ? 'text-red-500' : ''}
					>Company Name</Label
				>
				<Input
					id="companyName"
					bind:value={formState.formData.companyName}
					placeholder="ex: BlueCross Insurance"
					class="mt-1"
					aria-invalid={!!formState.errors.companyName}
					oninput={() => (formState.errors.companyName = '')}
				/>
				{#if formState.errors.companyName}
					<p class="mt-1 text-sm text-red-500">{formState.errors.companyName}</p>
				{/if}
			</div>
			<div>
				<Label
					for="registrationNumber"
					class={formState.errors.registrationNumber ? 'text-red-500' : ''}
					>Registration Number</Label
				>
				<Input
					id="registrationNumber"
					bind:value={formState.formData.registrationNumber}
					placeholder="ex: INS12345678"
					class="mt-1"
					aria-invalid={!!formState.errors.registrationNumber}
					oninput={() => (formState.errors.registrationNumber = '')}
				/>
				{#if formState.errors.registrationNumber}
					<p class="mt-1 text-sm text-red-500">{formState.errors.registrationNumber}</p>
				{/if}
			</div>
			<div>
				<Label for="taxId" class={formState.errors.taxId ? 'text-red-500' : ''}>Tax ID / EIN</Label>
				<Input
					id="taxId"
					bind:value={formState.formData.taxId}
					placeholder="ex: 12-3456789"
					class="mt-1"
					aria-invalid={!!formState.errors.taxId}
					oninput={() => (formState.errors.taxId = '')}
				/>
				{#if formState.errors.taxId}
					<p class="mt-1 text-sm text-red-500">{formState.errors.taxId}</p>
				{/if}
			</div>
			<div>
				<Label for="yearEstablished" class={formState.errors.yearEstablished ? 'text-red-500' : ''}
					>Year Established</Label
				>
				<Input
					id="yearEstablished"
					bind:value={formState.formData.yearEstablished}
					placeholder="ex: 1985"
					class="mt-1"
					aria-invalid={!!formState.errors.yearEstablished}
					oninput={() => (formState.errors.yearEstablished = '')}
				/>
				{#if formState.errors.yearEstablished}
					<p class="mt-1 text-sm text-red-500">{formState.errors.yearEstablished}</p>
				{/if}
			</div>
			<div>
				<Label for="repPassword" class={formState.errors.password ? 'text-red-500' : ''}
					>Password</Label
				>
				<div class="relative">
					<Input
						id="repPassword"
						type={showPassword ? 'text' : 'password'}
						bind:value={formState.formData.representative.password}
						placeholder="Password"
						class="mt-1 pr-10"
						aria-invalid={!!formState.errors.password}
						oninput={() => (formState.errors.password = '')}
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						class="absolute right-0 top-0 mt-1 h-full px-3 py-2 hover:bg-transparent"
						onclick={() => (showPassword = !showPassword)}
					>
						{#if showPassword}
							<EyeOff class="h-4 w-4 text-gray-500" />
						{:else}
							<Eye class="h-4 w-4 text-gray-500" />
						{/if}
					</Button>
				</div>
				{#if formState.errors.password}
					<p class="mt-1 text-sm text-red-500">{formState.errors.password}</p>
				{/if}
			</div>
			<div>
				<Label
					for="repConfirmPassword"
					class={formState.errors.confirmPassword ? 'text-red-500' : ''}>Confirm Password</Label
				>
				<div class="relative">
					<Input
						id="repConfirmPassword"
						type={showConfirmPassword ? 'text' : 'password'}
						bind:value={formState.formData.representative.confirmPassword}
						placeholder="Confirm Password"
						class="mt-1 pr-10"
						aria-invalid={!!formState.errors.confirmPassword}
						oninput={() => (formState.errors.confirmPassword = '')}
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						class="absolute right-0 top-0 mt-1 h-full px-3 py-2 hover:bg-transparent"
						onclick={() => (showConfirmPassword = !showConfirmPassword)}
					>
						{#if showConfirmPassword}
							<EyeOff class="h-4 w-4 text-gray-500" />
						{:else}
							<Eye class="h-4 w-4 text-gray-500" />
						{/if}
					</Button>
				</div>
				{#if formState.errors.confirmPassword}
					<p class="mt-1 text-sm text-red-500">{formState.errors.confirmPassword}</p>
				{/if}
			</div>
		</div>

		<!-- Contact Information -->
		<FormStep text="Contact Information" />
		<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="md:col-span-2">
				<Label for="headquarters" class={formState.errors.headquarters ? 'text-red-500' : ''}
					>Headquarters Address</Label
				>
				<Input
					id="headquarters"
					bind:value={formState.formData.address.headquarters}
					placeholder="ex: 123 Insurance Plaza"
					class="mt-1"
					aria-invalid={!!formState.errors.headquarters}
					oninput={() => (formState.errors.headquarters = '')}
				/>
				{#if formState.errors.headquarters}
					<p class="mt-1 text-sm text-red-500">{formState.errors.headquarters}</p>
				{/if}
			</div>
			<div>
				<Label for="city" class={formState.errors.city ? 'text-red-500' : ''}>City</Label>
				<Input
					id="city"
					bind:value={formState.formData.address.city}
					placeholder="ex: New York"
					class="mt-1"
					aria-invalid={!!formState.errors.city}
					oninput={() => (formState.errors.city = '')}
				/>
				{#if formState.errors.city}
					<p class="mt-1 text-sm text-red-500">{formState.errors.city}</p>
				{/if}
			</div>
			<div>
				<Label for="state" class={formState.errors.state ? 'text-red-500' : ''}>State</Label>
				<Input
					id="state"
					bind:value={formState.formData.address.state}
					placeholder="ex: NY"
					class="mt-1"
					aria-invalid={!!formState.errors.state}
					oninput={() => (formState.errors.state = '')}
				/>
				{#if formState.errors.state}
					<p class="mt-1 text-sm text-red-500">{formState.errors.state}</p>
				{/if}
			</div>
			<div>
				<Label for="zipCode" class={formState.errors.zipCode ? 'text-red-500' : ''}>Zip Code</Label>
				<Input
					id="zipCode"
					bind:value={formState.formData.address.zipCode}
					placeholder="ex: 10001"
					class="mt-1"
					aria-invalid={!!formState.errors.zipCode}
					oninput={() => (formState.errors.zipCode = '')}
				/>
				{#if formState.errors.zipCode}
					<p class="mt-1 text-sm text-red-500">{formState.errors.zipCode}</p>
				{/if}
			</div>
			<div>
				<Label for="country" class={formState.errors.country ? 'text-red-500' : ''}>Country</Label>
				<Input
					id="country"
					bind:value={formState.formData.address.country}
					placeholder="ex: United States"
					class="mt-1"
					aria-invalid={!!formState.errors.country}
					oninput={() => (formState.errors.country = '')}
				/>
				{#if formState.errors.country}
					<p class="mt-1 text-sm text-red-500">{formState.errors.country}</p>
				{/if}
			</div>
		</div>
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="primaryPhone" class={formState.errors.primaryPhone ? 'text-red-500' : ''}
					>Primary Phone</Label
				>
				<Input
					id="primaryPhone"
					bind:value={formState.formData.contact.primaryPhone}
					placeholder="ex: (860) 555-1234"
					class="mt-1"
					aria-invalid={!!formState.errors.primaryPhone}
					oninput={() => (formState.errors.primaryPhone = '')}
				/>
				{#if formState.errors.primaryPhone}
					<p class="mt-1 text-sm text-red-500">{formState.errors.primaryPhone}</p>
				{/if}
			</div>
			<div>
				<Label for="customerService">Customer Service Line</Label>
				<Input
					id="customerService"
					bind:value={formState.formData.contact.customerService}
					placeholder="ex: (800) 555-5678"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="email" class={formState.errors.email ? 'text-red-500' : ''}>Email Address</Label
				>
				<Input
					id="email"
					bind:value={formState.formData.contact.email}
					placeholder="ex: info@bluecross.com"
					class="mt-1"
					aria-invalid={!!formState.errors.email}
					oninput={() => (formState.errors.email = '')}
				/>
				{#if formState.errors.email}
					<p class="mt-1 text-sm text-red-500">{formState.errors.email}</p>
				{/if}
			</div>
			<div>
				<Label for="website">Website</Label>
				<Input
					id="website"
					bind:value={formState.formData.contact.website}
					placeholder="ex: www.bluecross.com"
					class="mt-1"
				/>
			</div>
		</div>
		<!-- Representative Information -->
		<FormStep text="Representative Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="repName" class={formState.errors.repName ? 'text-red-500' : ''}
					>Representative Name</Label
				>
				<Input
					id="repName"
					bind:value={formState.formData.representative.name}
					placeholder="ex: John Johnson"
					class="mt-1"
					aria-invalid={!!formState.errors.repName}
					oninput={() => (formState.errors.repName = '')}
				/>
				{#if formState.errors.repName}
					<p class="mt-1 text-sm text-red-500">{formState.errors.repName}</p>
				{/if}
			</div>
			<div>
				<Label for="repPosition">Position/Title</Label>
				<Input
					id="repPosition"
					bind:value={formState.formData.representative.position}
					placeholder="ex: Director of Provider Relations"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="repPhone">Phone</Label>
				<Input
					id="repPhone"
					bind:value={formState.formData.representative.phone}
					placeholder="ex: (860) 555-9876"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="repEmail" class={formState.errors.repEmail ? 'text-red-500' : ''}>Email</Label>
				<Input
					id="repEmail"
					bind:value={formState.formData.representative.email}
					placeholder="ex: jjohnson@bluecross.com"
					class="mt-1"
					aria-invalid={!!formState.errors.repEmail}
					oninput={() => (formState.errors.repEmail = '')}
				/>
				{#if formState.errors.repEmail}
					<p class="mt-1 text-sm text-red-500">{formState.errors.repEmail}</p>
				{/if}
			</div>
		</div>

		<!-- Coverage Information -->
		<FormStep text="Coverage Information" />
		<div class="mb-6">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<Label for="states">States/Regions Covered</Label>
					<Input
						id="states"
						bind:value={formState.formData.coverage.states}
						placeholder="ex: CT, MA, NY, NJ"
						class="mt-1"
					/>
				</div>
				<div>
					<Label for="memberCount">Approximate Member Count</Label>
					<Input
						id="memberCount"
						bind:value={formState.formData.coverage.memberCount}
						placeholder="ex: 1,500,000"
						class="mt-1"
					/>
				</div>
				<div>
					<Label for="networkSize">Provider Network Size</Label>
					<Input
						id="networkSize"
						bind:value={formState.formData.coverage.networkSize}
						placeholder="ex: 25,000 providers"
						class="mt-1"
					/>
				</div>
			</div>

			<div class="mt-4">
				<Label class="mb-2 block">Plan Types Offered</Label>
				<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
					{#each planTypesList as plan}
						<div class="flex items-center space-x-2">
							<Checkbox
								id={plan.id}
								bind:checked={formState.formData.coverage.planTypes[plan.id]}
								class="border-gray-500"
							/>
							<Label for={plan.id} class="font-normal">{plan.label}</Label>
						</div>
					{/each}
				</div>
				{#if formState.errors.planTypes}
					<p class="mt-1 text-sm text-red-500">{formState.errors.planTypes}</p>
				{/if}
			</div>
		</div>

		<!-- Partnership Information -->
		<FormStep text="Network Partnerships" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="hospitals">Affiliated Hospitals</Label>
				<Input
					id="hospitals"
					bind:value={formState.formData.partnerships.hospitals}
					placeholder="ex: 150 hospitals"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="pharmacies">Pharmacy Network</Label>
				<Input
					id="pharmacies"
					bind:value={formState.formData.partnerships.pharmacies}
					placeholder="ex: 5,000 pharmacies"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="laboratories">Laboratory Partners</Label>
				<Input
					id="laboratories"
					bind:value={formState.formData.partnerships.laboratories}
					placeholder="ex: LabCorp, Quest Diagnostics"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="specialists">Specialist Network</Label>
				<Input
					id="specialists"
					bind:value={formState.formData.partnerships.specialists}
					placeholder="ex: 10,000 specialists"
					class="mt-1"
				/>
			</div>
		</div>

		<!-- Documentation Upload -->

		<div class="mb-6 space-y-4">
			<div>
				<Label for="documentUpload" class="mb-4 block"
					>Company Logo and Relevant Documentations</Label
				>
				<div
					role="button"
					tabindex="0"
					class="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 text-center text-gray-400 transition hover:border-blue-500"
					onclick={() => documentUpload?.click()}
					onkeydown={(e) => e.key === 'Enter' && documentUpload?.click()}
				>
					<input
						bind:this={documentUpload}
						type="file"
						class="hidden"
						accept=".pdf,.jpg,.png"
						multiple
						onchange={(e) => handleFileChange(e, 'license')}
					/>
					<span class="mb-2 block"
						>Click to upload <span class="text-blue-600">or drag and drop</span></span
					>
					<span class="text-xs">PDF, JPG or PNG (max. 10MB)</span>
				</div>
				{#if formState.formData.licenseFiles.length}
					<ul class="mt-2 space-y-1">
						{#each formState.formData.licenseFiles as f, i}
							<li class="flex items-center justify-between rounded-sm bg-gray-50 px-3 py-2 text-sm">
								<span class="truncate">{f.name}</span>
								<button
									type="button"
									class="text-xs text-red-600"
									onclick={() => formState.removeFile(i, 'license')}>Remove</button
								>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="space-y-3">
			<div class="flex items-center gap-3">
				<Checkbox
					id="terms"
					bind:checked={formState.formData.consents.terms}
					class="mt-0.5 h-4 w-4 border-gray-500"
					aria-describedby={formState.errors.terms ? 'terms-error' : undefined}
				/>

				<div class="flex-1">
					<Label for="terms" class="text-sm font-normal leading-tight">
						By signing up you agree to our
						<a href="/terms" class="text-blue-600">Terms and conditions</a>
						and
						<a href="/privacy" class="text-blue-600">Privacy policy</a>.
					</Label>

					{#if formState.errors.terms}
						<p id="terms-error" class="mt-1 text-sm text-red-500">{formState.errors.terms}</p>
					{/if}
				</div>
			</div>

			<Button
				type="submit"
				class="text-md h-auto min-h-0 w-full rounded-full !py-3 px-6 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60"
				disabled={!formState.formData.consents.terms || formState.isLoading}
				aria-disabled={!formState.formData.consents.terms || formState.isLoading}
			>
				{#if formState.isLoading}
					<Spinner class="mr-2" />
					Processing...
				{:else}
					Register HMO
				{/if}
			</Button>
		</div>
	</form>
</div>
