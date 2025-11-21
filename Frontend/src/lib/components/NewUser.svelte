<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { goto } from '$app/navigation';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { register, createPatient, uploadPatientId } from '$lib/api';
	import { toast } from 'svelte-sonner';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import FormStep from './FormStep.svelte';

	// Form data using Svelte 5 runes
	let formData = $state({
		fullname: '',
		phone: '',
		email: '',
		password: '',
		dob: '',
		gender: '',
		occupation: '',
		address: '',
		emergencyName: '',
		emergencyPhone: '',
		physician: '',
		insurance: '',
		policy: '',
		allergies: '',
		medications: '',
		familyHistory: '',
		pastHistory: '',
		idType: 'National ID',
		idNumber: '',
		idFiles: [] as File[],
		consents: {
			treatment: true,
			disclosure: false,
			privacy: false
		}
	});

	let errors = $state<Record<string, string>>({});

	// Format date like: "Sunday, December 03, 2023 at 9:00 AM"
	function formatDate(date: Date): string {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: '2-digit',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		};
		return date.toLocaleString('en-US', options).replace(',', '').replace(',', ' at');
	}

	// Custom toast with icon and date
	function showSuccessToast(message: string) {
		const now = new Date();
		toast.success(message, {
			description: formatDate(now),
			style: 'background-color: #1f2937; color: white; border: none; padding: 16px;',
			duration: 5000
		});
	}

	function showErrorToast(message: string) {
		const now = new Date();
		toast.error(message, {
			description: formatDate(now),
			style: 'background-color: #1f2937; color: white; border: none; padding: 16px;',
			duration: 5000
		});
	}

	function validate() {
		const newErrors: Record<string, string> = {};

		// Define required fields with their error messages
		const requiredFields = [
			// Personal Information
			{ key: 'fullname', message: 'Full name is required' },
			{ key: 'phone', message: 'Phone number is required' },
			{ key: 'password', message: 'Password is required' },
			{ key: 'dob', message: 'Date of birth is required' },
			{ key: 'gender', message: 'Gender is required' },
			{ key: 'occupation', message: 'Occupation is required' },
			{ key: 'address', message: 'Address is required' },
			{ key: 'emergencyName', message: 'Emergency contact name is required' },
			{ key: 'emergencyPhone', message: 'Emergency phone number is required' },
			// Medical Information
			{ key: 'physician', message: 'Primary care physician is required' },
			{ key: 'insurance', message: 'Insurance provider is required' },
			{ key: 'policy', message: 'Insurance policy number is required' },
			{ key: 'allergies', message: 'Allergies information is required' },
			{ key: 'medications', message: 'Current medications information is required' },
			{ key: 'familyHistory', message: 'Family medical history is required' },
			{ key: 'pastHistory', message: 'Past medical history is required' },
			// Identification
			{ key: 'idType', message: 'Identification type is required' },
			{ key: 'idNumber', message: 'Identification number is required' }
		];

		// Validate all required fields
		requiredFields.forEach(({ key, message }) => {
			if (!formData[key as keyof typeof formData]) {
				newErrors[key] = message;
			}
		});

		// Email validation (special case for format check)
		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			newErrors.email = 'Invalid email address';
		}

		// Privacy consent validation
		if (!formData.consents.privacy) {
			newErrors.privacy = 'You must agree to the privacy policy';
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	let isLoading = $state(false);

	async function handleSubmit() {
		if (!validate()) {
			showErrorToast('Please fix the errors in the form');
			return;
		}
		isLoading = true;

		try {
			// 1. Create User Account
			await register(formData.email, formData.password, formData.fullname);

			// 2. Create Patient Profile
			const patientPayload = {
				fullName: formData.fullname,
				email: formData.email,
				phoneNumber: formData.phone,
				dateOfBirth: formData.dob ? new Date(formData.dob).toISOString() : undefined,
				gender:
					formData.gender === 'male' ? 'Male' : formData.gender === 'female' ? 'Female' : 'Other',
				occupation: formData.occupation,
				address: formData.address,
				emergencyContactName: formData.emergencyName,
				emergencyPhone: formData.emergencyPhone,
				primaryCarePhysician: formData.physician,
				insuranceProvider: formData.insurance,
				insurancePolicyNumber: formData.policy,
				allergies: formData.allergies,
				currentMedications: formData.medications,
				familyMedicalHistory: formData.familyHistory,
				pastMedicalHistory: formData.pastHistory,
				identificationType: formData.idType,
				identificationNumber: formData.idNumber,
				consentReceiveTreatment: formData.consents.treatment,
				consentUseDisclosure: formData.consents.disclosure,
				consentPrivacyPolicy: formData.consents.privacy
			};

			const patientRes = (await createPatient(patientPayload)) as any;
			const patientId = patientRes.id || patientRes.data?.id;

			// 3. Upload ID Documents (if any)
			if (formData.idFiles.length > 0 && patientId) {
				await uploadPatientId(patientId.toString(), formData.idFiles[0]);
			}

			showSuccessToast('Registration successful');
			setTimeout(() => goto('/login'), 1000);
		} catch (error: any) {
			console.error('Registration failed:', error);
			showErrorToast('Error Occurred');
		} finally {
			isLoading = false;
		}
	}
	// small Svelte 5 additions for file upload
	let fileInput = $state<HTMLInputElement | null>(null);

	const allowed = /\.(pdf|docx|png|jpe?g)$/i;

	function openFilePicker() {
		fileInput?.click();
	}

	function handleFileChange(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		if (!files) return;
		addFiles(Array.from(files));
		(fileInput as HTMLInputElement).value = '';
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		addFiles(Array.from(e.dataTransfer?.files ?? []));
	}

	function addFiles(files: File[]) {
		const accepted = files.filter(
			(f) =>
				allowed.test(f.name) ||
				[
					'application/pdf',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					'image/png',
					'image/jpeg'
				].includes(f.type)
		);
		if (accepted.length) formData.idFiles = [...formData.idFiles, ...accepted];
	}

	function removeFile(i: number) {
		formData.idFiles = formData.idFiles.filter((_: File, idx: number) => idx !== i);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openFilePicker();
		}
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
		Welcome <span class="text-2xl">👋</span>
	</h1>
	<p class="mb-8 text-gray-500">Let us know more about you</p>

	<form
		onsubmit={(e: SubmitEvent) => {
			e.preventDefault();
			handleSubmit();
		}}
	>
		<!-- Personal Information -->
		<FormStep text="Personal Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="fullname" class={errors.fullname ? 'text-red-500' : ''}>Full name *</Label>
				<Input
					id="fullname"
					bind:value={formData.fullname}
					placeholder="John Doe"
					class="mt-1"
					aria-invalid={!!errors.fullname}
					oninput={() => (errors.fullname = '')}
				/>
				{#if errors.fullname}
					<p class="mt-1 text-sm text-red-500">{errors.fullname}</p>
				{/if}
			</div>
			<div>
				<Label for="phone" class={errors.phone ? 'text-red-500' : ''}>Phone number *</Label>
				<Input
					id="phone"
					bind:value={formData.phone}
					placeholder="080xxxxxxxx"
					class="mt-1"
					aria-invalid={!!errors.phone}
					oninput={() => (errors.phone = '')}
				/>
				{#if errors.phone}
					<p class="mt-1 text-sm text-red-500">{errors.phone}</p>
				{/if}
			</div>
			<div>
				<Label for="email" class={errors.email ? 'text-red-500' : ''}>Email address *</Label>
				<Input
					id="email"
					bind:value={formData.email}
					placeholder="johndoe@email.com"
					class="mt-1"
					aria-invalid={!!errors.email}
					oninput={() => (errors.email = '')}
				/>
				{#if errors.email}
					<p class="mt-1 text-sm text-red-500">{errors.email}</p>
				{/if}
			</div>
			<div>
				<Label for="password" class={errors.password ? 'text-red-500' : ''}>Password *</Label>
				<Input
					id="password"
					type="password"
					bind:value={formData.password}
					placeholder="Password"
					class="mt-1"
					aria-invalid={!!errors.password}
					oninput={() => (errors.password = '')}
				/>
				{#if errors.password}
					<p class="mt-1 text-sm text-red-500">{errors.password}</p>
				{/if}
			</div>
			<div>
				<Label for="dob">Date of birth</Label>
				<Input id="dob" bind:value={formData.dob} type="date" class="mt-1" />
			</div>
			<div>
				<Label for="gender">Gender</Label>
				<RadioGroup.Root bind:value={formData.gender} class="mt-1 flex gap-4">
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="male" id="male" class="mt-0.5 h-4 w-4 border-gray-500" />
						<Label for="male" class="font-normal">Male</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="female" id="female" class="mt-0.5 h-4 w-4 border-gray-500" />
						<Label for="female" class="font-normal">Female</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="other" id="other" class="mt-0.5 h-4 w-4 border-gray-500" />
						<Label for="other" class="font-normal">Other</Label>
					</div>
				</RadioGroup.Root>
			</div>
			<div>
				<Label for="occupation">Occupation</Label>
				<Input
					id="occupation"
					bind:value={formData.occupation}
					placeholder="Software Engineer"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="address">Address</Label>
				<Input
					id="address"
					bind:value={formData.address}
					placeholder="ex: 14 street, New York, NY - 5101"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="emergencyName">Emergency contact name</Label>
				<Input
					id="emergencyName"
					bind:value={formData.emergencyName}
					placeholder="Guardian's name"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="emergencyPhone">Emergency Phone number</Label>
				<Input
					id="emergencyPhone"
					bind:value={formData.emergencyPhone}
					placeholder="ex: +1 (868) 579-9831"
					class="mt-1"
				/>
			</div>
		</div>

		<!-- Medical Information -->

		<FormStep text="Medical Information" />
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="physician">Primary care physician</Label>
				<Input
					id="physician"
					bind:value={formData.physician}
					placeholder="Dr. Adam Smith"
					class="mt-1"
				/>
			</div>

			<div>
				<Label for="insurance">Insurance provider</Label>
				<Input
					id="insurance"
					bind:value={formData.insurance}
					placeholder="ex: BlueCross"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="policy">Insurance policy number</Label>
				<Input id="policy" bind:value={formData.policy} placeholder="ex: ABC1234567" class="mt-1" />
			</div>
			<div>
				<Label for="allergies">Allergies (if any)</Label>
				<Input
					id="allergies"
					bind:value={formData.allergies}
					placeholder="ex: Peanuts, Penicillin, Pollen"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="medications">Current medications</Label>
				<Input
					id="medications"
					bind:value={formData.medications}
					placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="familyHistory">Family medical history (if relevant)</Label>
				<Input
					id="familyHistory"
					bind:value={formData.familyHistory}
					placeholder="ex: Mother had breast cancer"
					class="mt-1"
				/>
			</div>
			<div>
				<Label for="pastHistory">Past medical history</Label>
				<Input
					id="pastHistory"
					bind:value={formData.pastHistory}
					placeholder="ex: Asthma diagnosis in childhood"
					class="mt-1"
				/>
			</div>
		</div>

		<!-- Identification and Verification -->
		<FormStep text="Identification and Verification" />

		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<Label for="idType">Identification type</Label>
				<select
					id="idType"
					bind:value={formData.idType}
					class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
				>
					<option>Birth Certificate</option>
					<option>National ID</option>
					<option>Passport</option>
				</select>
			</div>
			<div>
				<Label for="idNumber">Identification Number</Label>
				<Input
					id="idNumber"
					bind:value={formData.idNumber}
					placeholder="ex: 1234567"
					class="mt-1"
				/>
			</div>
			<div class="md:col-span-2">
				<Label for="idUpload">Scanned Copy of Identification Document</Label>

				<input
					id="idUpload"
					bind:this={fileInput}
					type="file"
					class="hidden"
					accept=".pdf,.docx,.png,.jpg,.jpeg"
					multiple
					onchange={handleFileChange}
				/>

				<div
					role="button"
					tabindex="0"
					class="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 text-center text-gray-400 transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					onclick={openFilePicker}
					onkeydown={handleKeyDown}
					ondragover={(e: DragEvent) => e.preventDefault()}
					ondrop={(e: DragEvent) => {
						e.preventDefault();
						handleDrop(e);
					}}
				>
					<span class="mb-2 block"
						>Click to upload <span class="text-blue-600">or drag and drop</span></span
					>
					<span class="text-xs">PDF, DOCX, PNG or JPG (multiple files allowed)</span>
				</div>

				{#if formData.idFiles?.length}
					<ul class="mt-2 space-y-1">
						{#each formData.idFiles as f, i}
							<li class="flex items-center justify-between rounded-sm bg-gray-50 px-3 py-2 text-sm">
								<span class="truncate">{f.name} — {(f.size / 1024).toFixed(1)} KB</span>
								<div class="flex items-center gap-2">
									{#if f.type.startsWith('image/')}
										<button
											type="button"
											class="text-xs text-blue-600"
											onclick={() => window.open(URL.createObjectURL(f), '_blank')}
										>
											Preview
										</button>
									{/if}
									<button type="button" class="text-xs text-red-600" onclick={() => removeFile(i)}>
										Remove
									</button>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="space-y-3">
			<div class="flex items-center gap-3">
				<!-- small mt adjust if label wraps: mt-0.5 helps visual centering -->
				<Checkbox
					id="terms"
					bind:checked={formData.consents.privacy}
					class="mt-0.5 h-4 w-4 border-gray-500"
					aria-describedby={errors.privacy ? 'privacy-error' : undefined}
				/>

				<div class="flex-1">
					<Label for="terms" class="text-sm font-normal leading-tight">
						By signing up you agree to our
						<a href="/terms" class="text-blue-600">Terms and conditions</a>
						and
						<a href="/privacy" class="text-blue-600">Privacy policy</a>.
					</Label>

					{#if errors.privacy}
						<p id="privacy-error" class="mt-1 text-sm text-red-500">{errors.privacy}</p>
					{/if}
				</div>
			</div>

			<Button
				type="submit"
				class="text-md h-auto min-h-0 w-full rounded-full !py-3 px-6 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60"
				disabled={!formData.consents.privacy || isLoading}
				aria-disabled={!formData.consents.privacy || isLoading}
			>
				{#if isLoading}
					<Spinner class="mr-2" />
					Processing...
				{:else}
					Submit
				{/if}
			</Button>
		</div>
	</form>
</div>
