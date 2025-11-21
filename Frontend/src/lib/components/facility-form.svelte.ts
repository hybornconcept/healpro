import { register, createHospital } from '$lib/api';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';

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

export class FacilityFormState {
	formData = $state({
		facilityName: '',
		facilityType: 'Hospital',
		licenseNumber: '',
		taxId: '',
		yearEstablished: '',
		address: {
			street: '',
			city: '',
			state: '',
			zipCode: '',
			country: ''
		},
		contact: {
			primaryPhone: '',
			alternatePhone: '',
			email: '',
			website: ''
		},
		representative: {
			name: '',
			position: '',
			phone: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		services: {
			emergency: false,
			inpatient: false,
			outpatient: false,
			surgery: false,
			laboratory: false,
			radiology: false,
			pharmacy: false,
			specialtyCare: false
		},
		specialties: '',
		bedCount: '',
		staffCount: '',
		acceptedInsurance: '',
		certifications: '',
		consents: {
			privacy: false
		},
		licenseFiles: [] as File[],
		accreditationFiles: [] as File[]
	});

	errors = $state<Record<string, string>>({});
	isLoading = $state(false);

	validate() {
		const newErrors: Record<string, string> = {};
		const fd = this.formData;

		// Required fields
		if (!fd.facilityName) newErrors.facilityName = 'Facility Name is required';
		if (!fd.facilityType) newErrors.facilityType = 'Facility Type is required';
		if (!fd.licenseNumber) newErrors.licenseNumber = 'License Number is required';

		// Address
		if (!fd.address.street) newErrors.street = 'Street Address is required';
		if (!fd.address.city) newErrors.city = 'City is required';
		if (!fd.address.state) newErrors.state = 'State is required';
		if (!fd.address.zipCode) newErrors.zipCode = 'Zip Code is required';
		if (!fd.address.country) newErrors.country = 'Country is required';

		// Contact
		if (!fd.contact.primaryPhone) newErrors.primaryPhone = 'Primary Phone is required';
		if (!fd.contact.email) {
			newErrors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(fd.contact.email)) {
			newErrors.email = 'Invalid email address';
		}

		// Representative
		if (!fd.representative.name) newErrors.repName = 'Representative Name is required';
		if (!fd.representative.email) {
			newErrors.repEmail = 'Representative Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(fd.representative.email)) {
			newErrors.repEmail = 'Invalid email address';
		}
		if (!fd.representative.password) newErrors.password = 'Password is required';
		if (fd.representative.password !== fd.representative.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		// Consents
		if (!fd.consents.privacy) newErrors.privacy = 'You must agree to the privacy policy';

		this.errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	async handleSubmit() {
		if (!this.validate()) {
			showErrorToast('Please fix the errors in the form');
			return;
		}
		this.isLoading = true;

		try {
			// 1. Create User Account (Representative)
			const userRes = (await register(
				this.formData.representative.email,
				this.formData.representative.password,
				this.formData.representative.name
			)) as any;

			const userId = userRes.user?.id || userRes.id;

			if (!userId) {
				throw new Error('Failed to retrieve User ID after registration');
			}

			// 2. Create Facility
			const servicesOffered = Object.entries(this.formData.services)
				.filter(([_, enabled]) => enabled)
				.map(([key]) => key);

			const facilityPayload = {
				organizationId: userId.toString(),
				facilityName: this.formData.facilityName,
				licenseNumber: this.formData.licenseNumber,
				facilityType: this.formData.facilityType,
				taxId: this.formData.taxId,
				yearEstablished: this.formData.yearEstablished
					? parseInt(this.formData.yearEstablished)
					: undefined,
				address: this.formData.address.street,
				city: this.formData.address.city,
				state: this.formData.address.state,
				zipCode: this.formData.address.zipCode,
				country: this.formData.address.country,
				primaryPhone: this.formData.contact.primaryPhone,
				alternatePhone: this.formData.contact.alternatePhone,
				email: this.formData.contact.email,
				website: this.formData.contact.website,
				representativeName: this.formData.representative.name,
				representativePosition: this.formData.representative.position,
				representativePhone: this.formData.representative.phone,
				representativeEmail: this.formData.representative.email,
				specialties: this.formData.specialties
					? this.formData.specialties.split(',').map((s) => s.trim())
					: [],
				bedCount: this.formData.bedCount ? parseInt(this.formData.bedCount) : undefined,
				staffCount: this.formData.staffCount ? parseInt(this.formData.staffCount) : undefined,
				acceptedInsurance: this.formData.acceptedInsurance
					? this.formData.acceptedInsurance.split(',').map((s) => s.trim())
					: [],
				certifications: this.formData.certifications
					? this.formData.certifications.split(',').map((s) => s.trim())
					: [],
				servicesOffered: servicesOffered,
				consentTerms: this.formData.consents.privacy,
				consentDataSharing: this.formData.consents.privacy,
				consentVerification: this.formData.consents.privacy
			};

			await createHospital(facilityPayload);

			showSuccessToast('Facility registration successful');
			setTimeout(() => goto('/login'), 1000);
		} catch (error: any) {
			console.error('Registration failed:', error);
			showErrorToast(error.body?.error || error.message || 'Error Occurred');
		} finally {
			this.isLoading = false;
		}
	}

	addFiles(files: File[], type: 'license' | 'accreditation') {
		if (type === 'license') {
			this.formData.licenseFiles = [...this.formData.licenseFiles, ...files];
		} else {
			this.formData.accreditationFiles = [...this.formData.accreditationFiles, ...files];
		}
	}

	removeFile(index: number, type: 'license' | 'accreditation') {
		if (type === 'license') {
			this.formData.licenseFiles = this.formData.licenseFiles.filter((_, i) => i !== index);
		} else {
			this.formData.accreditationFiles = this.formData.accreditationFiles.filter(
				(_, i) => i !== index
			);
		}
	}
}
