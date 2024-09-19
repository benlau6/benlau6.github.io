import { execSync } from "child_process";

// NOTE: it does not replace the data specified in zod.
// So it does not affect preview list. It only affects markdown rendering
// So applying the same logic for publishDate does not help.
export function remarkUpdatedDate() {
	// @ts-expect-error:next-line
	return function (_tree, file) {
		if (file.data.astro.frontmatter.updatedDate == undefined) {
			const filepath = file.history[0];
			// https://git-scm.com/docs/pretty-formats
			// %cI
			// committer date, strict ISO 8601 format
			const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
			// approximate the updated date to the committer date
			file.data.astro.frontmatter.updatedDate = result.toString();
		}
	};
}
