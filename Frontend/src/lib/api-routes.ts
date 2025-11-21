export const API_ROUTES = {
	AUTH: {
		LOGIN: '/api/auth/sign-in/email',
		REGISTER: '/api/auth/sign-up/email',
		LOGOUT: '/api/auth/sign-out',
		ME: '/api/auth/session',
		GET_SESSION: '/api/auth/session'
	},
	FACILITIES: {
		GET_ALL: '/facilities'
	},
	CLIENTS: {
		GET_ALL: '/clients'
	},
	HMO: {
		STATS: '/hmo/stats',
		CREATE: '/api/hmos'
	},
	PATIENTS: {
		CREATE: '/api/patient',
		UPLOAD_ID: (id: string) => `/api/patient/${id}/upload-id`
	},
	HOSPITALS: {
		CREATE: '/api/hospitals'
	}
};
