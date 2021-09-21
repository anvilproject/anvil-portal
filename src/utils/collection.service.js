/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic card collections (tools and platforms) service.
 */

/**
 * Filters tools into "coming" or "current".
 * Slug directory location will determine outcome.
 *
 * @param props
 * @param tools
 * @returns {*}
 */
export function filterTools(props, tools) {
  const { coming, current } = props;

  if (coming || coming === "") {
    return tools.filter((tool) => tool.fields.slug.includes("coming"));
  }

  if (current || current === "") {
    return tools.filter((tool) => !tool.fields.slug.includes("coming"));
  }

  return tools;
}
