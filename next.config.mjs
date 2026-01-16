import nextMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import withTM from "next-transpile-modules";
import path from "path";
import remarkGfm from "remark-gfm";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
  },
});

export default withPlugins(
  [
    [
      withMDX,
      {
        pageExtensions: ["md", "mdx", "ts", "tsx"],
      },
    ],
    [withTM(["echarts", "zrender"])],
  ],
  {
    images: {
      unoptimized: true,
    },
    output: "export",
    reactStrictMode: true,
    transpilePackages: ["@databiosphere/findable-ui"],
  }
);
