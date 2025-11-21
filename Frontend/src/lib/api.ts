export type User = { id: string; email: string; name?: string | null };

import { BACKEND_URL } from './config';
import { API_ROUTES } from './api-routes';

async function request<T>(path: string, opts: RequestInit = {}) {
	const res = await fetch(`${BACKEND_URL}${path}`, {
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		...opts
	});
	const text = await res.text();
	let body: any = null;
	try {
		body = text ? JSON.parse(text) : null;
	} catch {
		body = text;
	}
	if (!res.ok) throw { status: res.status, body };
	return body as T;
}

export function login(email: string, password: string) {
	return request<User>(API_ROUTES.AUTH.LOGIN, {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});
}

export function register(email: string, password: string, name?: string) {
	return request<User>(API_ROUTES.AUTH.REGISTER, {
		method: 'POST',
		body: JSON.stringify({ email, password, name })
	});
}

export function logout() {
	return request<{ ok: boolean }>(API_ROUTES.AUTH.LOGOUT, { method: 'POST' });
}

export function me() {
	return request<User>(API_ROUTES.AUTH.ME, { method: 'GET' });
}

export async function createPatient(patientData: any) {
	return request(API_ROUTES.PATIENTS.CREATE, {
		method: 'POST',
		body: JSON.stringify(patientData)
	});
}

export async function createHospital(hospitalData: any) {
	return request(API_ROUTES.HOSPITALS.CREATE, {
		method: 'POST',
		body: JSON.stringify(hospitalData)
	});
}

export async function createHMO(hmoData: any) {
	return request(API_ROUTES.HMO.CREATE, {
		method: 'POST',
		body: JSON.stringify(hmoData)
	});
}

export async function uploadPatientId(patientId: string, file: File) {
	const formData = new FormData();
	formData.append('file', file);

	const res = await fetch(`${BACKEND_URL}${API_ROUTES.PATIENTS.UPLOAD_ID(patientId)}`, {
		method: 'POST',
		body: formData
		// Content-Type header is automatically set with boundary for FormData
	});

	if (!res.ok) {
		const text = await res.text();
		throw { status: res.status, body: text };
	}
	return res.json();
}
