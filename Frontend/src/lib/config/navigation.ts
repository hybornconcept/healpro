export interface NavItem {
	title: string;
	url: string;
	icon: string; // Store icon name as string for lazy loading
}

// SVG icon paths
const iconPaths: Record<string, string> = {
	LayoutDashboard: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
	Building2: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12h4M6 16h4M6 8h4M14 8h4M14 12h4M14 16h4',
	Users:
		'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
	Receipt:
		'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1ZM16 8h-6M16 12h-6M16 16h-6',
	Home: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
	Stethoscope:
		'M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4',
	Calendar:
		'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
	BarChart3: 'M3 3v18h18M7 16l4-4 4 4 6-6M7 21V9M12 21v-7M17 21v-3',
	MessageSquare: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
	FileText:
		'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8',
	User: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
	MessageCircleCode:
		'M10 9H8M16 9h-2M12 13h.01M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
	BriefcaseBusiness:
		'M12 12h.01M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M22 13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5z'
};

// Get icon SVG path
export function getIconPath(iconName: string): string {
	return iconPaths[iconName] || iconPaths.Home;
}

// Get icon component (alias for getIconPath for compatibility)
export function getIcon(iconName: string): string {
	return getIconPath(iconName);
}

// HMO Navigation Configuration
export const hmoNavItems: NavItem[] = [
	{
		title: 'Home',
		url: '/hmo',
		icon: 'Home'
	},
	{
		title: 'Clients',
		url: '/hmo/clients',
		icon: 'Users'
	},
	{
		title: 'Facility',
		url: '/hmo/facility',
		icon: 'Building2'
	},
	{
		title: 'Invoice',
		url: '/hmo/invoice',
		icon: 'Receipt'
	},
	{
		title: 'Dashboard',
		url: '/hmo/dashboard',
		icon: 'LayoutDashboard'
	}
];

// Facility Navigation Configuration
export const facilityNavItems: NavItem[] = [
	{
		title: 'Appointments',
		url: '/facility',
		icon: 'Calendar'
	},
	{
		title: 'Clinic',
		url: '/facility/clinic',
		icon: 'Stethoscope'
	},
	{
		title: 'Invoice',
		url: '/facility/invoice',
		icon: 'Receipt'
	},
	{
		title: 'Analytics',
		url: '/facility/analytics',
		icon: 'BarChart3'
	},
	{
		title: 'Message',
		url: '/facility/message',
		icon: 'MessageSquare'
	}
];

// User Navigation Configuration
export const userNavItems: NavItem[] = [
	{
		title: 'Overview',
		url: '/user',
		icon: 'Home'
	},
	{
		title: 'Claims',
		url: '/user/claims',
		icon: 'User'
	},
	{
		title: 'Reports',
		url: '/user/reports',
		icon: 'FileText'
	},
	{
		title: 'Services',
		url: '/user/services',
		icon: 'BriefcaseBusiness'
	},
	{
		title: 'Policies',
		url: '/user/policies',
		icon: 'Users'
	},
	{
		title: 'Messaging',
		url: '/user/message',
		icon: 'MessageCircleCode'
	}
];

// Helper function to get page title based on route
export function getPageTitle(pathname: string, section: 'hmo' | 'facility' | 'user'): string {
	if (section === 'hmo') {
		if (pathname === '/hmo') return 'Home';
		if (pathname === '/hmo/clients') return 'Clients';
		if (pathname === '/hmo/facility') return 'Facility';
		if (pathname === '/hmo/invoice') return 'Invoice';
		if (pathname === '/hmo/reports') return 'Reports';
		if (pathname === '/hmo/dashboard') return 'Dashboard';
		return 'HMO Dashboard';
	} else if (section === 'facility') {
		if (pathname === '/facility') return 'Home';
		if (pathname === '/facility/appointments') return 'Appointments';
		if (pathname === '/facility/clinic') return 'Clinic';
		if (pathname === '/facility/invoice') return 'Invoice';
		if (pathname === '/facility/analytics') return 'Analytics';
		if (pathname === '/facility/message') return 'Message';
		return 'Facility Dashboard';
	} else {
		// User section
		if (pathname === '/user') return 'Overview';
		if (pathname === '/user/claims') return 'Claims';
		if (pathname === '/user/reports') return 'Reports';
		if (pathname === '/user/services') return 'Services & Benefits';
		if (pathname === '/user/policies') return 'Policies';
		return 'User Dashboard';
	}
}
