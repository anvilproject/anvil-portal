import { MDXComponents } from "mdx/types";
import * as C from "./components";
import { Link } from "./components/common/Link/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Banner: C.Banner,
    a: Link,
  };
}
