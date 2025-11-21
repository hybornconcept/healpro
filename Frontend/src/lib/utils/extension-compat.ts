// Extension compatibility utilities to prevent message channel errors
import { browser } from '$app/environment';

/**
 * Setup extension compatibility to prevent message channel errors
 */
export function setupExtensionCompatibility() {
	if (!browser) return;

	// Handle Chrome extension runtime messages
	if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			// Always return false to indicate no async response
			// This prevents "message channel closed" errors
			return false;
		});
	}

	// Handle Firefox extension messages
	if (typeof browser !== 'undefined' && browser.runtime && browser.runtime.onMessage) {
		browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
			// Always return false to indicate no async response
			return false;
		});
	}

	// Suppress extension-related console errors
	const originalError = console.error;
	console.error = (...args) => {
		const message = args.join(' ');

		// Filter out extension-related errors and CSP errors
		if (
			message.includes('message channel closed') ||
			message.includes('runtime.lastError') ||
			message.includes('listener indicated an asynchronous response') ||
			message.includes('unsafe-eval') ||
			message.includes('Content Security Policy') ||
			message.includes('Cannot convert undefined or null to object')
		) {
			return; // Suppress these errors
		}

		// Log other errors normally
		originalError.apply(console, args);
	};

	// Add comprehensive null/undefined safety for Object methods
	const originalGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
	Object.getOwnPropertyDescriptors = function (obj) {
		if (obj == null || obj === undefined) {
			return {};
		}
		try {
			return originalGetOwnPropertyDescriptors.call(this, obj);
		} catch (e) {
			console.warn('getOwnPropertyDescriptors failed:', e);
			return {};
		}
	};

	// Also patch other Object methods that might fail
	const originalKeys = Object.keys;
	Object.keys = function (obj) {
		if (obj == null || obj === undefined) {
			return [];
		}
		try {
			return originalKeys.call(this, obj);
		} catch (e) {
			console.warn('Object.keys failed:', e);
			return [];
		}
	};

	const originalGetOwnPropertyNames = Object.getOwnPropertyNames;
	Object.getOwnPropertyNames = function (obj) {
		if (obj == null || obj === undefined) {
			return [];
		}
		try {
			return originalGetOwnPropertyNames.call(this, obj);
		} catch (e) {
			console.warn('getOwnPropertyNames failed:', e);
			return [];
		}
	};
}

/**
 * Clean message listener setup for components
 */
export function addSafeMessageListener(callback: (message: any) => void) {
	if (!browser) return () => {};

	const listener = (event: MessageEvent) => {
		// Only handle messages from same origin
		if (event.origin !== window.location.origin) return;

		callback(event.data);
	};

	window.addEventListener('message', listener);

	return () => {
		window.removeEventListener('message', listener);
	};
}
