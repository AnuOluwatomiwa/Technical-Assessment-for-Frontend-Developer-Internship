/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // Allow images from GitHub avatars
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '', // No specific port needed
                pathname: '/**', // Matches any path under this domain
            },
        ],
    },
};

export default nextConfig;