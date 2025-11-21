import type { PageServerLoad } from './$types';

export const load = (async () => {
	// Define State type
	type State = 'lagos' | 'abuja' | 'rivers' | 'kano' | 'oyo';

	// Sample Nigerian states
	const states: { value: State; label: string }[] = [
		{ value: 'lagos', label: 'Lagos' },
		{ value: 'abuja', label: 'Abuja' },
		{ value: 'rivers', label: 'Rivers' },
		{ value: 'kano', label: 'Kano' },
		{ value: 'oyo', label: 'Oyo' }
	];

	// Define Facility type
	type Facility = {
		value: string;
		label: string;
		address: string;
		phone: string;
		email: string;
		license: string;
	};

	// Facilities by state with provider details
	const facilities: Record<State, Facility[]> = {
		lagos: [
			{
				value: 'lagos-hospital',
				label: 'Lagos General Hospital',
				address: '123 Health Street, Lagos',
				phone: '+234 701 234 5678',
				email: 'billing@lagoshospital.com',
				license: 'MED-LAG-001'
			},
			{
				value: 'reddington',
				label: 'Reddington Hospital',
				address: '45 Marina Road, Lagos',
				phone: '+234 802 345 6789',
				email: 'billing@reddington.com',
				license: 'MED-LAG-002'
			},
			{
				value: 'st-nicholas',
				label: 'St. Nicholas Hospital',
				address: '67 Ahmadu Bello Way, Lagos',
				phone: '+234 803 456 7890',
				email: 'billing@stnicholas.com',
				license: 'MED-LAG-003'
			}
		],
		abuja: [
			{
				value: 'national-hospital',
				label: 'National Hospital Abuja',
				address: 'Abuja Municipal Area Council, Abuja',
				phone: '+234 804 567 8901',
				email: 'billing@nationalhospital.com',
				license: 'MED-ABJ-001'
			},
			{
				value: 'asokoro',
				label: 'Asokoro District Hospital',
				address: 'Asokoro District, Abuja',
				phone: '+234 805 678 9012',
				email: 'billing@asokorohospital.com',
				license: 'MED-ABJ-002'
			}
		],
		rivers: [
			{
				value: 'upth',
				label: 'University of Port Harcourt Teaching Hospital',
				address: 'University of Port Harcourt, Rivers State',
				phone: '+234 806 789 0123',
				email: 'billing@upth.com',
				license: 'MED-RIV-001'
			}
		],
		kano: [
			{
				value: 'akth',
				label: 'Aminu Kano Teaching Hospital',
				address: 'Aminu Kano Teaching Hospital Road, Kano',
				phone: '+234 807 890 1234',
				email: 'billing@akth.com',
				license: 'MED-KAN-001'
			}
		],
		oyo: [
			{
				value: 'uch',
				label: 'University College Hospital',
				address: 'Ibadan, Oyo State',
				phone: '+234 808 901 2345',
				email: 'billing@uch-ibadan.com',
				license: 'MED-OYO-001'
			}
		]
	};

	// Patients data
	const patients = [
		{
			value: 'john-doe',
			label: 'John Doe',
			policy: 'AXA-POL-12345',
			dob: '1985-03-15',
			address: '15 Ahmadu Bello Way, Victoria Island, Lagos',
			email: 'john@example.com',
			phone: '+234 803 123 4567'
		},
		{
			value: 'mary-smith',
			label: 'Mary Smith',
			policy: 'AXA-POL-67890',
			dob: '1990-07-22',
			address: '42 Independence Avenue, Garki, Abuja',
			email: 'mary@example.com',
			phone: '+234 809 876 5432'
		}
	];

	// Default service items
	const defaultItems = [
		{
			name: 'Consultation',
			qty: 1,
			price: 15000
		},
		{
			name: 'Blood Test',
			qty: 1,
			price: 8000
		}
	];

	// Generate invoice number
	const generateInvoiceNumber = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const random = Math.floor(Math.random() * 1000)
			.toString()
			.padStart(3, '0');
		return `MED-INV-${year}-${month}-${random}`;
	};

	return {
		states,
		facilities,
		patients,
		defaultItems,
		invoiceNumber: generateInvoiceNumber(),
		serviceDate: new Date().toLocaleDateString('en-GB'),
		dueDate: '30 days from issue',
		defaultProvider: facilities.lagos[0]
	};
}) satisfies PageServerLoad;
