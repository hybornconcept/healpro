// Route preloader utility for faster navigation
import { browser } from '$app/environment';

interface PreloadOptions {
	priority?: 'high' | 'low';
	delay?: number;
}

class RoutePreloader {
	private preloadedRoutes = new Set<string>();
	private preloadPromises = new Map<string, Promise<any>>();

	/**
	 * Preload a route's data and components
	 */
	async preloadRoute(route: string, options: PreloadOptions = {}) {
		if (!browser || this.preloadedRoutes.has(route)) {
			return;
		}

		const { priority = 'low', delay = 0 } = options;

		// Add delay for low priority preloads
		if (delay > 0) {
			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		try {
			// Use different strategies based on priority
			if (priority === 'high') {
				await this.immediatePreload(route);
			} else {
				await this.idlePreload(route);
			}

			this.preloadedRoutes.add(route);
		} catch (error) {
			console.warn(`Failed to preload route ${route}:`, error);
		}
	}

	/**
	 * Immediate preload for high priority routes
	 */
	private async immediatePreload(route: string) {
		if (this.preloadPromises.has(route)) {
			return this.preloadPromises.get(route);
		}

		const promise = import(/* @vite-ignore */ route);
		this.preloadPromises.set(route, promise);
		return promise;
	}

	/**
	 * Idle preload for low priority routes
	 */
	private async idlePreload(route: string) {
		return new Promise((resolve, reject) => {
			if ('requestIdleCallback' in window) {
				requestIdleCallback(async () => {
					try {
						const result = await this.immediatePreload(route);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				});
			} else {
				// Fallback for browsers without requestIdleCallback
				setTimeout(async () => {
					try {
						const result = await this.immediatePreload(route);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				}, 100);
			}
		});
	}

	/**
	 * Preload multiple routes
	 */
	async preloadRoutes(routes: Array<{ route: string; options?: PreloadOptions }>) {
		const promises = routes.map(({ route, options }) => this.preloadRoute(route, options));

		await Promise.allSettled(promises);
	}

	/**
	 * Check if route is preloaded
	 */
	isPreloaded(route: string): boolean {
		return this.preloadedRoutes.has(route);
	}

	/**
	 * Clear preload cache
	 */
	clearCache() {
		this.preloadedRoutes.clear();
		this.preloadPromises.clear();
	}
}

// Singleton instance
export const routePreloader = new RoutePreloader();

/**
 * Preload critical routes for HMO and Facility sections
 */
export function preloadCriticalRoutes() {
	if (!browser) return;

	// Preload high-priority routes immediately
	routePreloader.preloadRoutes([
		{ route: '/hmo', options: { priority: 'high' } },
		{ route: '/facility', options: { priority: 'high' } },
		{ route: '/hmo/facility', options: { priority: 'high' } },
		{ route: '/hmo/clients', options: { priority: 'low', delay: 500 } },
		{ route: '/hmo/invoice', options: { priority: 'low', delay: 750 } },
		{ route: '/facility', options: { priority: 'low', delay: 1000 } }
	]);
}

/**
 * Preload components based on user interaction
 */
export function preloadOnHover(element: HTMLElement, route: string) {
	if (!browser) return;

	let timeoutId: number;

	const handleMouseEnter = () => {
		timeoutId = window.setTimeout(() => {
			routePreloader.preloadRoute(route, { priority: 'high' });
		}, 100); // Small delay to avoid unnecessary preloads
	};

	const handleMouseLeave = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	};

	element.addEventListener('mouseenter', handleMouseEnter);
	element.addEventListener('mouseleave', handleMouseLeave);

	// Cleanup function
	return () => {
		element.removeEventListener('mouseenter', handleMouseEnter);
		element.removeEventListener('mouseleave', handleMouseLeave);
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	};
}
