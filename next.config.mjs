/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  async redirects() {
    return [
      // Non-www → www (301 permanent)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'gekuendigt-abfindung.de' }],
        destination: 'https://www.gekuendigt-abfindung.de/:path*',
        permanent: true,
      },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      // Redirect internal routes to public rewritten URLs (prevents duplicate indexing)
      { source: '/abfindung-jahre/:slug/', destination: '/abfindung-nach-:slug-betriebszugehoerigkeit/', permanent: true },
      { source: '/gekuendigt-jahre/:slug/', destination: '/gekuendigt-nach-:slug-betriebszugehoerigkeit/', permanent: true },
      { source: '/abmahnung-seiten/:slug/', destination: '/kuendigung-nach-:slug/', permanent: true },
      { source: '/fristlose-kuendigung-jahre/:slug/', destination: '/fristlose-kuendigung-nach-:slug-betriebszugehoerigkeit/', permanent: true },
    ];
  },
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
