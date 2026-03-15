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
      {
        source: '/kuendigung-nach-:slug/',
        destination: '/abmahnung-seiten/:slug/',
      },
      {
        source: '/fristlose-kuendigung-nach-:slug-betriebszugehoerigkeit/',
        destination: '/fristlose-kuendigung-jahre/:slug/',
      },
    ];
  },
};

export default nextConfig;
