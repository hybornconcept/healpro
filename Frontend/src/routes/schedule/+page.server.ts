import type { PageServerLoad } from './$types';

// Cache facilities data organized by location
const facilitiesByLocationCache: Record<string, { value: string; label: string }[]> = {
	lagos: [
		{ value: 'lagos-university-teaching-hospital', label: 'Lagos University Teaching Hospital' },
		{ value: 'general-hospital-lagos-island', label: 'General Hospital Lagos Island' },
		{ value: 'reddington-hospital', label: 'Reddington Hospital' },
		{ value: 'eko-hospital', label: 'Eko Hospital' },
		{ value: 'first-cardiology-consultants', label: 'First Cardiology Consultants' }
	],
	abuja: [
		{
			value: 'university-of-abuja-teaching-hospital',
			label: 'University of Abuja Teaching Hospital'
		},
		{ value: 'national-hospital-abuja', label: 'National Hospital Abuja' },
		{ value: 'garki-hospital', label: 'Garki Hospital' },
		{ value: 'cedarcrest-hospitals', label: 'Cedarcrest Hospitals' },
		{ value: 'nisa-premier-hospital', label: 'Nisa Premier Hospital' }
	],
	kano: [
		{ value: 'aminu-kano-teaching-hospital', label: 'Aminu Kano Teaching Hospital' },
		{
			value: 'murtala-mohammed-specialist-hospital',
			label: 'Murtala Mohammed Specialist Hospital'
		},
		{ value: 'hasiya-bayero-pediatric-hospital', label: 'Hasiya Bayero Pediatric Hospital' },
		{ value: 'dala-orthopedic-hospital', label: 'Dala Orthopedic Hospital' },
		{ value: 'giginyu-hospital', label: 'Giginyu Hospital' }
	],
	'port-harcourt': [
		{
			value: 'university-of-port-harcourt-teaching-hospital',
			label: 'University of Port Harcourt Teaching Hospital'
		},
		{
			value: 'braithwaite-memorial-specialist-hospital',
			label: 'Braithwaite Memorial Specialist Hospital'
		},
		{ value: 'general-hospital-port-harcourt', label: 'General Hospital Port Harcourt' },
		{ value: 'kelsey-harrison-hospital', label: 'Kelsey Harrison Hospital' },
		{ value: 'royal-hospital', label: 'Royal Hospital' }
	],
	ibadan: [
		{ value: 'university-college-hospital', label: 'University College Hospital' },
		{ value: 'adeoyo-maternity-hospital', label: 'Adeoyo Maternity Hospital' },
		{ value: 'ring-road-state-hospital', label: 'Ring Road State Hospital' },
		{ value: 'jericho-nursing-home', label: 'Jericho Nursing Home' },
		{ value: 'molly-specialist-hospital', label: 'Molly Specialist Hospital' }
	]
};

export const load: PageServerLoad = async () => {
	const locations = [
		{ value: 'lagos', label: 'Lagos' },
		{ value: 'abuja', label: 'Abuja' },
		{ value: 'kano', label: 'Kano' },
		{ value: 'port-harcourt', label: 'Port Harcourt' },
		{ value: 'ibadan', label: 'Ibadan' }
	];

	return {
		locations,
		facilitiesByLocation: facilitiesByLocationCache
	};
};
