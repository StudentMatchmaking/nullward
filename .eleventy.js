module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/og-image.png");
  eleventyConfig.addPassthroughCopy({"src/og-image.svg": "og-image.png"}); // SVG as og-image
    // Favicon files
    eleventyConfig.addPassthroughCopy("src/*.svg");
    eleventyConfig.addPassthroughCopy("src/*.png");
    eleventyConfig.addPassthroughCopy("src/*.ico");
    eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  // Create a collection of all posts (filters out future-dated posts for scheduling)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    const now = new Date();
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .filter(post => post.date <= now) // Only include posts with dates in the past
      .sort((a, b) => {
        return b.date - a.date; // Sort by date, newest first
      });
  });

  // Create collections for each tag
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => {
          if (tag !== "post") tagSet.add(tag);
        });
      }
    });
    return [...tagSet].sort();
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", function(content) {
    const excerptLength = 200;
    if (content.length <= excerptLength) return content;
    return content.substring(0, excerptLength).trim() + "...";
  });

  // Limit filter for arrays
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function(content) {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
