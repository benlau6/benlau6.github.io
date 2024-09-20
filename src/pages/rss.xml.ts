import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import rss from "@astrojs/rss";

export const GET = async () => {
	const posts = await getAllPosts("blog");
	const projects = await getAllPosts("projects");
	const allPosts = [...posts, ...projects];

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: allPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `blog/${post.slug}`,
		})),
	});
};
