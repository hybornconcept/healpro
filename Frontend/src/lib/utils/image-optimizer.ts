// Image optimization utilities for better performance
import { browser } from '$app/environment';

interface ImageOptimizationOptions {
	quality?: number;
	format?: 'webp' | 'avif' | 'jpeg' | 'png';
	width?: number;
	height?: number;
	lazy?: boolean;
	priority?: boolean;
}

/**
 * Generate optimized image URL with modern formats and sizing
 */
export function optimizeImageUrl(src: string, options: ImageOptimizationOptions = {}): string {
	if (!src) return '';

	const { quality = 80, format = 'webp', width, height, lazy = true, priority = false } = options;

	// For external URLs (like Unsplash), use their optimization parameters
	if (src.includes('unsplash.com')) {
		const url = new URL(src);

		// Add Unsplash optimization parameters
		if (width) url.searchParams.set('w', width.toString());
		if (height) url.searchParams.set('h', height.toString());
		url.searchParams.set('q', quality.toString());
		url.searchParams.set('fm', format);
		url.searchParams.set('fit', 'crop');
		url.searchParams.set('crop', 'face');

		return url.toString();
	}

	// For other external URLs, return as-is (could be enhanced with a proxy service)
	if (src.startsWith('http')) {
		return src;
	}

	// For local images, add optimization parameters
	const url = new URL(src, window.location.origin);
	if (width) url.searchParams.set('w', width.toString());
	if (height) url.searchParams.set('h', height.toString());
	url.searchParams.set('q', quality.toString());
	url.searchParams.set('f', format);

	return url.toString();
}

/**
 * Create responsive image srcset
 */
export function createSrcSet(
	src: string,
	widths: number[] = [320, 640, 768, 1024, 1280, 1536],
	options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
	if (!src) return '';

	return widths
		.map((width) => {
			const optimizedUrl = optimizeImageUrl(src, { ...options, width });
			return `${optimizedUrl} ${width}w`;
		})
		.join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: Record<string, string> = {}): string {
	const defaultBreakpoints = {
		'(max-width: 640px)': '100vw',
		'(max-width: 768px)': '50vw',
		'(max-width: 1024px)': '33vw',
		...breakpoints
	};

	const sizes = Object.entries(defaultBreakpoints)
		.map(([query, size]) => `${query} ${size}`)
		.join(', ');

	return `${sizes}, 25vw`;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, options: ImageOptimizationOptions = {}) {
	if (!browser) return;

	const link = document.createElement('link');
	link.rel = 'preload';
	link.as = 'image';
	link.href = optimizeImageUrl(src, options);

	if (options.priority) {
		link.fetchPriority = 'high';
	}

	document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyLoading() {
	if (!browser || !('IntersectionObserver' in window)) return;

	const imageObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target as HTMLImageElement;

					// Load the actual image
					if (img.dataset.src) {
						img.src = img.dataset.src;
						img.removeAttribute('data-src');
					}

					if (img.dataset.srcset) {
						img.srcset = img.dataset.srcset;
						img.removeAttribute('data-srcset');
					}

					// Remove loading class and add loaded class
					img.classList.remove('lazy-loading');
					img.classList.add('lazy-loaded');

					// Stop observing this image
					imageObserver.unobserve(img);
				}
			});
		},
		{
			rootMargin: '50px 0px',
			threshold: 0.01
		}
	);

	// Observe all lazy images
	document.querySelectorAll('img[data-src]').forEach((img) => {
		img.classList.add('lazy-loading');
		imageObserver.observe(img);
	});

	return imageObserver;
}

/**
 * Check if WebP is supported
 */
export function supportsWebP(): Promise<boolean> {
	if (!browser) return Promise.resolve(false);

	return new Promise((resolve) => {
		const webP = new Image();
		webP.onload = webP.onerror = () => {
			resolve(webP.height === 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	});
}

/**
 * Check if AVIF is supported
 */
export function supportsAVIF(): Promise<boolean> {
	if (!browser) return Promise.resolve(false);

	return new Promise((resolve) => {
		const avif = new Image();
		avif.onload = avif.onerror = () => {
			resolve(avif.height === 2);
		};
		avif.src =
			'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
	});
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalFormat(): Promise<'avif' | 'webp' | 'jpeg'> {
	if (await supportsAVIF()) return 'avif';
	if (await supportsWebP()) return 'webp';
	return 'jpeg';
}

/**
 * Svelte action for optimized images
 */
export function optimizedImage(
	img: HTMLImageElement,
	options: ImageOptimizationOptions & { src: string }
) {
	const { src, ...opts } = options;

	// Set up lazy loading attributes
	if (opts.lazy !== false) {
		img.dataset.src = optimizeImageUrl(src, opts);
		img.src =
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
		img.classList.add('lazy-loading');
	} else {
		img.src = optimizeImageUrl(src, opts);
	}

	// Set up responsive attributes
	if (opts.width && opts.height) {
		img.width = opts.width;
		img.height = opts.height;
	}

	// Add loading attribute
	img.loading = opts.lazy !== false ? 'lazy' : 'eager';

	// Add decoding attribute for better performance
	img.decoding = opts.priority ? 'sync' : 'async';

	return {
		update(newOptions: ImageOptimizationOptions & { src: string }) {
			const { src: newSrc, ...newOpts } = newOptions;

			if (newOpts.lazy !== false) {
				img.dataset.src = optimizeImageUrl(newSrc, newOpts);
			} else {
				img.src = optimizeImageUrl(newSrc, newOpts);
			}
		},
		destroy() {
			// Cleanup if needed
		}
	};
}

/**
 * Preload critical images for the application
 */
export function preloadCriticalImages() {
	if (!browser) return;

	const criticalImages = ['/heroimage.png', '/steth.jpg'];

	criticalImages.forEach((src) => {
		preloadImage(src, { priority: true, format: 'webp', quality: 85 });
	});
}
