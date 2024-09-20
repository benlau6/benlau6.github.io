import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { expressiveCodeOptions } from "./src/site.config";

// Remark plugins
import remarkDirective from "remark-directive"; /* Handle ::: directives as nodes */
// @ts-ignore
import RemarkLinkRewrite from "remark-link-rewrite";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";
import wikiLinkPlugin from "remark-wiki-link";
import { remarkAdmonitions } from "./src/plugins/remark-admonitions"; /* Add admonitions */
import { remarkH1ToTitle } from "./src/plugins/remark-h1-to-title";
import { remarkReadingTime } from "./src/plugins/remark-reading-time";
import { remarkUpdatedDate } from "./src/plugins/remark-updated-date";

import rehypeExternalLinks from "rehype-external-links";
// Rehype plugins
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
	image: {
		domains: ["webmention.io"],
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		icon(),
		tailwind({
			applyBaseStyles: false,
			nesting: true,
		}),
		sitemap(),
		mdx(),
	],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					rel: ["nofollow, noreferrer"],
					target: "_blank",
				},
			],
			[rehypeKatex, {}],
		],
		remarkPlugins: [
			remarkUnwrapImages,
			remarkReadingTime,
			remarkDirective,
			remarkAdmonitions,
			remarkMath,
			remarkH1ToTitle,
			remarkUpdatedDate,
			[
				wikiLinkPlugin,
				// TODO: replace all markdown filename separators with hyphens
				{ hrefTemplate: (link: string) => `/notes/${link}`.replaceAll("-", "_") },
			],
			[
				RemarkLinkRewrite,
				{
					replacer: (url: string) => {
						// it replaces markdown internal links with the correct path
						// NOTE: url.includes(".md") would break external links with ".md" in them
						if (url.includes(".md")) {
							const parts = url.replace(".md", "").split("/");
							const prefix = `${parts[0]}/notes`;
							const path = parts.slice(1).join("/");
							return `${prefix}/${path}`;
						}
						return url;
					},
				},
			],
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: [""],
			},
		},
	},
	// https://docs.astro.build/en/guides/prefetch/
	prefetch: true,
	// ! Please remember to replace the following site property with your own domain
	site: "https://astro-cactus.chriswilliams.dev/",
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
		plugins: [rawFonts([".ttf", ".woff"])],
	},
});

function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
