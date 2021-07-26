/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - external link component.
 * Provides an anchor tag with attributes suitable for an external link.
 * Use of this component within markdown is possible.
 *
 * Props
 * -----
 * - link: The URL that the hyperlink points to.
 *
 * Children
 * --------
 * Children should be in the following format:
 * <external-link href="https://external-link.com">Link text</external-link>
 *
 * For example,
 * <external-link href="https://galaxy.com">Galaxy</external-link>
 */

// Core dependencies
import React from "react";

interface ExternalLinkProps {
  children: React.ReactElement;
  link: string;
}

function ExternalLink(props: ExternalLinkProps): JSX.Element {
  const { children, link } = props;

  return (
    <a href={link} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

export default ExternalLink;
