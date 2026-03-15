/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/abfindung-nach-:slug-betriebszugehoerigkeit/',
        destination: '/abfindung-jahre/:slug/',
      },
      {
        source: '/gekuendigt-nach-:slug-betriebszugehoerigkeit/',
        destination: '/gekuendigt-jahre/:slug/',
      },
    ];
  },
};

export default nextConfig;
