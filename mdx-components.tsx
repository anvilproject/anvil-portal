import { MDXComponents } from "mdx/types";
import * as C from "./components";
import { Link } from "./components/common/Link/link";
import { StyledBanner } from "./components/Home/components/Banner/banner.styles";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Banner: C.Banner,
    StyledBanner,
    a: Link,
  };
}
