/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - a React Context object for sharing markdown frontmatter.
 */

// Core dependencies
import React from "react";

const FrontmatterContext = React.createContext({title: ""});

export default FrontmatterContext;
