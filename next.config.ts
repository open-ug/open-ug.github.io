import createMDX from "@next/mdx";
import { NextConfig } from "next";
import remarkGFM from "remark-gfm";

const nextConfig: NextConfig = {
  output: "export",
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGFM],
  },
});

export default withMDX(nextConfig);
