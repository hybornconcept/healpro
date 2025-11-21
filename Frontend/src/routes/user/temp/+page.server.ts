import type { PageServerLoad } from './$types';

export const load = (async () => {
	// Healthcare insurance metrics dashboard
	const stats = [
		{ label: 'CLAIMS APPROVAL RATE', value: '94.2%', sub: '', change: '2.1%', positive: true },
		{
			label: 'AVG PROCESSING TIME',
			value: '2.3',
			sub: 'days',
			change: '-0.5 days',
			positive: true
		},
		{ label: 'IN-NETWORK USAGE', value: '87.5%', sub: '', change: '1.2%', positive: true },
		{ label: 'PRE-AUTH SUCCESS', value: '91.8%', sub: '', change: '-0.3%', positive: false },
		{ label: 'WELLNESS PARTICIPATION', value: '76.3%', sub: '', change: '4.1%', positive: true }
	];

	// Personal healthcare metrics for individual client dashboard
	const healthcareMetrics = [
		{
			id: 'PC001',
			category: 'Preventive Care',
			metric: 'Annual Checkups',
			currentValue: '8/12 visits used',
			coverage: { percentage: 67, text: '8 of 12 used' },
			status: 'On Track',
			target: '12 visits/year',
			lastUpdate: '2 days ago',
			nextDue: 'Mar 15, 2025'
		},
		{
			id: 'PC002',
			category: 'Preventive Care',
			metric: 'Cancer Screenings',
			currentValue: '2/3 completed',
			coverage: { percentage: 67, text: '2 of 3 done' },
			status: 'Due Soon',
			target: '3 screenings/year',
			lastUpdate: '1 month ago',
			nextDue: 'Jan 20, 2025'
		},
		{
			id: 'SV001',
			category: 'Specialist Care',
			metric: 'Specialist Visits',
			currentValue: '3/6 visits used',
			coverage: { percentage: 50, text: '3 of 6 used' },
			status: 'Available',
			target: '6 visits/year',
			lastUpdate: '3 hours ago',
			nextDue: 'As needed'
		},
		{
			id: 'SV002',
			category: 'Specialist Care',
			metric: 'Referral Status',
			currentValue: '1 pending',
			coverage: { percentage: 25, text: '1 pending' },
			status: 'In Progress',
			target: 'Complete within 30 days',
			lastUpdate: '5 days ago',
			nextDue: 'Jan 25, 2025'
		},
		{
			id: 'AP001',
			category: 'Annual Requirements',
			metric: 'Annual Physical',
			currentValue: 'Overdue',
			coverage: { percentage: 0, text: 'Not completed' },
			status: 'Action Required',
			target: 'Complete by Dec 31',
			lastUpdate: '1 week ago',
			nextDue: 'Schedule ASAP'
		},
		{
			id: 'ER001',
			category: 'Emergency Care',
			metric: 'ER Visits',
			currentValue: '2 visits this year',
			coverage: { percentage: 67, text: '2 of 3 limit' },
			status: 'Normal',
			target: '<3 visits/year',
			lastUpdate: '2 weeks ago',
			nextDue: 'N/A'
		},
		{
			id: 'CC001',
			category: 'Chronic Care',
			metric: 'Diabetes Management',
			currentValue: '94% compliance',
			coverage: { percentage: 94, text: '94% compliant' },
			status: 'Excellent',
			target: '>90% compliance',
			lastUpdate: '1 day ago',
			nextDue: 'Feb 1, 2025'
		},
		{
			id: 'WP001',
			category: 'Wellness',
			metric: 'Wellness Program',
			currentValue: 'Level 3 Active',
			coverage: { percentage: 75, text: 'Level 3 of 4' },
			status: 'Participating',
			target: 'Maintain Level 3+',
			lastUpdate: '4 days ago',
			nextDue: 'Weekly check-in'
		},
		{
			id: 'TM001',
			category: 'Care Delivery',
			metric: 'Telemedicine Usage',
			currentValue: '65% of visits',
			coverage: { percentage: 65, text: '65% virtual' },
			status: 'High Usage',
			target: 'Balanced approach',
			lastUpdate: '1 week ago',
			nextDue: 'Next appointment'
		},
		{
			id: 'AE001',
			category: 'Access',
			metric: 'Appointment Efficiency',
			currentValue: '92% success rate',
			coverage: { percentage: 92, text: '92% successful' },
			status: 'Excellent',
			target: '>85% success',
			lastUpdate: '3 days ago',
			nextDue: 'Ongoing'
		},
		{
			id: 'PQ001',
			category: 'Quality',
			metric: 'Provider Ratings',
			currentValue: '4.2/5 average',
			coverage: { percentage: 84, text: '4.2 of 5.0' },
			status: 'Good',
			target: '>4.0 rating',
			lastUpdate: '1 week ago',
			nextDue: 'After each visit'
		},
		{
			id: 'HR001',
			category: 'Risk Assessment',
			metric: 'Health Risk Score',
			currentValue: 'Low Risk',
			coverage: { percentage: 90, text: 'Low risk' },
			status: 'Healthy',
			target: 'Maintain low risk',
			lastUpdate: '2 weeks ago',
			nextDue: 'Annual assessment'
		},
		{
			id: 'CC002',
			category: 'Coordination',
			metric: 'Care Coordination',
			currentValue: '94% score',
			coverage: { percentage: 94, text: '94% coordinated' },
			status: 'Excellent',
			target: '>90% coordination',
			lastUpdate: '5 days ago',
			nextDue: 'Ongoing'
		},
		{
			id: 'CG001',
			category: 'Coverage',
			metric: 'Coverage Gaps',
			currentValue: '2 identified',
			coverage: { percentage: 20, text: '2 gaps found' },
			status: 'Review Needed',
			target: 'Minimize gaps',
			lastUpdate: '1 week ago',
			nextDue: 'Policy review'
		}
	];

	// Chart data for components
	const networkUsageData = [
		{ vendor: 'in-network', amount: 87.5, color: 'hsl(142, 76%, 36%)' },
		{ vendor: 'out-network', amount: 12.5, color: 'hsl(48, 96%, 53%)' }
	];

	const telemedicineData = [
		{ date: new Date('2024-06-03'), telemedicine: 45, inPerson: 55 },
		{ date: new Date('2024-06-04'), telemedicine: 52, inPerson: 48 },
		{ date: new Date('2024-06-05'), telemedicine: 38, inPerson: 62 },
		{ date: new Date('2024-06-06'), telemedicine: 47, inPerson: 53 },
		{ date: new Date('2024-06-07'), telemedicine: 43, inPerson: 57 },
		{ date: new Date('2024-06-08'), telemedicine: 55, inPerson: 45 },
		{ date: new Date('2024-06-09'), telemedicine: 48, inPerson: 52 },
		{ date: new Date('2024-06-10'), telemedicine: 41, inPerson: 59 },
		{ date: new Date('2024-06-11'), telemedicine: 39, inPerson: 61 },
		{ date: new Date('2024-06-12'), telemedicine: 54, inPerson: 46 },
		{ date: new Date('2024-06-13'), telemedicine: 37, inPerson: 63 },
		{ date: new Date('2024-06-14'), telemedicine: 53, inPerson: 47 },
		{ date: new Date('2024-06-15'), telemedicine: 46, inPerson: 54 },
		{ date: new Date('2024-06-16'), telemedicine: 44, inPerson: 56 },
		{ date: new Date('2024-06-17'), telemedicine: 58, inPerson: 42 },
		{ date: new Date('2024-06-18'), telemedicine: 40, inPerson: 60 },
		{ date: new Date('2024-06-19'), telemedicine: 49, inPerson: 51 },
		{ date: new Date('2024-06-20'), telemedicine: 51, inPerson: 49 },
		{ date: new Date('2024-06-21'), telemedicine: 42, inPerson: 58 },
		{ date: new Date('2024-06-22'), telemedicine: 45, inPerson: 55 },
		{ date: new Date('2024-06-23'), telemedicine: 56, inPerson: 44 },
		{ date: new Date('2024-06-24'), telemedicine: 43, inPerson: 57 },
		{ date: new Date('2024-06-25'), telemedicine: 41, inPerson: 59 },
		{ date: new Date('2024-06-26'), telemedicine: 52, inPerson: 48 },
		{ date: new Date('2024-06-27'), telemedicine: 57, inPerson: 43 },
		{ date: new Date('2024-06-28'), telemedicine: 44, inPerson: 56 },
		{ date: new Date('2024-06-29'), telemedicine: 46, inPerson: 54 },
		{ date: new Date('2024-06-30'), telemedicine: 59, inPerson: 41 }
	];

	// Radar chart data for health metrics overview
	const radarChartData = [
		{ category: 'Preventive Care', current: 67, target: 100 },
		{ category: 'Specialist Visits', current: 50, target: 100 },
		{ category: 'Chronic Care', current: 94, target: 100 },
		{ category: 'Wellness Program', current: 75, target: 100 },
		{ category: 'Emergency Care', current: 33, target: 100 },
		{ category: 'Care Coordination', current: 94, target: 100 }
	];

	return {
		stats,
		accounts: [],
		transactions: [],
		healthcareMetrics,
		networkUsageData,
		telemedicineData,
		radarChartData
	};
}) satisfies PageServerLoad;
