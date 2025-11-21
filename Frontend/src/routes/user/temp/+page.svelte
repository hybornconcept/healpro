<script lang="ts">
	import InteractiveAreaChart from '$lib/components/InteractiveAreaChart.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		ArrowRight,
		Settings,
		TrendingUp,
		TrendingDown,
		AlertCircle,
		Activity,
		Users,
		FileText,
		CheckCircle,
		Clock,
		Search,
		Tag,
		CheckCircle2,
		User,
		Filter,
		Share2
	} from '@lucide/svelte';
	import PayableDonutChart from '$lib/components/PayableDonutChart.svelte';
	import RadarCharts from '$lib/components/RadarCharts.svelte';

	let { data }: { data: PageData } = $props();

	let transferAmount = $state('50000');
	let cardLimit = $state('');

	// Pagination state
	let currentPage = $state(1);
	const itemsPerPage = 7;

	// Calculate pagination
	const totalPages = $derived(Math.ceil(data.healthcareMetrics.length / itemsPerPage));
	const paginatedMetrics = $derived(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return data.healthcareMetrics.slice(startIndex, endIndex);
	});

	function handleClaimApproval() {
		console.log('Process claim approval:', transferAmount);
	}

	function handleClaimReview() {
		console.log('Review claim with limit:', cardLimit);
	}

	function goToPage(page: number) {
		currentPage = page;
	}

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}
</script>

<div class="min-h-screen p-6">
	<!-- Search and Filter Bar -->
	<div class="justify-betweeng mb-6 flex items-center p-4">
		<div class="flex items-center gap-4">
			<div class="relative">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<Input placeholder="Search" class="w-64 pl-10" />
			</div>
			<div class="flex items-center gap-2">
				<Button variant="outline" size="sm" class="gap-2">
					<Tag class="h-4 w-4" />
					Type
					<ArrowRight class="h-4 w-4 rotate-90" />
				</Button>
				<Button variant="outline" size="sm" class="gap-2">
					<CheckCircle2 class="h-4 w-4" />
					Status
					<ArrowRight class="h-4 w-4 rotate-90" />
				</Button>
				<Button variant="outline" size="sm" class="gap-2">
					<User class="h-4 w-4" />
					Role
					<ArrowRight class="h-4 w-4 rotate-90" />
				</Button>
				<Button variant="outline" size="sm" class="gap-2">
					<Filter class="h-4 w-4" />
					Advance Filter
					<ArrowRight class="h-4 w-4 rotate-90" />
				</Button>
			</div>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="sm" class="gap-2">
				<Share2 class="h-4 w-4" />
				Transfer
			</Button>
		</div>
	</div>

	<!-- Top Stats -->
	<div class="mb-8">
		<Card.Root class="bg-white/95 backdrop-blur-sm">
			<Card.Content class="px-6 py-0">
				<div class="flex justify-between">
					{#each data.stats as stat, i}
						<div class="text-center">
							<div class="text-xs font-medium text-black/70">{stat.label}</div>
							<div class="flex items-baseline justify-center gap-1">
								<span class="text-2xl font-bold text-black">{stat.value}</span>
								<span class="text-sm text-black/70">{stat.sub}</span>
							</div>
							<div class="flex items-center justify-center gap-1 text-xs">
								{#if stat.positive}
									<TrendingUp class="h-3 w-3 text-green-600" />
								{:else}
									<TrendingDown class="h-3 w-3 text-red-600" />
								{/if}
								<span class="text-black/70">{stat.change}</span>
							</div>
						</div>
						{#if i < data.stats.length - 1}
							<div class="h-12 border-l border-gray-300"></div>
						{/if}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="mb-6 grid grid-cols-3 gap-6">
		<!-- Telemedicine vs In-Person Chart -->
		<div class="col-span-2">
			<InteractiveAreaChart
				data={data.telemedicineData}
				title="Healthcare Visit Types"
				description="Telemedicine vs In-Person visits over time"
				footerText="Showing visit patterns for the last month"
				trendText="Telemedicine usage up by 12.3% this month"
			/>
		</div>

		<!-- Provider Network Usage -->

		<RadarCharts
			data={data.radarChartData}
			title="Health Metrics Performance"
			description="Current performance vs targets across key health areas"
			footerText="Based on last 6 months of healthcare data"
			trendText="Overall health score improving by 8.3% this quarter"
		/>
	</div>

	<!-- Healthcare Metrics Table -->
	<div class="mt-6">
		<Card.Root class="bg-white/95 backdrop-blur-sm">
			<Card.Header class="flex flex-row items-center justify-between">
				<Card.Title>My Health Metrics</Card.Title>
				<div class="flex items-center gap-2">
					<Input placeholder="Search Metrics" class="w-48" />
					<Button variant="outline" size="sm">All Categories</Button>
					<Button variant="outline" size="sm">All Status</Button>
					<Button variant="outline" size="sm">Export Report</Button>
				</div>
			</Card.Header>
			<Card.Content class="p-0">
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="border-b bg-gray-50/50">
							<tr class="text-left text-sm text-gray-600">
								<th class="px-4 py-3 font-medium">Category</th>
								<th class="px-4 py-3 font-medium">Health Metric</th>
								<th class="px-4 py-3 font-medium">Current Value</th>
								<th class="px-4 py-3 font-medium">Coverage</th>
								<th class="px-4 py-3 font-medium">Target</th>
								<th class="px-4 py-3 font-medium">Status</th>
								<th class="px-4 py-3 font-medium">Next Due</th>
							</tr>
						</thead>
						<tbody>
							{#each paginatedMetrics() as metric}
								<tr class="border-b hover:bg-gray-50/50">
									<td class="px-4 py-3">
										<span class="text-sm font-medium">{metric.category}</span>
									</td>
									<td class="px-4 py-3 text-sm font-medium">{metric.metric}</td>
									<td class="px-4 py-3 text-sm">{metric.currentValue}</td>
									<td class="px-4 py-3">
										<div class="space-y-1">
											<div class="text-xs text-gray-600">{metric.coverage.text}</div>
											<div class="h-2 w-full rounded-full bg-gray-200">
												<div
													class="h-2 rounded-full transition-all duration-300
													{metric.coverage.percentage >= 80
														? 'bg-green-500'
														: metric.coverage.percentage >= 60
															? 'bg-yellow-500'
															: metric.coverage.percentage >= 40
																? 'bg-orange-500'
																: 'bg-red-500'}"
													style="width: {metric.coverage.percentage}%"
												></div>
											</div>
											<div class="text-xs text-gray-500">{metric.coverage.percentage}%</div>
										</div>
									</td>
									<td class="px-4 py-3 text-sm text-gray-600">{metric.target}</td>
									<td class="px-4 py-3">
										<span
											class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
											{metric.status === 'On Track' ||
											metric.status === 'Excellent' ||
											metric.status === 'Good' ||
											metric.status === 'Healthy' ||
											metric.status === 'Normal' ||
											metric.status === 'Participating'
												? 'bg-green-100 text-green-800'
												: metric.status === 'Available' ||
													  metric.status === 'High Usage' ||
													  metric.status === 'In Progress'
													? 'bg-blue-100 text-blue-800'
													: metric.status === 'Due Soon' || metric.status === 'Review Needed'
														? 'bg-orange-100 text-orange-800'
														: 'bg-red-100 text-red-800'}"
										>
											{metric.status}
										</span>
									</td>
									<td class="px-4 py-3 text-sm text-gray-600">{metric.nextDue}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<!-- Pagination -->
				<div class="flex items-center justify-between border-t px-6 py-4">
					<div class="text-sm text-gray-600">
						Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
							currentPage * itemsPerPage,
							data.healthcareMetrics.length
						)} of {data.healthcareMetrics.length} metrics
					</div>
					<div class="flex items-center gap-2">
						<Button variant="outline" size="sm" onclick={prevPage} disabled={currentPage === 1}>
							Previous
						</Button>
						{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
							<Button
								variant={currentPage === page ? 'default' : 'outline'}
								size="sm"
								onclick={() => goToPage(page)}
								class="h-8 w-8 p-0"
							>
								{page}
							</Button>
						{/each}
						<Button
							variant="outline"
							size="sm"
							onclick={nextPage}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
