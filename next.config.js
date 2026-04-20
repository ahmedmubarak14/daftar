/** @type {import('next').NextConfig} */

// When building in GitHub Actions for GitHub Pages, the site is served at
// https://<user>.github.io/<repo>/ — so we need a basePath. Locally we don't.
const isGhPages = process.env.GITHUB_ACTIONS === "true";
const repo = "daftar";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGhPages ? `/${repo}` : "",
  assetPrefix: isGhPages ? `/${repo}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? `/${repo}` : "",
  },
};

module.exports = nextConfig;
