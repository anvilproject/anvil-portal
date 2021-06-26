/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - figure caption component.
 * Provides an image with a title or explanation; text wrapped inside <figcaption>.
 * Use of this component within markdown is possible.
 *
 * Children
 * --------
 * Children should have the following format:
 * <figure-caption>Caption text.</figure-caption>
 *
 * For example,
 * <figure-caption>An overview of AnVIL.</figure-caption>
 */

// Core dependencies
import React from "react";

function FigureCaption(props) {
  const { children } = props;

  return <figcaption>{children}</figcaption>;
}

export default FigureCaption;
