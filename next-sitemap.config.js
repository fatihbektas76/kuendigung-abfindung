/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.german-litigation-lawyer.com',
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
