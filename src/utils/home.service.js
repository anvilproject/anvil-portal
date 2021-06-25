/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service for AnVIL home page.
 */

/**
 * Returns the section intro specified by section intro file name.
 *
 * @param section
 * @param posts
 * @returns {*}
 */
export function findSectionIntro(section, posts) {
  return posts.find(post => post.fields.slug.includes(section));
}
