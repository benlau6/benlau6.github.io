<script lang="ts">
	export let title: string;
	export let href: string;
	export let imgSrc: string;
</script>

<a {href}>
	<span>{title}</span>
	<button class="card" style="background-image: url({imgSrc});" />
</a>

<style>
	span {
		margin-left: 4px;
		font-size: 1.25rem;
		text-transform: capitalize;
	}
	.card {
		background-color: white;
		border-radius: 8px;
		width: 100%;
		height: 100%;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 1rem;
		cursor: pointer;
		background-size: contain;
		/* background-size: cover; */
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
