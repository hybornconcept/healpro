import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';
import { register, createHMO } from '$lib/api';

export class HmoFormState {
	formData = $state({
		companyName: '',
		registrationNumber: '',
		taxId: '',
		yearEstablished: '',
		address: {
			headquarters: '',
			city: '',
			state: '',
			zipCode: '',
			country: 'United States'
		},
		contact: {
			primaryPhone: '',
			customerService: '',
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
		coverage: {
			states: '',
			memberCount: '',
			networkSize: '',
			planTypes: {
				hmo: false,
				ppo: false,
				epo: false,
				pos: false,
				indemnity: false,
				medicare: false,
				medicaid: false
			}
		},
		financials: {
			annualRevenue: '',
			claimsProcessed: '',
			averageProcessingTime: ''
		},
		partnerships: {
			hospitals: '',
			pharmacies: '',
			laboratories: '',
			specialists: ''
		},
		consents: {
			terms: false,
			dataSharing: false
		},
		licenseFiles: [] as File[],
		financialFiles: [] as File[]
	});

	errors = $state<Record<string, string>>({});
	isLoading = $state(false);

	validate() {
		const newErrors: Record<string, string> = {};
		const fd = this.formData;

		// Company Info
		if (!fd.companyName) newErrors.companyName = 'Company Name is required';
		if (!fd.registrationNumber) newErrors.registrationNumber = 'Registration Number is required';
		if (!fd.taxId) newErrors.taxId = 'Tax ID is required';
		if (!fd.yearEstablished) newErrors.yearEstablished = 'Year Established is required';

		// Address
		if (!fd.address.headquarters) newErrors.headquarters = 'Headquarters Address is required';
		if (!fd.address.city) newErrors.city = 'City is required';
		if (!fd.address.state) newErrors.state = 'State is required';
		if (!fd.address.zipCode) newErrors.zipCode = 'Zip Code is required';
		if (!fd.address.country) newErrors.country = 'Country is required';

		// Contact
		if (!fd.contact.primaryPhone) newErrors.primaryPhone = 'Primary Phone is required';
		if (!fd.contact.email) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.contact.email)) {
			newErrors.email = 'Invalid email format';
		}

		// Representative
		if (!fd.representative.name) newErrors.repName = 'Representative Name is required';
		if (!fd.representative.email) {
			newErrors.repEmail = 'Representative Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.representative.email)) {
			newErrors.repEmail = 'Invalid email format';
		}
		if (!fd.representative.password) newErrors.password = 'Password is required';
		if (fd.representative.password !== fd.representative.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		// Coverage
		const hasPlanType = Object.values(fd.coverage.planTypes).some((checked) => checked);
		if (!hasPlanType) newErrors.planTypes = 'Select at least one plan type';

		// Consents
		if (!fd.consents.terms) newErrors.terms = 'You must agree to the terms';

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
			// 1. Register the representative user
			const userRes = await register(
				this.formData.representative.email,
				this.formData.representative.password,
				this.formData.representative.name
			);

			let userId = '';
			if (userRes && typeof userRes === 'object' && 'id' in userRes) {
				userId = (userRes as any).id;
			} else if (userRes && typeof userRes === 'object' && 'user' in userRes) {
				userId = (userRes as any).user.id;
			} else if (userRes && typeof userRes === 'object' && 'data' in userRes) {
				userId = (userRes as any).data.user.id;
			}

			if (!userId) {
				throw new Error('Failed to retrieve user ID from registration response');
			}

			// 2. Create the HMO linked to the user
			// Transform planTypes object to array of strings
			const planTypesArray = Object.entries(this.formData.coverage.planTypes)
				.filter(([_, checked]) => checked)
				.map(([key]) => key.toUpperCase());

			// Transform comma-separated strings to arrays where needed
			const statesCovered = this.formData.coverage.states
				? this.formData.coverage.states.split(',').map((s) => s.trim())
				: [];

			const hmoData = {
				organizationId: userId, // Using user ID as organization ID for now
				companyName: this.formData.companyName,
				registrationNumber: this.formData.registrationNumber,
				taxId: this.formData.taxId || undefined,
				yearEstablished:
					this.formData.yearEstablished && !isNaN(parseInt(this.formData.yearEstablished))
						? parseInt(this.formData.yearEstablished)
						: undefined,
				headquartersAddress: this.formData.address.headquarters,
				city: this.formData.address.city,
				state: this.formData.address.state,
				zipCode: this.formData.address.zipCode,
				country: this.formData.address.country,
				primaryPhone: this.formData.contact.primaryPhone,
				customerServicePhone: this.formData.contact.customerService || undefined,
				email: this.formData.contact.email,
				website: this.formData.contact.website || undefined,
				representativeName: this.formData.representative.name,
				representativePosition: this.formData.representative.position || undefined,
				representativePhone: this.formData.representative.phone || undefined,
				representativeEmail: this.formData.representative.email,
				statesCovered: statesCovered,
				memberCount:
					this.formData.coverage.memberCount &&
					!isNaN(parseInt(this.formData.coverage.memberCount.replace(/,/g, '')))
						? parseInt(this.formData.coverage.memberCount.replace(/,/g, ''))
						: undefined,
				networkSize:
					this.formData.coverage.networkSize &&
					!isNaN(parseInt(this.formData.coverage.networkSize.replace(/,/g, '')))
						? parseInt(this.formData.coverage.networkSize.replace(/,/g, ''))
						: undefined,
				planTypes: planTypesArray,
				annualRevenue: this.formData.financials.annualRevenue || undefined,
				claimsProcessed:
					this.formData.financials.claimsProcessed &&
					!isNaN(parseInt(this.formData.financials.claimsProcessed.replace(/,/g, '')))
						? parseInt(this.formData.financials.claimsProcessed.replace(/,/g, ''))
						: undefined,
				averageProcessingTime: this.formData.financials.averageProcessingTime || undefined,
				hospitalPartners: this.formData.partnerships.hospitals
					? [this.formData.partnerships.hospitals]
					: [],
				pharmacyPartners: this.formData.partnerships.pharmacies
					? [this.formData.partnerships.pharmacies]
					: [],
				laboratoryPartners: this.formData.partnerships.laboratories
					? [this.formData.partnerships.laboratories]
					: [],
				specialistPartners: this.formData.partnerships.specialists
					? [this.formData.partnerships.specialists]
					: [],
				consentTerms: this.formData.consents.terms,
				consentDataSharing: this.formData.consents.dataSharing
			};

			await createHMO(hmoData);

			showSuccessToast('HMO registration successful!');
			goto('/login'); // Redirect to login or appropriate page
		} catch (error: any) {
			console.error('HMO Registration Error:', error);
			let message = 'An unexpected error occurred.';

			// Try to extract message from various error structures
			if (error.body && error.body.message) {
				message = error.body.message;
			} else if (error.body && error.body.error) {
				message = error.body.error;
			} else if (error.message) {
				message = error.message;
			}

			// Handle specific cases
			if (
				message.toLowerCase().includes('existing email') ||
				JSON.stringify(error).toLowerCase().includes('existing email')
			) {
				message = 'An account with this email already exists.';
			}

			showErrorToast(message);
		} finally {
			this.isLoading = false;
		}
	}

	addFiles(files: File[], type: 'license' | 'financial') {
		if (type === 'license') {
			this.formData.licenseFiles = [...this.formData.licenseFiles, ...files];
		} else {
			this.formData.financialFiles = [...this.formData.financialFiles, ...files];
		}
	}

	removeFile(index: number, type: 'license' | 'financial') {
		if (type === 'license') {
			this.formData.licenseFiles = this.formData.licenseFiles.filter((_, i) => i !== index);
		} else {
			this.formData.financialFiles = this.formData.financialFiles.filter((_, i) => i !== index);
		}
	}
}

// Helper functions for toasts
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
