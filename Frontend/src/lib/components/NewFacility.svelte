<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import FormStep from './FormStep.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { FacilityFormState } from './facility-form.svelte.js';

	const formState = new FacilityFormState();

	const servicesList = [
		{ id: 'emergency', label: 'Emergency Care' },
		{ id: 'inpatient', label: 'Inpatient Care' },
		{ id: 'outpatient', label: 'Outpatient Care' },
		{ id: 'surgery', label: 'Surgery' },
		{ id: 'laboratory', label: 'Laboratory' },
		{ id: 'radiology', label: 'Radiology' },
		{ id: 'pharmacy', label: 'Pharmacy' },
		{ id: 'specialtyCare', label: 'Specialty Care' }
	] as const;

	// File handling helpers
	let licenseInput = $state<HTMLInputElement | null>(null);
	let accreditationInput = $state<HTMLInputElement | null>(null);

	function handleFileChange(e: Event, type: 'license' | 'accreditation') {
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
		Register Your Facility <span class="text-2xl">🏥</span>
	</h1>
	<p class="mb-8 text-gray-500">Join our network of healthcare providers</p>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			formState.handleSubmit();
		}}
	>
		<!-- Facility Information -->
		<FormStep text="Facility Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="facilityName" class={formState.errors.facilityName ? 'text-red-500' : ''}
					>Facility Name</Label
				>
				<Input
					id="facilityName"
					bind:value={formState.formData.facilityName}
					placeholder="ex: Memorial Hospital"
					class="mt-1"
					aria-invalid={!!formState.errors.facilityName}
					oninput={() => (formState.errors.facilityName = '')}
				/>
				{#if formState.errors.facilityName}
					<p class="mt-1 text-sm text-red-500">{formState.errors.facilityName}</p>
				{/if}
			</div>
			<div>
				<Label for="facilityType" class={formState.errors.facilityType ? 'text-red-500' : ''}
					>Facility Type</Label
				>
				<select
					id="facilityType"
					bind:value={formState.formData.facilityType}
					class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
					onchange={() => (formState.errors.facilityType = '')}
				>
					<option>Hospital</option>
					<option>Clinic</option>
					<option>Urgent Care</option>
					<option>Specialty Center</option>
					<option>Rehabilitation Center</option>
					<option>Other</option>
				</select>
				{#if formState.errors.facilityType}
					<p class="mt-1 text-sm text-red-500">{formState.errors.facilityType}</p>
				{/if}
			</div>
			<div>
				<Label for="licenseNumber" class={formState.errors.licenseNumber ? 'text-red-500' : ''}
					>License Number</Label
				>
				<Input
					id="licenseNumber"
					bind:value={formState.formData.licenseNumber}
					placeholder="ex: HC12345678"
					class="mt-1"
					aria-invalid={!!formState.errors.licenseNumber}
					oninput={() => (formState.errors.licenseNumber = '')}
				/>
				{#if formState.errors.licenseNumber}
					<p class="mt-1 text-sm text-red-500">{formState.errors.licenseNumber}</p>
				{/if}
			</div>
			<div>
				<Label for="taxId">Tax ID / EIN</Label>
				<Input
					id="taxId"
					bind:value={formState.formData.taxId}
					placeholder="ex: 12-3456789"
					class="mt-1"
				/>
			</div>
		</div>

		<FormStep text="Contact Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="md:col-span-2">
				<Label for="street" class={formState.errors.street ? 'text-red-500' : ''}
					>Street Address</Label
				>
				<Input
					id="street"
					bind:value={formState.formData.address.street}
					placeholder="ex: 123 Medical Center Drive"
					class="mt-1"
					aria-invalid={!!formState.errors.street}
					oninput={() => (formState.errors.street = '')}
				/>
				{#if formState.errors.street}
					<p class="mt-1 text-sm text-red-500">{formState.errors.street}</p>
				{/if}
			</div>
			<div>
				<Label for="city" class={formState.errors.city ? 'text-red-500' : ''}>City</Label>
				<Input
					id="city"
					bind:value={formState.formData.address.city}
					placeholder="ex: Chicago"
					class="mt-1"
					aria-invalid={!!formState.errors.city}
					oninput={() => (formState.errors.city = '')}
				/>
				{#if formState.errors.city}
					<p class="mt-1 text-sm text-red-500">{formState.errors.city}</p>
				{/if}
			</div>
			<div>
				<Label for="state" class={formState.errors.state ? 'text-red-500' : ''}
					>State/Province</Label
				>
				<Input
					id="state"
					bind:value={formState.formData.address.state}
					placeholder="ex: Illinois"
					class="mt-1"
					aria-invalid={!!formState.errors.state}
					oninput={() => (formState.errors.state = '')}
				/>
				{#if formState.errors.state}
					<p class="mt-1 text-sm text-red-500">{formState.errors.state}</p>
				{/if}
			</div>
			<div>
				<Label for="zipCode" class={formState.errors.zipCode ? 'text-red-500' : ''}
					>Zip/Postal Code</Label
				>
				<Input
					id="zipCode"
					bind:value={formState.formData.address.zipCode}
					placeholder="ex: 60601"
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

			<div>
				<Label for="primaryPhone" class={formState.errors.primaryPhone ? 'text-red-500' : ''}
					>Primary Phone</Label
				>
				<Input
					id="primaryPhone"
					bind:value={formState.formData.contact.primaryPhone}
					placeholder="ex: (312) 555-1234"
					class="mt-1"
					aria-invalid={!!formState.errors.primaryPhone}
					oninput={() => (formState.errors.primaryPhone = '')}
				/>
				{#if formState.errors.primaryPhone}
					<p class="mt-1 text-sm text-red-500">{formState.errors.primaryPhone}</p>
				{/if}
			</div>
			<div>
				<Label for="alternatePhone">Alternate Phone</Label>
				<Input
					id="alternatePhone"
					bind:value={formState.formData.contact.alternatePhone}
					placeholder="ex: (312) 555-5678"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="email" class={formState.errors.email ? 'text-red-500' : ''}>Email Address</Label
				>
				<Input
					id="email"
					bind:value={formState.formData.contact.email}
					placeholder="ex: info@memorialhospital.org"
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
					placeholder="ex: www.memorialhospital.org"
					class="mt-1"
				/>
			</div>
		</div>

		<FormStep text="Representative Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="repName" class={formState.errors.repName ? 'text-red-500' : ''}
					>Representative Name</Label
				>
				<Input
					id="repName"
					bind:value={formState.formData.representative.name}
					placeholder="ex: Dr. Jane Smith"
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
					placeholder="ex: Chief Medical Officer"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="repPhone">Phone</Label>
				<Input
					id="repPhone"
					bind:value={formState.formData.representative.phone}
					placeholder="ex: (312) 555-9876"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="repEmail" class={formState.errors.repEmail ? 'text-red-500' : ''}>Email</Label>
				<Input
					id="repEmail"
					bind:value={formState.formData.representative.email}
					placeholder="ex: jsmith@memorialhospital.org"
					class="mt-1"
					aria-invalid={!!formState.errors.repEmail}
					oninput={() => (formState.errors.repEmail = '')}
				/>
				{#if formState.errors.repEmail}
					<p class="mt-1 text-sm text-red-500">{formState.errors.repEmail}</p>
				{/if}
			</div>
			<div>
				<Label for="repPassword" class={formState.errors.password ? 'text-red-500' : ''}
					>Password</Label
				>
				<Input
					id="repPassword"
					type="password"
					bind:value={formState.formData.representative.password}
					placeholder="Password"
					class="mt-1"
					aria-invalid={!!formState.errors.password}
					oninput={() => (formState.errors.password = '')}
				/>
				{#if formState.errors.password}
					<p class="mt-1 text-sm text-red-500">{formState.errors.password}</p>
				{/if}
			</div>
			<div>
				<Label
					for="repConfirmPassword"
					class={formState.errors.confirmPassword ? 'text-red-500' : ''}>Confirm Password</Label
				>
				<Input
					id="repConfirmPassword"
					type="password"
					bind:value={formState.formData.representative.confirmPassword}
					placeholder="Confirm Password"
					class="mt-1"
					aria-invalid={!!formState.errors.confirmPassword}
					oninput={() => (formState.errors.confirmPassword = '')}
				/>
				{#if formState.errors.confirmPassword}
					<p class="mt-1 text-sm text-red-500">{formState.errors.confirmPassword}</p>
				{/if}
			</div>
		</div>

		<!-- Services and Capacity -->
		<FormStep text="Services and Capacity" />
		<div class="mb-6">
			<Label class="mb-2 block">Services Offered</Label>
			<div class="mb-8 grid grid-cols-2 gap-4">
				{#each servicesList as service}
					<div class="flex items-center space-x-2">
						<Checkbox
							id={service.id}
							bind:checked={formState.formData.services[service.id]}
							class="border-gray-500"
						/>
						<Label for={service.id} class="font-normal">{service.label}</Label>
					</div>
				{/each}
			</div>

			<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<Label for="specialties">Specialties/Departments</Label>
					<Input
						id="specialties"
						bind:value={formState.formData.specialties}
						placeholder="ex: Cardiology, Oncology, Pediatrics"
						class="mt-1"
					/>
				</div>
				<div>
					<Label for="bedCount">Number of Beds</Label>
					<Input
						id="bedCount"
						bind:value={formState.formData.bedCount}
						placeholder="ex: 250"
						class="mt-1"
					/>
				</div>
				<div>
					<Label for="staffCount">Number of Staff</Label>
					<Input
						id="staffCount"
						bind:value={formState.formData.staffCount}
						placeholder="ex: 1200"
						class="mt-1"
					/>
				</div>
				<div>
					<Label for="acceptedInsurance">Accepted Insurance</Label>
					<Input
						id="acceptedInsurance"
						bind:value={formState.formData.acceptedInsurance}
						placeholder="ex: BlueCross, Aetna, Medicare"
						class="mt-1"
					/>
				</div>
				<div class="md:col-span-2">
					<Label for="certifications">Certifications/Accreditations</Label>
					<Input
						id="certifications"
						bind:value={formState.formData.certifications}
						placeholder="ex: Joint Commission, NCQA"
						class="mt-1"
					/>
				</div>
			</div>
		</div>

		<!-- Documentation Upload -->
		<FormStep text="Documentation" />
		<div class="mb-6 space-y-4">
			<div>
				<Label for="licenseUpload">Facility License</Label>
				<div
					role="button"
					tabindex="0"
					class="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 text-center text-gray-400 transition hover:border-blue-500"
					onclick={() => licenseInput?.click()}
					onkeydown={(e) => e.key === 'Enter' && licenseInput?.click()}
				>
					<input
						bind:this={licenseInput}
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
			<div>
				<Label for="accreditationUpload">Accreditation Certificates</Label>
				<div
					role="button"
					tabindex="0"
					class="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 text-center text-gray-400 transition hover:border-blue-500"
					onclick={() => accreditationInput?.click()}
					onkeydown={(e) => e.key === 'Enter' && accreditationInput?.click()}
				>
					<input
						bind:this={accreditationInput}
						type="file"
						class="hidden"
						accept=".pdf,.jpg,.png"
						multiple
						onchange={(e) => handleFileChange(e, 'accreditation')}
					/>
					<span class="mb-2 block"
						>Click to upload <span class="text-blue-600">or drag and drop</span></span
					>
					<span class="text-xs">PDF, JPG or PNG (max. 10MB)</span>
				</div>
				{#if formState.formData.accreditationFiles.length}
					<ul class="mt-2 space-y-1">
						{#each formState.formData.accreditationFiles as f, i}
							<li class="flex items-center justify-between rounded-sm bg-gray-50 px-3 py-2 text-sm">
								<span class="truncate">{f.name}</span>
								<button
									type="button"
									class="text-xs text-red-600"
									onclick={() => formState.removeFile(i, 'accreditation')}>Remove</button
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
					bind:checked={formState.formData.consents.privacy}
					class="mt-0.5 h-4 w-4 border-gray-500"
					aria-describedby={formState.errors.privacy ? 'privacy-error' : undefined}
				/>

				<div class="flex-1">
					<Label for="terms" class="text-sm font-normal leading-tight">
						By signing up you agree to our
						<a href="/terms" class="text-blue-600">Terms and conditions</a>
						and
						<a href="/privacy" class="text-blue-600">Privacy policy</a>.
					</Label>

					{#if formState.errors.privacy}
						<p id="privacy-error" class="mt-1 text-sm text-red-500">{formState.errors.privacy}</p>
					{/if}
				</div>
			</div>

			<Button
				type="submit"
				class="text-md h-auto min-h-0 w-full rounded-full !py-3 px-6 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60"
				disabled={!formState.formData.consents.privacy || formState.isLoading}
				aria-disabled={!formState.formData.consents.privacy || formState.isLoading}
			>
				{#if formState.isLoading}
					<Spinner class="mr-2" />
					Processing...
				{:else}
					Submit
				{/if}
			</Button>
		</div>
	</form>
</div>
