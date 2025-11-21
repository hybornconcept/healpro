function getInitials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase();
}

function getAvatarFallback(name: string): string {
	return `data:image/svg+xml;base64,${btoa(`
		<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
			<rect width="40" height="40" fill="#3B82F6"/>
			<text x="20" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">${getInitials(name)}</text>
		</svg>
	`)}`;
}

export async function load() {
	const contacts = [
		{
			id: 1,
			name: 'Adebayo Ogundimu',
			role: 'Insurance Claims Specialist',
			time: '09:46 AM',
			avatar: getAvatarFallback('Adebayo Ogundimu'),
			hasNotification: false,
			patientInfo: {
				id: 'HMO123453',
				dateOfBirth: '12/4/87',
				contact: '+234 803 555 0109',
				appointment: '8/15/25 5:23 PM',
				medications: 'Hydrocortisone cream - ₦15,000 claim approved'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Adebayo Ogundimu',
					message:
						'Good day! Your dermatology claim for ₦45,000 has been processed. The insurance covers 80% as per your HMO plan.',
					time: '09:35 AM',
					isUser: false,
					avatar: getAvatarFallback('Adebayo Ogundimu')
				},
				{
					id: 2,
					sender: 'You',
					message: 'Thank you! When will the reimbursement be credited to my account?',
					time: '09:40 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				},
				{
					id: 3,
					sender: 'Adebayo Ogundimu',
					message:
						"The ₦36,000 reimbursement will be credited within 3-5 business days. You'll receive an SMS confirmation.",
					time: '09:46 AM',
					isUser: false,
					avatar: getAvatarFallback('Adebayo Ogundimu'),
					hasAttachment: true,
					attachmentName: 'Claim_Approval_AO_123453.pdf'
				}
			],
			medicalHistory: [
				{ type: 'Dermatology claim - ₦45,000', date: '30 Nov 2024', time: '5:23 PM' },
				{ type: 'Lab tests claim - ₦25,000', date: '23 Nov 2024', time: '5:23 PM' },
				{ type: 'Consultation claim - ₦12,000', date: '18 Nov 2024', time: '5:23 PM' },
				{ type: 'Prescription claim - ₦8,500', date: '11 Nov 2024', time: '5:23 PM' },
				{ type: 'Annual checkup claim - ₦35,000', date: '4 Nov 2024', time: '5:23 PM' }
			]
		},
		{
			id: 2,
			name: 'Funmilayo Adebisi',
			role: 'HMO Benefits Coordinator',
			time: '09:30 AM',
			avatar:
				'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
			hasNotification: true,
			patientInfo: {
				id: 'HMO123454',
				dateOfBirth: '22/8/85',
				contact: '+234 805 123 4567',
				appointment: '1/5/25 10:00 AM',
				medications: 'Diabetes medication - ₦180,000 annual coverage'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Funmilayo Adebisi',
					message:
						'Good morning! Your HMO plan renewal is due next month. Your current coverage includes ₦2.5M annual limit.',
					time: '09:30 AM',
					isUser: false,
					avatar:
						'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face'
				},
				{
					id: 2,
					sender: 'You',
					message:
						'Hi Funmi, I want to upgrade my plan to include dental coverage. What are my options?',
					time: '09:32 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'Annual health screening - ₦35,000', date: '15 Dec 2024', time: '2:30 PM' },
				{ type: 'Blood work panel - ₦18,000', date: '10 Dec 2024', time: '9:00 AM' },
				{ type: 'Specialist consultation - ₦25,000', date: '5 Nov 2024', time: '3:15 PM' }
			]
		},
		{
			id: 3,
			name: 'Chinedu Okwu',
			role: 'Medical Claims Assessor',
			time: '08:45 AM',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
			hasNotification: false,
			patientInfo: {
				id: 'HMO123455',
				dateOfBirth: '14/3/78',
				contact: '+234 807 987 6543',
				appointment: '1/7/25 9:30 AM',
				medications: 'Cardiac medication - ₦95,000 quarterly coverage'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Chinedu Okwu',
					message:
						"Hello! I've reviewed your cardiac procedure claim for ₦450,000. Your insurance covers 90% for specialist treatments.",
					time: '08:30 AM',
					isUser: false,
					avatar:
						'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
				},
				{
					id: 2,
					sender: 'You',
					message: "That's great! When can I expect the ₦405,000 reimbursement?",
					time: '08:35 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'Cardiac procedure - ₦450,000', date: '20 Dec 2024', time: '10:00 AM' },
				{ type: 'ECG test - ₦15,000', date: '15 Dec 2024', time: '2:00 PM' },
				{ type: 'Stress test - ₦28,000', date: '1 Dec 2024', time: '8:30 AM' }
			]
		},
		{
			id: 4,
			name: 'Kemi Adeyemi',
			role: 'Family Health Insurance Advisor',
			time: '07:15 AM',
			avatar: getAvatarFallback('Kemi Adeyemi'),
			hasNotification: false,
			patientInfo: {
				id: 'HMO123456',
				dateOfBirth: '10/6/90',
				contact: '+234 809 234 5678',
				appointment: '1/8/25 11:30 AM',
				medications: 'Family plan coverage - ₦850,000 annual limit'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Kemi Adeyemi',
					message:
						"Hi! Your family's vaccination claims for this quarter total ₦45,000. All have been approved under your family plan.",
					time: '07:10 AM',
					isUser: false,
					avatar: getAvatarFallback('Kemi Adeyemi')
				},
				{
					id: 2,
					sender: 'You',
					message:
						"Great! Can you help me understand what's covered for my newborn's upcoming checkups?",
					time: '07:12 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'Child vaccination claims - ₦45,000', date: '5 Jan 2025', time: '11:30 AM' },
				{ type: 'Pediatric consultation - ₦20,000', date: '20 Dec 2024', time: '9:15 AM' },
				{ type: 'Family health screening - ₦85,000', date: '15 Nov 2024', time: '2:45 PM' }
			]
		},
		{
			id: 5,
			name: 'Olumide Babatunde',
			role: 'Surgical Claims Specialist',
			time: '06:45 AM',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
			hasNotification: true,
			patientInfo: {
				id: 'HMO123457',
				dateOfBirth: '5/12/65',
				contact: '+234 806 345 6789',
				appointment: '1/10/25 3:00 PM',
				medications: 'Post-surgery care - ₦1.2M surgery claim approved'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Olumide Babatunde',
					message:
						'Good morning! Your knee surgery claim for ₦1.2M has been fully approved. Post-operative care is also covered.',
					time: '06:40 AM',
					isUser: false,
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
				},
				{
					id: 2,
					sender: 'You',
					message: 'Thank you! When will the hospital receive the payment directly?',
					time: '06:43 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'Knee surgery claim - ₦1.2M', date: '2 Jan 2025', time: '3:00 PM' },
				{ type: 'Pre-surgery authorization', date: '15 Dec 2024', time: '8:00 AM' },
				{ type: 'Specialist referral claim - ₦35,000', date: '10 Dec 2024', time: '1:30 PM' }
			]
		},
		{
			id: 6,
			name: 'Ngozi Okafor',
			role: 'Mental Health Coverage Coordinator',
			time: '06:20 AM',
			avatar: getAvatarFallback('Ngozi Okafor'),
			hasNotification: false,
			patientInfo: {
				id: 'HMO123458',
				dateOfBirth: '18/9/82',
				contact: '+234 808 456 7890',
				appointment: '1/12/25 4:30 PM',
				medications: 'Mental health coverage - ₦300,000 annual therapy limit'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Ngozi Okafor',
					message:
						'Hello! Your therapy session claims for this month total ₦48,000. All sessions are covered under your mental health benefit.',
					time: '06:15 AM',
					isUser: false,
					avatar: getAvatarFallback('Ngozi Okafor')
				},
				{
					id: 2,
					sender: 'You',
					message: "That's great! Can I also claim for my prescribed medications?",
					time: '06:18 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'Therapy session claims - ₦48,000', date: '28 Dec 2024', time: '4:30 PM' },
				{ type: 'Mental health medication - ₦22,000', date: '20 Dec 2024', time: '2:00 PM' },
				{ type: 'Initial assessment claim - ₦15,000', date: '1 Dec 2024', time: '3:15 PM' }
			]
		},
		{
			id: 7,
			name: 'Emeka Nwosu',
			role: 'Diagnostic Claims Processor',
			time: '05:55 AM',
			avatar: getAvatarFallback('Emeka Nwosu'),
			hasNotification: true,
			patientInfo: {
				id: 'HMO123459',
				dateOfBirth: '25/4/70',
				contact: '+234 807 567 8901',
				appointment: '1/15/25 10:15 AM',
				medications: 'Neurological tests - ₦185,000 diagnostic coverage'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Emeka Nwosu',
					message:
						'Good news! Your MRI scan claim for ₦185,000 has been approved. The results show no structural issues.',
					time: '05:50 AM',
					isUser: false,
					avatar: getAvatarFallback('Emeka Nwosu')
				},
				{
					id: 2,
					sender: 'You',
					message: "That's a relief! Will my follow-up consultation also be covered?",
					time: '05:53 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'MRI scan claim - ₦185,000', date: '30 Dec 2024', time: '10:15 AM' },
				{ type: 'Neurological consultation - ₦35,000', date: '22 Dec 2024', time: '11:00 AM' },
				{ type: 'Brain scan authorization', date: '15 Dec 2024', time: '9:30 AM' }
			]
		},
		{
			id: 8,
			name: 'Folake Adebayo',
			role: 'Chronic Care Insurance Manager',
			time: '05:30 AM',
			avatar:
				'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
			hasNotification: false,
			patientInfo: {
				id: 'HMO123460',
				dateOfBirth: '8/11/88',
				contact: '+234 809 678 9012',
				appointment: '1/18/25 1:45 PM',
				medications: 'Diabetes management - ₦450,000 annual medication coverage'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Folake Adebayo',
					message:
						'Good morning! Your diabetes medication claims for this quarter total ₦125,000. All approved under your chronic care plan.',
					time: '05:25 AM',
					isUser: false,
					avatar:
						'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
				},
				{
					id: 2,
					sender: 'You',
					message:
						"That's wonderful! Can you help me understand my remaining coverage for this year?",
					time: '05:28 AM',
					isUser: true,
					avatar: getAvatarFallback('You')
				}
			],
			medicalHistory: [
				{ type: 'Diabetes medication claims - ₦125,000', date: '25 Dec 2024', time: '1:45 PM' },
				{ type: 'Endocrinologist consultation - ₦28,000', date: '18 Dec 2024', time: '10:30 AM' },
				{ type: 'Nutrition counseling claim - ₦15,000', date: '10 Dec 2024', time: '2:15 PM' }
			]
		},
		{
			id: 9,
			name: 'James Wilson',
			role: 'Poll Ophthalmologist',
			time: '05:10 AM',
			avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
			hasNotification: true,
			patientInfo: {
				id: '0123461',
				dateOfBirth: '14/7/75',
				contact: '(555) 789-0123',
				appointment: '1/20/25 9:00 AM',
				medications: 'Eye drops, Reading glasses'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'James Wilson',
					message:
						'Your eye exam results are in. Your vision has slightly changed, and we may need to update your prescription.',
					time: '05:05 AM',
					isUser: false,
					avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
				},
				{
					id: 2,
					sender: 'You',
					message: 'I have noticed some difficulty reading lately. Should I schedule a follow-up?',
					time: '05:08 AM',
					isUser: true,
					avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
				}
			],
			medicalHistory: [
				{ type: 'Eye examination', date: '22 Dec 2024', time: '9:00 AM' },
				{ type: 'Vision test', date: '15 Dec 2024', time: '11:30 AM' },
				{ type: 'Glaucoma screening', date: '8 Dec 2024', time: '3:00 PM' }
			]
		},
		{
			id: 10,
			name: 'Rachel Green',
			role: 'Poll Gynecologist',
			time: '04:45 AM',
			avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
			hasNotification: false,
			patientInfo: {
				id: '0123462',
				dateOfBirth: '3/2/92',
				contact: '(555) 890-1234',
				appointment: '1/22/25 2:30 PM',
				medications: 'Birth control, Folic acid'
			},
			chatMessages: [
				{
					id: 1,
					sender: 'Rachel Green',
					message:
						'Hi! Your annual screening results are normal. Everything looks healthy. Keep up the good work!',
					time: '04:40 AM',
					isUser: false,
					avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
				},
				{
					id: 2,
					sender: 'You',
					message: 'Thank you! When should I schedule my next appointment?',
					time: '04:43 AM',
					isUser: true,
					avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
				}
			],
			medicalHistory: [
				{ type: 'Annual screening', date: '20 Dec 2024', time: '2:30 PM' },
				{ type: 'Consultation', date: '12 Dec 2024', time: '4:00 PM' },
				{ type: 'Preventive care', date: '5 Dec 2024', time: '1:15 PM' }
			]
		}
	];

	return {
		contacts
	};
}
