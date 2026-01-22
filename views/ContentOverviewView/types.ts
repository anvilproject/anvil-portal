import { MDXRemoteProps } from "next-mdx-remote";
import { StaticProps } from "../../content/entities";

export interface Props extends StaticProps {
  components?: MDXRemoteProps["components"];
}
