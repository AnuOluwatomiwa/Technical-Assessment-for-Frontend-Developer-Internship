/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's Strict Mode for identifying potential problems
    images: {
        domains: ['avatars.githubusercontent.com', 'nextjs.org'], // Allow images from these specified domains
    },
};

export default nextConfig;
