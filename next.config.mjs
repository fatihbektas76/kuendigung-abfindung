/** @type {import('next').NextConfig} */

// Old word-based slugs → new number-based slugs (for 301 redirects)
const oldToNew = [
  ['einem-jahr', '1-jahr'], ['zwei-jahren', '2-jahren'], ['drei-jahren', '3-jahren'],
  ['vier-jahren', '4-jahren'], ['fuenf-jahren', '5-jahren'], ['sechs-jahren', '6-jahren'],
  ['sieben-jahren', '7-jahren'], ['acht-jahren', '8-jahren'], ['neun-jahren', '9-jahren'],
  ['zehn-jahren', '10-jahren'], ['elf-jahren', '11-jahren'], ['zwoelf-jahren', '12-jahren'],
  ['dreizehn-jahren', '13-jahren'], ['vierzehn-jahren', '14-jahren'],
  ['fuenfzehn-jahren', '15-jahren'], ['sechzehn-jahren', '16-jahren'],
  ['siebzehn-jahren', '17-jahren'], ['achtzehn-jahren', '18-jahren'],
  ['neunzehn-jahren', '19-jahren'], ['zwanzig-jahren', '20-jahren'],
  ['einundzwanzig-jahren', '21-jahren'], ['zweiundzwanzig-jahren', '22-jahren'],
  ['dreiundzwanzig-jahren', '23-jahren'], ['vierundzwanzig-jahren', '24-jahren'],
  ['fuenfundzwanzig-jahren', '25-jahren'], ['sechsundzwanzig-jahren', '26-jahren'],
  ['siebenundzwanzig-jahren', '27-jahren'], ['achtundzwanzig-jahren', '28-jahren'],
  ['neunundzwanzig-jahren', '29-jahren'], ['dreissig-jahren', '30-jahren'],
  ['einunddreissig-jahren', '31-jahren'], ['zweiunddreissig-jahren', '32-jahren'],
  ['dreiunddreissig-jahren', '33-jahren'], ['vierunddreissig-jahren', '34-jahren'],
  ['fuenfunddreissig-jahren', '35-jahren'], ['sechsunddreissig-jahren', '36-jahren'],
  ['siebenunddreissig-jahren', '37-jahren'], ['achtunddreissig-jahren', '38-jahren'],
  ['neununddreissig-jahren', '39-jahren'], ['vierzig-jahren', '40-jahren'],
];

const prefixes = ['abfindung-nach', 'gekuendigt-nach', 'fristlose-kuendigung-nach'];

const slugRedirects = oldToNew.flatMap(([oldSlug, newSlug]) =>
  prefixes.map((prefix) => ({
    source: `/${prefix}-${oldSlug}-betriebszugehoerigkeit/`,
    destination: `/${prefix}-${newSlug}-betriebszugehoerigkeit/`,
    permanent: true,
  }))
);

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
      // Old word-based slugs → new number-based slugs (120 redirects)
      ...slugRedirects,
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
