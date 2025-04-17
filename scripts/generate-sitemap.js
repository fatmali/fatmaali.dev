// Simple sitemap generation script
const fs = require('fs');
const path = require('path');

// Your website URL
const baseUrl = 'https://fatmaali.dev';

// Define your routes - add all the routes in your Next.js app
const routes = [
  '/',
  '/blog',
  // Add other routes as needed
];

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `
    )
    .join('')}
</urlset>
`;

  // Write sitemap to public directory
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
};

generateSitemap();