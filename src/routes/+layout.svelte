<header>
	<div class="header-items spacing">
		<a href="/" class="title-link"><h2>Ben Lau</h2></a>
		<nav>
			<!-- <a href="/">Home</a> -->
			<a href="/#about">About</a>
			<a href="/#portfolio">Portfolio</a>
			<!-- <a href="/blog">Blog</a> -->
		</nav>
	</div>
</header>

<main class="spacing">
	<slot />
</main>

<style>
	:global(*) {
		/* for href jump */
		scroll-padding-top: 56px;
		scroll-margin-top: 1rem;
	}
	:global(body) {
		padding-bottom: 3rem;
	}
	.title-link {
		text-decoration: none;
		color: inherit;
	}
	header {
		top: 0;
		position: sticky;
		border-bottom: 1px solid #ccc;
		background-color: white;
	}
	.header-items {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 56px;
		gap: 1rem;
	}
	.spacing {
		margin: 0 auto;
		padding: 0 64px;
		max-width: 1366px;
	}
	nav {
		font-size: large;
		display: flex;
		gap: 0.75rem;
	}
</style>
