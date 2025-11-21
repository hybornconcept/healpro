import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const sliders = [
		{
			title: 'Quality of medical care and treatment',
			color: 'bg-emerald-500'
		},
		{
			title: 'Staff professionalism and bedside manner',
			color: 'bg-blue-500'
		},
		{
			title: 'Cleanliness and hygiene standards',
			color: 'bg-purple-500'
		},
		{
			title: 'Wait times and appointment scheduling',
			color: 'bg-amber-500'
		},
		{
			title: 'Overall hospital facilities and equipment',
			color: 'bg-rose-500'
		}
	];

	const userProfile = {
		name: 'Ludmila Sidorshina',
		email: 'ludmilasidorshina@gmail.com',
		phone: '(949) 853 0552',
		address: '15 Grand Valecrest Crescent, California',
		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		stats: { past: 5, upcoming: 2 },
		medicalDetails: [
			{ label: 'Smoker', value: 'No' },
			{ label: 'Blood Type', value: 'AB+' },
			{ label: 'Disability Status', value: 'None' },
			{ label: 'Organ Donor Status', value: 'Yes' },
			{ label: 'Allergies', value: 'Penicillin, Shellfish' },
			{ label: 'Medical Conditions', value: 'Hypertension, Type 2 Diabetes' },
			{ label: 'Previous Surgeries', value: 'Appendectomy (2015)' },
			{ label: 'Family Medical History', value: 'Heart Disease, Diabetes' },
			{ label: 'Religion/Spiritual Preferences', value: 'Christian' },
			{ label: 'Advanced Directives', value: 'Healthcare Proxy on file' },
			{ label: 'Health Goals', value: 'Weight loss, blood pressure targets' },
			{ label: 'Risk Assessment Scores', value: 'Cardiac risk, cancer screening results' }
		],
		personalDetails: [
			{ label: 'SN/SSN', value: '458 19 5642' },
			{ label: 'Country of Birth', value: 'United States' },
			{ label: 'Gender', value: 'Male' },
			{ label: 'Marital Status', value: 'Married' },
			{ label: 'Region', value: 'USA' },
			{ label: 'DOB', value: 'Jul. 10, 1982' },
			{ label: 'Age', value: '38 Years' },
			{ label: 'Occupation', value: 'Architecture' },
			{ label: 'Preferred Language', value: 'English' },
			{ label: 'Communication Preferences', value: 'Email, SMS' },
			{ label: 'Privacy Settings', value: 'Family access authorized' },
			{ label: 'Emergency Contact', value: 'Sarah Morgan (Spouse) - 9498830866' }
		],
		dependents: [
			{ label: 'Spouse', value: 'Sarah Morgan' },
			{ label: 'Child 1', value: 'Emma Morgan' },
			{ label: 'Child 2', value: 'James Morgan' }
		]
	};

	const appointments = [
		{
			date: '13 Jan, 2022',
			time: '4:00 PM',
			facility: 'General Hospital Lagos',
			unit: 'Cardiology',
			type: 'Regular checkup',
			claimStatus: 'In-Review',
			coverage: '₦85,000',
			rate: '2%',
			prescriptionGiven: 'Yes',
			referralStatus: 'None',
			status: 'upcoming'
		},
		{
			date: '21 Nov, 2021',
			time: '1:00 PM',
			facility: 'Lagos University Teaching Hospital',
			unit: 'Dental',
			type: 'Bleaching',
			claimStatus: 'Approved',
			coverage: '₦45,000',
			rate: '30%',
			prescriptionGiven: 'No',
			referralStatus: 'Referred',
			status: 'completed'
		},
		{
			date: '12 Sep, 2021',
			time: '5:00 PM',
			facility: 'General Hospital Lagos',
			unit: 'General Medicine',
			type: 'Regular checkup',
			claimStatus: 'In-Review',
			coverage: '₦25,000',
			rate: '0%',
			prescriptionGiven: 'Yes',
			referralStatus: 'None',
			status: 'completed'
		},
		{
			date: '19 Aug, 2021',
			time: '11:00 AM',
			facility: 'National Hospital Abuja',
			unit: 'Orthopedics',
			type: 'Consultation',
			claimStatus: 'Approved',
			coverage: '₦120,000',
			rate: '3%',
			prescriptionGiven: 'No',
			referralStatus: 'Referred',
			status: 'completed'
		},
		{
			date: '24 Jul, 2021',
			time: '6:00 PM',
			facility: 'Lagos University Teaching Hospital',
			unit: 'Dental',
			type: 'Bleaching',
			claimStatus: 'Rejected',
			coverage: '₦35,000',
			rate: '5%',
			prescriptionGiven: 'No',
			referralStatus: 'None',
			status: 'completed'
		},
		{
			date: '24 Jul, 2021',
			time: '6:00 PM',
			facility: 'Lagos University Teaching Hospital',
			unit: 'Dental',
			type: 'Bleaching',
			claimStatus: 'Rejected',
			coverage: '₦45,000',
			rate: '0%'
		}
	];

	const hospitalInfo = {
		name: 'General Hospital Lagos',
		location: 'Victoria Island, Lagos State',
		initials: 'GH',
		unit: 'Cardiology',
		rating: '4.2/5'
	};

	const serviceTimeline = [
		{
			title: 'Routine check up',
			date: '30 Nov 2024 • 5:23 PM',
			details: 'Blood pressure, heart rate, general physical examination',
			status: 'completed'
		},
		{
			title: 'Check lab',
			date: '23 Nov 2024 • 5:23 PM',
			details: 'Blood test, urine analysis, cholesterol screening',
			status: 'completed'
		},
		{
			title: 'Control of lab results',
			date: '18 Nov 2024 • 5:23 PM',
			details: 'Review blood work, discuss findings with physician',
			status: 'pending'
		},
		{
			title: 'Drug control',
			date: '11 Nov 2024 • 5:23 PM',
			details: 'Medication review, dosage adjustment, side effects check',
			status: 'pending'
		},
		{
			title: 'Routine check up',
			date: '4 Nov 2024 • 5:23 PM',
			details: 'Follow-up examination, vital signs monitoring',
			status: 'pending'
		},
		{
			title: 'Check lab',
			date: '27 Oct 2024 • 5:23 PM',
			details: 'Liver function test, kidney function assessment',
			status: 'pending'
		},
		{
			title: 'Control of lab results',
			date: '20 Oct 2024 • 5:23 PM',
			details: 'Lab report analysis, treatment plan discussion',
			status: 'pending'
		}
	];

	return {
		sliders,
		userProfile,
		appointments,
		hospitalInfo,
		serviceTimeline
	};
};
