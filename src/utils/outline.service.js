/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic outline service.
 */

// Core dependencies
import React from "react";

/**
 * Returns a filtered set of the h2 and h3 htmlAst for the post.
 *
 * @param posts
 * @param docPath
 */
export function filterHtmlAstByHeading(posts, docPath) {
  if (!docPath || !posts) {
    return;
  }

  const slug = docPath.slice(1);

  const page = posts.find(post => post.slug.slice(0, -3) === slug);

  if (!page) {
    return;
  }

  /* Grab any <h2> or <h3> headings. */
  const pageNode = page.nodes[0];

  const { childMarkdownRemark } = pageNode,
    { htmlAst } = childMarkdownRemark || {},
    { children } = htmlAst;

  const headings = children.filter(
    child => child.tagName === "h2" || child.tagName === "h3"
  );

  /* Only show outline if there are some <h2> or <h3> headings. */
  if (
    !headings.some(
      heading => heading.tagName === "h2" || heading.tagName === "h3"
    )
  ) {
    return;
  }

  return headings;
}

/**
 * Returns the outline refactored as anchor, depth and label.
 *
 * @param outline
 * @returns {*}
 */
export function getOutline(outline) {
  if (!outline) {
    return;
  }

  const anchor = `#${outline.properties.id}`;
  const depth = Number(outline.tagName.charAt(1));
  const label =
    outline.children?.find(child => child.type === "text")?.value || "";

  return { anchor: anchor, depth: depth, label: label };
}

/**
 * Returns the outline item, with special dom handling of numbered items.
 *
 * @param outlineItem
 * @param classNameOutlineItem
 */
export function getOutlineItem(outlineItem, classNameOutlineItem) {
  /* Test if the outlined item begins with a number. */
  const itemNumbered = /^[0-9]/.test(outlineItem);

  /* If the outline is not numbered, return unchanged. */
  if (!itemNumbered || !outlineItem) {
    return outlineItem;
  }

  /* Split into words. */
  const words = outlineItem.replace(/\s+/g, " ").split(" ");

  /* Grab the number. */
  const number = words.shift();

  /* Test the number is joined by a separator. */
  const hasSeparator = /[^a-zA-Z0-9\s]/.test(words[0]);
  const separator = hasSeparator ? words.shift() : "";

  /* Recreate the outline item without number or separator. */
  const word = words.join(" ");

  /* Return the outlined number wrapped in <span/>. */
  return (
    <span className={classNameOutlineItem}>
      <span>{number}</span>
      {separator ? <span>&nbsp;{separator}&nbsp;</span> : <span>&nbsp;</span>}
      <span>{word}</span>
    </span>
  );
}
