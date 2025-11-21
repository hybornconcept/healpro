<script lang="ts">
	import { Send } from '@lucide/svelte';
	import AnimatedButton from './AnimatedButton.svelte';

	const features = [
		{
			icon: `<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
			title: 'Healthcare Connection Hub',
			desc: 'Digital platform bridging gaps between HMOs, corporate subscribers, and everyday users',
			fullDesc:
				'A digital platform designed to bridge the gap between Health Maintenance Organizations (HMOs), corporate subscribers, and everyday users. We simplify healthcare access by creating one convenient space where all stakeholders connect, communicate, and collaborate effortlessly.',
			link: '#'
		},
		{
			icon: `<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>`,
			title: 'Information at Your Fingertips',
			desc: 'Instant access to vital HMO insights anytime, anywhere with comprehensive healthcare information',
			fullDesc:
				'Instant access to vital HMO insights—anytime, anywhere. Healpro makes comprehensive healthcare information just a click away. Explore detailed HMO packages, available facilities and services, and direct contact information for key stakeholders—all in one place. No more guesswork, just streamlined clarity and control.',
			link: '#'
		},
		{
			icon: `<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
			title: 'Smarter Scheduling',
			desc: 'Intuitive appointment scheduling for users and healthcare providers with streamlined time management',
			fullDesc:
				"With Healpro's intuitive appointment scheduling, both users and healthcare providers can effortlessly set up visits that work on their terms. Say goodbye to long waits and missed connections—hello to streamlined time management and better care coordination.",
			link: '#'
		},
		{
			icon: `<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>`,
			title: 'Claims Assistant',
			desc: 'Submit claims requests with few clicks and track responses in real time',
			fullDesc:
				'With Healpro Claims Assistant, users and healthcare providers can submit claims requests with just a few clicks—and track responses in real time. Say goodbye to frustrating phone calls and wasted hours, and hello to a transparent, cost-saving claims process that puts you in control.',
			link: '#'
		},
		{
			icon: `<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
			title: 'Beyond Healthcare',
			desc: 'Connecting users to essential non-health services that enhance overall well-being',
			fullDesc:
				"Healpro goes the extra mile by connecting users to essential non-health services that enhance overall well-being—like gym memberships, wellness programs, and more—offered through their HMO. It's not just about treatment; it's about total health empowerment.",
			link: '#'
		},
		{
			icon: `<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="9"/><rect x="14" y="7" width="3" height="5"/></svg>`,
			title: 'Performance at a Glance',
			desc: 'Intuitive dashboard empowers HMOs with tools to monitor key performance metrics',
			fullDesc:
				"Healpro's intuitive Efficiency Dashboard empowers HMOs with the tools to monitor key performance metrics in real time. Identify gaps, track progress, and optimize service delivery—all from a single intelligent interface designed to elevate system-wide performance.",
			link: '#'
		}
	];
</script>

<div
	id="features"
	class="mx-auto flex w-full max-w-7xl flex-col bg-white px-2 py-12 md:flex-row md:px-8"
>
	<!-- Left: Heading and CTA -->
	<div class="mb-10 flex flex-col items-start justify-center md:mb-0 md:w-1/3 md:pr-8">
		<h2 class="mb-3 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
			Our Features<br />Special For You
		</h2>
		<p class="mt-2 mb-8 text-base text-gray-500">
			From health to home, we've got you covered affordable plan with complete protection your
			safety our commitment
		</p>
		<AnimatedButton
			title="Book Appointment"
			rounded="lg"
			icon={Send}
			href="/schedule"
			width="w-[70%]"
		/>
	</div>

	<!-- Right: Features Grid -->
	<div class="my-10 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:w-2/3 lg:grid-cols-3">
		{#each features as feature, i}
			<div class="relative flex flex-col items-start px-6">
				<!-- Vertical divider (except first col in each row) -->
				{#if i % 3 !== 0}
					<div class="absolute top-0 left-0 h-full w-px bg-blue-100"></div>
				{/if}
				{@html feature.icon}
				<h3 class="mt-5 text-lg font-semibold text-gray-900">{feature.title}</h3>
				<p class="mt-2 text-sm text-gray-500">{feature.desc}</p>
				<a
					href={feature.link}
					class="mt-4 flex items-center text-sm font-medium text-blue-600 hover:underline"
				>
					<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
						><path
							d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-10 10a1 1 0 01-.707.293H3a1 1 0 01-1-1v-4a1 1 0 01.293-.707l10-10zM5 17h2v-2H5v2z"
						></path></svg
					>
					Learn more
				</a>
			</div>
		{/each}
	</div>
</div>
