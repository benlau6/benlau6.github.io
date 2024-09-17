import { type CollectionEntry, getCollection } from "astro:content";
import { siteConfig } from "@/site-config";

/** filter out draft posts based on the environment */
export async function getAllPosts(collection: "blog" | "projects" = "blog") {
	return await getCollection(collection, ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** returns the date of the post based on option in siteConfig.sortPostsByUpdatedDate */
export function getPostSortDate(post: CollectionEntry<"blog" | "projects">) {
	return siteConfig.sortPostsByUpdatedDate && post.data.updatedDate !== undefined
		? new Date(post.data.updatedDate)
		: new Date(post.data.publishDate);
}

/** sort post by date (by siteConfig.sortPostsByUpdatedDate), desc.*/
export function sortMDByDate(posts: CollectionEntry<"blog" | "projects">[]) {
	return posts.sort((a, b) => {
		const aDate = getPostSortDate(a).valueOf();
		const bDate = getPostSortDate(b).valueOf();
		return bDate - aDate;
	});
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"blog" | "projects">[]) {
	return posts.reduce<Record<string, CollectionEntry<"blog" | "projects">[]>>((acc, post) => {
		const year = getPostSortDate(post).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(post);
		return acc;
	}, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"blog" | "projects">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"blog" | "projects">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(
	posts: CollectionEntry<"blog" | "projects">[],
): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
