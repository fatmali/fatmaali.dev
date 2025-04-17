/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fatmaali.dev',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  outDir: './public',
  // Skip the build manifest check - generate based on the known routes
  skipIndexHtmlGenerationForPaths: [''], // Empty array to not skip any paths
}