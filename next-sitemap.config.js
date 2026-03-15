/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.gekuendigt-abfindung.de',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};
