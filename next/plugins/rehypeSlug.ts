import slugify from "slugify";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { getHeadingTextValue } from "./remarkHeadings";

/**
 * Rehype plugin to generate an ID for each heading in MDX content.
 * @returns plugin to generate an ID for each heading in MDX content.
 */
export function rehypeSlug(): Plugin {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const headingText = getHeadingTextValue(node.children);
        const id = slugify(headingText, {
          lower: true,
          strict: true,
        });
        // Add the ID to the heading element.
        node.properties.id = id;
        // Append AnchorLink to the heading element.
        node.children.push({
          attributes: [
            {
              name: "anchorLink",
              type: "mdxJsxAttribute",
              value: id,
            },
          ],
          name: "AnchorLink",
          type: "mdxJsxFlowElement",
        });
      }
    });
  };
}
