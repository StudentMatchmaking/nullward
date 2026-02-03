module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("public");
    // Favicon files
    eleventyConfig.addPassthroughCopy("src/*.svg");
    eleventyConfig.addPassthroughCopy("src/*.png");
    eleventyConfig.addPassthroughCopy("src/*.ico");
    eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  // Create a collection of all posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
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
