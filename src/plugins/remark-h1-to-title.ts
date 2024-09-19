import type { Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Node } from "unist";
import { remove } from "unist-util-remove";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

export function remarkH1ToTitle() {
	return (tree: Root, file: VFile) => {
		let node: Node | null = null;
		visit(tree, "heading", (n) => {
			if (n.depth === 1) {
				// found the first h1
				node = n;
				remove(tree, n);
			}
		});

		if (node) {
			// @ts-expect-error:next-line
			file.data.astro.frontmatter.title = mdastToString(node);
		}
	};
}
