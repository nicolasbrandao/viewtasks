/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const paths = [
      {
        // internal urls
        source: "/api/:path*",
        // external urls (proxy to backend api)
        destination: process.env.NEXT_PUBLIC_API_URL + "/:path*",
      },
    ];
    console.log(paths);
    return paths;
  },
};

export default nextConfig;
