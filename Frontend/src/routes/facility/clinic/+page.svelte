<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Calendar, FileText, Save, Upload } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	// Clinical Encounter Form State using Svelte 5 runes
	let encounterDate = $state('');
	let encounterTime = $state('');
	let appointmentType = $state('');
	let chiefComplaint = $state('');
	let historyPresentIllness = $state('');
	let pastMedicalHistory = $state('');
	let medications = $state('');
	let allergies = $state('');

	// Vital Signs
	let bloodPressure = $state('');
	let heartRate = $state('');
	let temperature = $state('');
	let respiratoryRate = $state('');
	let oxygenSaturation = $state('');
	let weight = $state('');
	let height = $state('');

	// Physical Examination
	let generalAppearance = $state('');
	let cardiovascularExam = $state('');
	let respiratoryExam = $state('');
	let abdominalExam = $state('');
	let neurologicalExam = $state('');
	let musculoskeletalExam = $state('');

	// Clinical Assessment
	let primaryDiagnosis = $state('');
	let secondaryDiagnoses = $state(['']);
	let icdCodes = $state(['']);
	let severity = $state('');
	let urgency = $state('');

	// Treatment Plan
	let treatmentPlan = $state('');
	let prescribedMedications = $state(['']);
	let proceduresPerformed = $state(['']);
	let labTestsOrdered = $state(['']);

	// Clinical Notes & Follow-up
	let clinicalNotes = $state('');
	let followUpInstructions = $state('');
	let followUpDate = $state('');
	let referrals = $state('');

	// Attachments
	let attachments = $state<File[]>([]);

	function addSecondaryDiagnosis() {
		secondaryDiagnoses = [...secondaryDiagnoses, ''];
	}

	function addIcdCode() {
		icdCodes = [...icdCodes, ''];
	}

	function addMedication() {
		prescribedMedications = [...prescribedMedications, ''];
	}

	function addProcedure() {
		proceduresPerformed = [...proceduresPerformed, ''];
	}

	function addLabTest() {
		labTestsOrdered = [...labTestsOrdered, ''];
	}

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			attachments = [...attachments, ...Array.from(target.files)];
		}
	}

	function removeAttachment(index: number) {
		attachments = attachments.filter((_, i) => i !== index);
	}
</script>

<div class="min-h-screen p-8">
	<div class="mx-auto max-w-6xl">
		<!-- Single Card with Two Sections -->
		<div class="overflow-hidden rounded-2xl border bg-white shadow-xl">
			<div class="flex flex-col lg:flex-row">
				<!-- Left Section - Medical Info (30%) -->
				<div class="bg-blue-500 bg-gradient-to-br p-6 text-white lg:w-[30%]">
					<h1 class="mb-6 text-3xl font-bold">Clinical Encounter Form</h1>

					<p class="mb-8 leading-relaxed text-blue-100">
						Complete this comprehensive clinical documentation form for patient encounters. This
						form captures all essential medical information required for insurance claims and
						medical records.
					</p>

					<div class="mb-8 space-y-4">
						<div class="flex items-start gap-3">
							<div
								class="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
							>
								<div class="h-2 w-2 rounded-full bg-white"></div>
							</div>
							<span class="text-blue-100">Patient History & Chief Complaint</span>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
							>
								<div class="h-2 w-2 rounded-full bg-white"></div>
							</div>
							<span class="text-blue-100">Vital Signs & Physical Examination</span>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
							>
								<div class="h-2 w-2 rounded-full bg-white"></div>
							</div>
							<span class="text-blue-100">Clinical Assessment & Diagnosis</span>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
							>
								<div class="h-2 w-2 rounded-full bg-white"></div>
							</div>
							<span class="text-blue-100">Treatment Plan & Medications</span>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
							>
								<div class="h-2 w-2 rounded-full bg-white"></div>
							</div>
							<span class="text-blue-100">Clinical Notes & Follow-up</span>
						</div>
					</div>

					<p class="text-sm leading-relaxed text-blue-100">
						All fields marked with * are required for insurance processing. Ensure accurate
						documentation for proper claim submission and patient care continuity.
					</p>
				</div>

				<!-- Right Section - Form (70%) -->
				<div class="p-8 lg:w-[70%]">
					<h2 class="mb-6 text-2xl font-semibold text-gray-800">
						Clinical Encounter Documentation
					</h2>

					<!-- Encounter Details -->
					<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
						<div>
							<Label for="encounter-date" class="mb-2 block text-sm font-medium text-gray-700"
								>Encounter Date *</Label
							>
							<Input id="encounter-date" type="date" bind:value={encounterDate} class="w-full" />
						</div>
						<div>
							<Label for="encounter-time" class="mb-2 block text-sm font-medium text-gray-700"
								>Encounter Time *</Label
							>
							<Input id="encounter-time" type="time" bind:value={encounterTime} class="w-full" />
						</div>
						<div>
							<Label for="appointment-type" class="mb-2 block text-sm font-medium text-gray-700"
								>Appointment Type *</Label
							>
							<Select.Root bind:value={appointmentType}>
								<Select.Trigger class="w-full">
									{appointmentType || 'Select type'}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="consultation">Consultation</Select.Item>
									<Select.Item value="follow-up">Follow-up</Select.Item>
									<Select.Item value="emergency">Emergency</Select.Item>
									<Select.Item value="routine-checkup">Routine Checkup</Select.Item>
									<Select.Item value="specialist-referral">Specialist Referral</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
					</div>

					<!-- Patient History -->
					<div class="mb-6">
						<h3 class="mb-4 text-lg font-semibold text-gray-800">Patient History & Symptoms</h3>
						<div class="space-y-4">
							<div>
								<Label for="chief-complaint" class="mb-2 block text-sm font-medium text-gray-700"
									>Chief Complaint *</Label
								>
								<Textarea
									id="chief-complaint"
									bind:value={chiefComplaint}
									placeholder="Patient's primary reason for visit..."
									rows={3}
									class="w-full"
								/>
							</div>
							<div>
								<Label
									for="history-present-illness"
									class="mb-2 block text-sm font-medium text-gray-700"
									>History of Present Illness *</Label
								>
								<Textarea
									id="history-present-illness"
									bind:value={historyPresentIllness}
									placeholder="Detailed description of current symptoms..."
									rows={4}
									class="w-full"
								/>
							</div>
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label
										for="past-medical-history"
										class="mb-2 block text-sm font-medium text-gray-700">Past Medical History</Label
									>
									<Textarea
										id="past-medical-history"
										bind:value={pastMedicalHistory}
										placeholder="Previous medical conditions..."
										rows={3}
										class="w-full"
									/>
								</div>
								<div>
									<Label for="medications" class="mb-2 block text-sm font-medium text-gray-700"
										>Current Medications</Label
									>
									<Textarea
										id="medications"
										bind:value={medications}
										placeholder="List current medications..."
										rows={3}
										class="w-full"
									/>
								</div>
							</div>
							<div>
								<Label for="allergies" class="mb-2 block text-sm font-medium text-gray-700"
									>Allergies *</Label
								>
								<Input
									id="allergies"
									bind:value={allergies}
									placeholder="Known allergies (NKDA if none)"
									class="w-full"
								/>
							</div>
						</div>
					</div>

					<!-- Vital Signs -->
					<div class="mb-6">
						<h3 class="mb-4 text-lg font-semibold text-gray-800">Vital Signs</h3>
						<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
							<div>
								<Label for="blood-pressure" class="mb-2 block text-sm font-medium text-gray-700"
									>Blood Pressure *</Label
								>
								<Input
									id="blood-pressure"
									bind:value={bloodPressure}
									placeholder="120/80"
									class="w-full"
								/>
							</div>
							<div>
								<Label for="heart-rate" class="mb-2 block text-sm font-medium text-gray-700"
									>Heart Rate *</Label
								>
								<Input id="heart-rate" bind:value={heartRate} placeholder="72 bpm" class="w-full" />
							</div>
							<div>
								<Label for="temperature" class="mb-2 block text-sm font-medium text-gray-700"
									>Temperature *</Label
								>
								<Input
									id="temperature"
									bind:value={temperature}
									placeholder="36.5°C"
									class="w-full"
								/>
							</div>
							<div>
								<Label for="respiratory-rate" class="mb-2 block text-sm font-medium text-gray-700"
									>Respiratory Rate</Label
								>
								<Input
									id="respiratory-rate"
									bind:value={respiratoryRate}
									placeholder="16/min"
									class="w-full"
								/>
							</div>
							<div>
								<Label for="oxygen-saturation" class="mb-2 block text-sm font-medium text-gray-700"
									>O2 Saturation</Label
								>
								<Input
									id="oxygen-saturation"
									bind:value={oxygenSaturation}
									placeholder="98%"
									class="w-full"
								/>
							</div>
							<div>
								<Label for="weight" class="mb-2 block text-sm font-medium text-gray-700"
									>Weight</Label
								>
								<Input id="weight" bind:value={weight} placeholder="70 kg" class="w-full" />
							</div>
							<div>
								<Label for="height" class="mb-2 block text-sm font-medium text-gray-700"
									>Height</Label
								>
								<Input id="height" bind:value={height} placeholder="170 cm" class="w-full" />
							</div>
						</div>
					</div>

					<!-- Clinical Assessment & Diagnosis -->
					<div class="mb-6">
						<h3 class="mb-4 text-lg font-semibold text-gray-800">
							Clinical Assessment & Diagnosis
						</h3>
						<div class="space-y-4">
							<div>
								<Label for="primary-diagnosis" class="mb-2 block text-sm font-medium text-gray-700"
									>Primary Diagnosis *</Label
								>
								<Input
									id="primary-diagnosis"
									bind:value={primaryDiagnosis}
									placeholder="Primary diagnosis with ICD-10 code"
									class="w-full"
								/>
							</div>
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label for="severity" class="mb-2 block text-sm font-medium text-gray-700"
										>Severity Level *</Label
									>
									<Select.Root bind:value={severity}>
										<Select.Trigger class="w-full">
											{severity || 'Select severity'}
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="mild">Mild</Select.Item>
											<Select.Item value="moderate">Moderate</Select.Item>
											<Select.Item value="severe">Severe</Select.Item>
											<Select.Item value="critical">Critical</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
								<div>
									<Label for="urgency" class="mb-2 block text-sm font-medium text-gray-700"
										>Urgency Level *</Label
									>
									<Select.Root bind:value={urgency}>
										<Select.Trigger class="w-full">
											{urgency || 'Select urgency'}
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="routine">Routine</Select.Item>
											<Select.Item value="urgent">Urgent</Select.Item>
											<Select.Item value="emergent">Emergent</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
							</div>
						</div>
					</div>

					<!-- Treatment Plan & Clinical Notes -->
					<div class="mb-6">
						<h3 class="mb-4 text-lg font-semibold text-gray-800">Treatment Plan & Notes</h3>
						<div class="space-y-4">
							<div>
								<Label for="treatment-plan" class="mb-2 block text-sm font-medium text-gray-700"
									>Treatment Plan *</Label
								>
								<Textarea
									id="treatment-plan"
									bind:value={treatmentPlan}
									placeholder="Detailed treatment plan and recommendations..."
									rows={4}
									class="w-full"
								/>
							</div>
							<div>
								<Label for="clinical-notes" class="mb-2 block text-sm font-medium text-gray-700"
									>Clinical Notes</Label
								>
								<Textarea
									id="clinical-notes"
									bind:value={clinicalNotes}
									placeholder="Additional clinical observations and notes..."
									rows={3}
									class="w-full"
								/>
							</div>
							<div>
								<Label
									for="follow-up-instructions"
									class="mb-2 block text-sm font-medium text-gray-700">Follow-up Instructions</Label
								>
								<Textarea
									id="follow-up-instructions"
									bind:value={followUpInstructions}
									placeholder="Patient follow-up instructions..."
									rows={3}
									class="w-full"
								/>
							</div>
						</div>
					</div>

					<!-- File Attachments -->
					<div class="mb-8">
						<Label class="mb-3 block text-sm font-medium text-gray-700"
							>Clinical Attachments (Lab Results, Images, etc.)</Label
						>
						<div class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
							<Input
								type="file"
								multiple
								accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
								class="hidden"
								id="clinical-attachments"
								onchange={handleFileUpload}
							/>
							<label for="clinical-attachments" class="cursor-pointer">
								<div class="mb-2 text-gray-500">Upload clinical documents</div>
								<div class="flex justify-center gap-2">
									<Button variant="outline" class="text-sm">
										<Upload class="mr-2 h-4 w-4" />
										Browse Files
									</Button>
								</div>
							</label>
							{#if attachments.length > 0}
								<div class="mt-4 space-y-2">
									{#each attachments as file, index}
										<div class="flex items-center justify-between rounded bg-gray-100 p-2">
											<span class="text-sm">{file.name}</span>
											<Button variant="ghost" size="sm" onclick={() => removeAttachment(index)}>
												×
											</Button>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="flex justify-center gap-4">
						<Button variant="outline" class="flex items-center gap-2">
							<FileText class="h-4 w-4" />
							PREVIEW
						</Button>
						<Button class="bg-blue-500 px-8 text-white hover:bg-blue-600">
							<Save class="mr-2 h-4 w-4" />
							SAVE ENCOUNTER
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
