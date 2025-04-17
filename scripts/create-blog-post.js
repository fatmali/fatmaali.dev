#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Convert title to slug
const slugify = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Create a new blog post
const createBlogPost = async () => {
  try {
    // Ask for blog post details
    const title = await question('Enter blog post title: ');
    const description = await question('Enter blog post description: ');
    const tags = await question('Enter tags (comma-separated): ');
    const readTime = await question('Enter read time (e.g., "5 min read"): ') || '5 min read';
    const author = await question('Enter author name (default: Fatma Ali): ') || 'Fatma Ali';
    
    // Generate slug and other data
    const slug = slugify(title);
    const date = getCurrentDate();
    const tagArray = tags.split(',').map(tag => tag.trim());
    
    // Create content template
    const content = `---
title: "${title}"
description: "${description}"
date: "${date}"
image: "/images/blog/${slug}.jpg"
tags: [${tagArray.map(tag => `"${tag}"`).join(', ')}]
readTime: "${readTime}"
author: "${author}"
---

Write your blog post content here. This is written in MDX format, which is Markdown with JSX support.

## Heading 2

Normal paragraph text.

### Heading 3

- List item 1
- List item 2
- List item 3

\`\`\`tsx
// Example code block
function Example() {
  return <div>Example component</div>;
}
\`\`\`

You can also use **bold text**, *italic text*, and [links](https://example.com).
`;

    // Write the file
    const contentDir = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    // Check if directory exists, if not create it
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Error: A blog post with the slug "${slug}" already exists.`);
      process.exit(1);
    }
    
    // Write the file
    fs.writeFileSync(filePath, content);
    
    console.log(`\n✅ Blog post created successfully!`);
    console.log(`📝 File path: ${filePath}`);
    console.log(`🔗 URL: /blog/${slug}`);
    console.log(`\n⚠️ Remember to add an image at: public/images/blog/${slug}.jpg`);
    
  } catch (error) {
    console.error('Error creating blog post:', error);
  } finally {
    rl.close();
  }
};

// Helper function to prompt for input
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

// Run the script
createBlogPost();