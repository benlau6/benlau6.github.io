import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";
import { toString } from "mdast-util-to-string";

export function remarkH1ToTitle() {
	// @ts-expect-error:next-line
	return function (tree, file) {
		let node;
		visit(tree, "heading", (n) => {
			if (n.depth === 1) {
				// found the first h1
				node = n;
				remove(tree, n);
			}
		});

		if (node) {
			file.data.astro.frontmatter.title = toString(node);
		}
	};
}
