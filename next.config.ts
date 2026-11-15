import type { NextConfig } from 'next';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const useProjectPath = isGitHubActions && process.env.NEXT_PUBLIC_USE_CUSTOM_DOMAIN !== 'true' && Boolean(repoName);
const basePath = useProjectPath ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {})
};

export default nextConfig;
