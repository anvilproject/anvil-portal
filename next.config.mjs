import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX({
  // Stops `next dev` (16.4+) writing an AGENTS.md to the repo root when it detects an AI agent.
  agentRules: false,
  images: {
    unoptimized: true,
  },
  output: "export",
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  transpilePackages: ["@databiosphere/findable-ui"],
});
