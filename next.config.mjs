/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  async redirects() {
    const retiredSlugs = [
      'einundzwanzig-jahren', 'zweiundzwanzig-jahren', 'dreiundzwanzig-jahren',
      'vierundzwanzig-jahren', 'fuenfundzwanzig-jahren', 'sechsundzwanzig-jahren',
      'siebenundzwanzig-jahren', 'achtundzwanzig-jahren', 'neunundzwanzig-jahren',
      'dreissig-jahren', 'einunddreissig-jahren', 'zweiunddreissig-jahren',
      'dreiunddreissig-jahren', 'vierunddreissig-jahren', 'fuenfunddreissig-jahren',
      'sechsunddreissig-jahren', 'siebenunddreissig-jahren', 'achtunddreissig-jahren',
      'neununddreissig-jahren', 'vierzig-jahren',
    ];

    const yearRedirects = retiredSlugs.flatMap((slug) => [
      {
        source: `/abfindung-nach-${slug}-betriebszugehoerigkeit/`,
        destination: '/abfindung/',
        permanent: true,
      },
      {
        source: `/gekuendigt-nach-${slug}-betriebszugehoerigkeit/`,
        destination: '/kuendigung/',
        permanent: true,
      },
      {
        source: `/fristlose-kuendigung-nach-${slug}-betriebszugehoerigkeit/`,
        destination: '/fristlose-kuendigung/',
        permanent: true,
      },
    ]);

    return [
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      ...yearRedirects,
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
