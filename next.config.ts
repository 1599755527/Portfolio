import type { NextConfig } from 'next';
const nextConfig: NextConfig = { output: 'export', trailingSlash: true, basePath: '/Portfolio', experimental: { cpus: 1 } };
export default nextConfig;
