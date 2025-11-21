<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { Mail, Eye, EyeOff } from '@lucide/svelte';
	import { login } from '$lib/api';

	// Svelte 5 runes for local reactive state
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let isSubmitting = $state(false);
	let error = $state('');

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	async function handleLogin() {
		if (isSubmitting) return;
		error = '';
		isSubmitting = true;
		try {
			await login(email, password);
			// Refresh server-side data if any, then navigate home
			try {
				await invalidateAll();
			} catch {
				// ignore
			}
			goto('/');
		} catch (err: any) {
			error = err?.body?.error || 'Login failed';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[#f1f5f9]">
	<div class="flex w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-md">
		<!-- Left: Login Form -->
		<div class="flex w-2/5 flex-col justify-between p-8">
			<div>
				<div class="mb-8 flex items-center justify-between">
					<h1 class=" border-blue-300 p-2 text-xl font-bold">
						Heal<span class="text-blue-500">Pro.</span>
					</h1>
				</div>

				<h2 class="mb-4 text-center text-2xl font-light">Welcome!</h2>
				<p class="mb-6 text-center text-xs text-gray-600">
					To connect to your account, please enter your email address and password.
				</p>

				<form class="space-y-4" on:submit|preventDefault={handleLogin}>
					<!-- Email input with mail icon -->
					<div class="relative">
						<Input
							type="email"
							placeholder="Your email address"
							bind:value={email}
							class="w-full rounded-md bg-gray-50 px-3 py-2 pr-10 text-sm"
							disabled={isSubmitting}
						/>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
						>
							{#if Mail}
								<Mail class="h-4 w-4" />
							{:else}
								<div class="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
							{/if}
						</div>
					</div>

					<!-- Password input with eye/eye-off toggle -->
					<div class="relative">
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Your password"
							bind:value={password}
							class="w-full rounded-md bg-gray-50 px-3 py-2 pr-10 text-sm"
							disabled={isSubmitting}
						/>
						<button
							type="button"
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
							on:click={togglePasswordVisibility}
							tabindex="-1"
							disabled={isSubmitting}
						>
							{#if Eye && EyeOff}
								{#if showPassword}
									<Eye class="h-4 w-4" />
								{:else}
									<EyeOff class="h-4 w-4" />
								{/if}
							{:else}
								<div class="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
							{/if}
						</button>
					</div>

					<div class="text-left">
						<a href="/forgot-password" class="text-xs text-blue-500 hover:underline"
							>Forgot password?</a
						>
					</div>

					<!-- Login button -->
					<Button
						type="submit"
						class="w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<div class="flex items-center justify-center gap-2">
								<div
									class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></div>
								Signing in...
							</div>
						{:else}
							Login
						{/if}
					</Button>
				</form>

				{#if error}
					<div class="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
				{/if}

				<div class="mt-6 text-center text-xs">
					<p class="text-gray-600">Don't hesitate to contact us</p>
					<a href="mailto:support@healpro.com" class="text-blue-500 hover:underline"
						>support@healpro.com</a
					>
				</div>
			</div>
		</div>

		<!-- Right: Image and Overlay -->
		<div class="relative w-3/5 overflow-hidden rounded-r-3xl bg-gray-100">
			<img src="steth.jpg" alt="Plant in wooden pot" class="h-full w-full object-cover" />
			<div class="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
			<div
				class="absolute top-1/2 left-1/2 w-[70%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/20 p-6 backdrop-blur-sm"
			>
				<div class="justify-left mb-4 flex">
					<div
						class="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"
					></div>
				</div>
				<h3 class="mb-4 text-sm text-white">
					Without health insurance, getting sick or injured could mean going bankrupt, going without
					needed care, or even dying needlessly.
				</h3>
				<p class="text-xs leading-relaxed text-white/90">- Jan Schakowsky</p>
			</div>
		</div>
	</div>
</div>
