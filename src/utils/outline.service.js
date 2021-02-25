/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic outline service.
 */

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

    const {childMarkdownRemark} = pageNode,
        {htmlAst} = childMarkdownRemark || {},
        {children} = htmlAst;

    const headings = children.filter(child => child.tagName === "h2" || child.tagName === "h3");

    /* Only show outline if there are some <h2> or <h3> headings. */
    if ( !headings.some(heading => heading.tagName === "h2" || heading.tagName === "h3") ) {

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

    if ( !outline ) {

        return;
    }

    const anchor = `#${outline.properties.id}`;
    const depth = Number(outline.tagName.charAt(1));
    const label = outline.children?.find(child => child.type === "text")?.value || "";

    return {anchor: anchor, depth: depth, label: label};
}
