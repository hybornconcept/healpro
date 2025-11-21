// Enhanced performance monitoring utility
import { browser } from '$app/environment';

interface PerformanceMetrics {
	fcp?: number; // First Contentful Paint
	lcp?: number; // Largest Contentful Paint
	fid?: number; // First Input Delay
	cls?: number; // Cumulative Layout Shift
	ttfb?: number; // Time to First Byte
	domContentLoaded?: number;
	loadComplete?: number;
	navigationStart?: number;
}

interface RouteMetrics {
	route: string;
	loadTime: number;
	timestamp: number;
	metrics: PerformanceMetrics;
}

class PerformanceMonitor {
	private metrics: PerformanceMetrics = {};
	private routeMetrics: RouteMetrics[] = [];
	private observer?: PerformanceObserver;
	private navigationStartTime = 0;

	constructor() {
		if (!browser) return;

		this.navigationStartTime = performance.now();
		this.setupObservers();
		this.measureCoreWebVitals();
	}

	private setupObservers() {
		if (!browser || !('PerformanceObserver' in window)) return;

		try {
			// Observe navigation and resource timing
			this.observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					this.processEntry(entry);
				}
			});

			// Observe different types of performance entries
			const entryTypes = ['navigation', 'resource', 'measure', 'paint'];
			entryTypes.forEach(type => {
				try {
					this.observer?.observe({ entryTypes: [type] });
				} catch (e) {
					// Some entry types might not be supported
				}
			});
		} catch (error) {
			console.warn('Performance observer setup failed:', error);
		}
	}

	private processEntry(entry: PerformanceEntry) {
		switch (entry.entryType) {
			case 'navigation':
				this.processNavigationEntry(entry as PerformanceNavigationTiming);
				break;
			case 'paint':
				this.processPaintEntry(entry as PerformancePaintTiming);
				break;
			case 'resource':
				this.processResourceEntry(entry as PerformanceResourceTiming);
				break;
		}
	}

	private processNavigationEntry(entry: PerformanceNavigationTiming) {
		this.metrics.ttfb = entry.responseStart - entry.requestStart;
		this.metrics.domContentLoaded = entry.domContentLoadedEventEnd - entry.navigationStart;
		this.metrics.loadComplete = entry.loadEventEnd - entry.navigationStart;
		this.metrics.navigationStart = entry.navigationStart;
	}

	private processPaintEntry(entry: PerformancePaintTiming) {
		if (entry.name === 'first-contentful-paint') {
			this.metrics.fcp = entry.startTime;
		}
	}

	private processResourceEntry(entry: PerformanceResourceTiming) {
		// Track slow resources
		const duration = entry.responseEnd - entry.requestStart;
		if (duration > 1000) { // Resources taking more than 1s
			console.warn(`Slow resource detected: ${entry.name} took ${duration.toFixed(2)}ms`);
		}
	}

	private measureCoreWebVitals() {
		if (!browser) return;

		// Measure LCP
		if ('PerformanceObserver' in window) {
			try {
				const lcpObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lastEntry = entries[entries.length - 1] as any;
					this.metrics.lcp = lastEntry.startTime;
				});
				lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
			} catch (e) {
				// LCP not supported
			}

			// Measure FID
			try {
				const fidObserver = new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						this.metrics.fid = (entry as any).processingStart - entry.startTime;
					}
				});
				fidObserver.observe({ entryTypes: ['first-input'] });
			} catch (e) {
				// FID not supported
			}

			// Measure CLS
			try {
				let clsValue = 0;
				const clsObserver = new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						if (!(entry as any).hadRecentInput) {
							clsValue += (entry as any).value;
						}
					}
					this.metrics.cls = clsValue;
				});
				clsObserver.observe({ entryTypes: ['layout-shift'] });
			} catch (e) {
				// CLS not supported
			}
		}
	}

	/**
	 * Record route navigation metrics
	 */
	recordRouteNavigation(route: string) {
		if (!browser) return;

		const loadTime = performance.now() - this.navigationStartTime;
		
		const routeMetric: RouteMetrics = {
			route,
			loadTime,
			timestamp: Date.now(),
			metrics: { ...this.metrics }
		};

		this.routeMetrics.push(routeMetric);

		// Keep only last 50 route metrics
		if (this.routeMetrics.length > 50) {
			this.routeMetrics = this.routeMetrics.slice(-50);
		}

		// Reset navigation start time for next navigation
		this.navigationStartTime = performance.now();
	}

	/**
	 * Get current performance metrics
	 */
	getMetrics(): PerformanceMetrics {
		return { ...this.metrics };
	}

	/**
	 * Get route performance history
	 */
	getRouteMetrics(): RouteMetrics[] {
		return [...this.routeMetrics];
	}

	/**
	 * Report performance metrics to console (development)
	 */
	reportMetrics() {
		if (!browser || import.meta.env.PROD) return;

		console.group('🚀 Performance Metrics');
		
		if (this.metrics.fcp) {
			console.log(`First Contentful Paint: ${this.metrics.fcp.toFixed(2)}ms`);
		}
		if (this.metrics.lcp) {
			console.log(`Largest Contentful Paint: ${this.metrics.lcp.toFixed(2)}ms`);
		}
		if (this.metrics.fid) {
			console.log(`First Input Delay: ${this.metrics.fid.toFixed(2)}ms`);
		}
		if (this.metrics.cls) {
			console.log(`Cumulative Layout Shift: ${this.metrics.cls.toFixed(4)}`);
		}
		if (this.metrics.ttfb) {
			console.log(`Time to First Byte: ${this.metrics.ttfb.toFixed(2)}ms`);
		}
		if (this.metrics.domContentLoaded) {
			console.log(`DOM Content Loaded: ${this.metrics.domContentLoaded.toFixed(2)}ms`);
		}
		if (this.metrics.loadComplete) {
			console.log(`Load Complete: ${this.metrics.loadComplete.toFixed(2)}ms`);
		}

		// Report recent route metrics
		if (this.routeMetrics.length > 0) {
			console.log('\n📊 Recent Route Performance:');
			this.routeMetrics.slice(-5).forEach(metric => {
				console.log(`${metric.route}: ${metric.loadTime.toFixed(2)}ms`);
			});
		}

		console.groupEnd();
	}

	/**
	 * Get performance score (0-100)
	 */
	getPerformanceScore(): number {
		let score = 100;

		// Deduct points based on Core Web Vitals
		if (this.metrics.fcp && this.metrics.fcp > 1800) score -= 20;
		if (this.metrics.lcp && this.metrics.lcp > 2500) score -= 25;
		if (this.metrics.fid && this.metrics.fid > 100) score -= 20;
		if (this.metrics.cls && this.metrics.cls > 0.1) score -= 15;
		if (this.metrics.ttfb && this.metrics.ttfb > 600) score -= 10;
		if (this.metrics.loadComplete && this.metrics.loadComplete > 3000) score -= 10;

		return Math.max(0, score);
	}

	/**
	 * Cleanup observers
	 */
	cleanup() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}
}

// Singleton instance
export const performanceMonitor = browser ? new PerformanceMonitor() : null;

/**
 * Mark performance timing
 */
export function markTiming(name: string) {
	if (browser && 'performance' in window) {
		performance.mark(name);
	}
}

/**
	 * Measure performance between two marks
	 */
export function measureTiming(name: string, startMark: string, endMark?: string) {
	if (browser && 'performance' in window) {
		try {
			if (endMark) {
				performance.measure(name, startMark, endMark);
			} else {
				performance.measure(name, startMark);
			}
		} catch (error) {
			console.warn(`Failed to measure timing ${name}:`, error);
		}
	}
}

/**
 * Get resource loading performance
 */
export function getResourceMetrics(): PerformanceResourceTiming[] {
	if (!browser || !('performance' in window)) return [];
	
	return performance.getEntriesByType('resource') as PerformanceResourceTiming[];
}
