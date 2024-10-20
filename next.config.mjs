/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['avatars.githubusercontent.com', 'nextjs.org'], // Allow images from these domains
    },
};

export default nextConfig;
