<script lang="ts">
	import PortfolioItem from './PortfolioItem.svelte';
	import { stats_items, web_items } from './portfolio_items';

	const all_items = [...stats_items, ...web_items];
	const items = {
		all: all_items,
		'stats & ML': stats_items,
		web: web_items
	};

	type Option = keyof typeof items;
	const options = Object.keys(items) as Option[];
	let selected: Option = 'all';
</script>

<svelte:head>
	<title>Home - Ben Lau</title>
</svelte:head>

<h1 id="about">About</h1>

<p>My name is Ben Lau, and I am a Hongkonger.</p>

<p>
	I am currently a data scientist of a startup in Hong Kong, building a B2B web application from
	scratch. On the data side, I work on web scraping, data processing, data visualization, and
	machine learning. On the web side, I work on the frontend and backend of the web application.
</p>

<p>
	My passion is to solve difficult problems with data science. I am also interested in designing and
	implementing complex and antifragile software systems. Moreover, I like to uncover the hidden
	insights or truth in data, and present them in a clear and concise way.
</p>

<p>
	In addition, I am seeking for opportunities to make the Hong Kong society better. Welcome to
	contact me if you are doing so and need a hand from a data scientist or an software engineer.
</p>

<h1 id="portfolio">Portfolio</h1>

<div class="btn-gp">
	{#each options as option}
		{@const text = option.replace('_', ' ')}
		<button
			class:active={selected === option}
			on:click={() => {
				selected = option;
			}}>{text}</button
		>
	{/each}
</div>

<div class="portfolio-items">
	{#each items[selected] as item}
		{@const { title, href, imgSrc } = item}
		<PortfolioItem {title} {href} {imgSrc} />
	{/each}
</div>

<style>
	p {
		font-size: 1.25rem;
		line-height: 1.875rem;
	}
	.btn-gp {
		display: flex;
	}
	button {
		background-color: #fff;
		border: 1px solid #ccc;
		padding: 8px 16px;
		font-size: 16px;
		cursor: pointer;
		text-transform: capitalize;
	}
	button.active {
		background-color: rgb(86, 123, 149);
		color: white;
	}
	.portfolio-items {
		display: grid;
		margin: 1rem 0;
		grid-template-columns: repeat(auto-fill, minmax(max(350px, 100%/4), 1fr));
		grid-auto-rows: 350px;
		gap: max(2rem, 2vw) 2vw;
	}
</style>
