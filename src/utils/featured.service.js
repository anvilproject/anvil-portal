/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service for filtering featured posts.
 */

/**
 * Returns featured posts.
 *
 * @param featured
 * @param posts
 * @returns {*}
 */
export function filterFeaturedPosts(featured, posts) {
  if (!featured) {
    return posts;
  }

  return posts.filter((post) => post.frontmatter.featured);
}
