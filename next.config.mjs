/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            // edit: updated to new key. Was previously `allowedForwardedHosts`
            allowedForwardedHosts: ["localhost"],
            allowedOrigins: ['https://jubilant-space-umbrella-jwwg6w4g64gcjq94-3000.app.github.dev/', 'localhost:3000'],
        },
    }
};

export default nextConfig;
