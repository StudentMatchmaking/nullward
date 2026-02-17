## Overview
Nullward is a minimalist essay/blog site built with 11ty (Eleventy)
using Nunjucks templates. It deploys automatically to Cloudflare Pages
when changes are pushed to the main branch.

## URLs
- Production: https://nullward.pro
- Cloudflare Pages: https://nullward.pages.dev
- Repository: github.com/StudentMatchmaking/nullward

## Tech Stack
- Static site generator: 11ty (Eleventy)
- Templating: Nunjucks (.njk)
- Hosting: Cloudflare Pages (auto-deploys from main branch)
- Domain: nullward.pro (custom domain on Cloudflare)

## Project Structure
nullward/
  src/
    _includes/        # Layout templates
      base.njk        # Base HTML layout (includes meta tags, OG, schema)
      post.njk        # Blog post layout (includes Article schema)
    posts/            # Blog post markdown files
      posts.json      # Directory data (permalink, layout, tags)
      *.md            # Individual blog posts
    sitemap.njk       # XML sitemap template
    robots.txt        # Crawler directives
    about.njk         # About page
    essays.njk        # Essays listing page
    tags.njk          # Tags page
  .eleventy.js        # 11ty configuration
  package.json        # Dependencies

## Target Audience Persona

### Primary Reader: "The AI-Curious Professional"
- **Demographics**: Tech professionals, founders, investors, developers, product managers, AI researchers (25-45 years old)
- **Psychographics**: Forward-thinking, skeptical of conventional wisdom, interested in second-order effects of technology, contrarian thinkers
- **Pain Points**: Need to understand AI's real impact on their industry; want unconventional perspectives not found in mainstream tech media
- **Content Needs**: Long-form, data-driven, opinionated essays with clear predictions and actionable insights
- **Search Behavior**: Uses both traditional search and AI assistants (ChatGPT, Claude, Perplexity) to research topics

---

## SEO & GEO Optimization Guidelines

### What is GEO?
Generative Engine Optimization (GEO) is optimizing content for AI search engines and LLMs (ChatGPT, Claude, Perplexity, Google AI Overviews). Unlike traditional SEO focused on ranking, GEO focuses on getting your content **cited and referenced** inside AI-generated answers.

### Content Structure (CRITICAL for both SEO & GEO)

#### 1. BLUF: Bottom Line Up Front
- **Lead every article with the key insight** in the first 2-3 paragraphs
- AI systems extract early content for citations
- Don't bury the conclusion - state it upfront, then explain

**Example:**
```markdown
# Bad
Let me tell you a story about how I came to understand...
[500 words later]
...which is why AI will replace 40% of jobs by 2030.

# Good
AI will replace 40% of knowledge work jobs by 2030. Not because
of automation alone, but because AI makes automation cheap enough
to matter. Here's the math that makes this inevitable.
```

#### 2. Clear Heading Hierarchy
- One H1 (title) per page
- Use H2 for main sections, H3 for subsections
- Make headings descriptive and keyword-rich
- Each heading should make sense standalone (AI extracts them)

#### 3. Short, Scannable Paragraphs
- Maximum 2-3 sentences per paragraph
- AI systems struggle with long text blocks
- Use white space liberally

#### 4. Lists and Structured Data
- Use bullet points for multiple items
- Use numbered lists for processes/rankings
- Pages with structured lists have 30-40% higher AI citation rates

#### 5. Quotable Statements
- Include 1-2 standalone sentences per major section that summarize key points
- These get extracted by AI systems for citations
- Format as bold or in blockquotes for emphasis

### Writing for AI Citation

#### Include Statistics with Sources
```markdown
# Bad
AI will impact many jobs.

# Good
According to Goldman Sachs research, AI could automate 25% of all
work tasks in the US and Europe. McKinsey estimates this rises
to 30% of hours worked by 2030.
```

#### Use Definitional Statements
AI systems love clear definitions they can cite:
```markdown
**Automation debt** is the accumulated backlog of processes that
could be automated but haven't been—because automation was
historically too expensive.
```

#### Answer Questions Directly
Structure content to answer questions people ask:
- "What is [concept]?"
- "Why does [thing] matter?"
- "How does [process] work?"
- "What are the implications of [trend]?"

### Technical SEO Checklist

#### Already Implemented:
- [x] Semantic HTML structure
- [x] Mobile responsive design
- [x] Fast loading (static site, CDN)
- [x] HTTPS enabled
- [x] XML Sitemap at /sitemap.xml
- [x] robots.txt allowing AI crawlers
- [x] Open Graph meta tags
- [x] Twitter Card meta tags
- [x] Canonical URLs
- [x] JSON-LD Organization schema
- [x] JSON-LD Article schema on posts
- [x] Author attribution
- [x] Date published/modified metadata

#### Ongoing Requirements:
- [ ] Keep content fresh (update important posts quarterly)
- [ ] Internal linking between related posts
- [ ] Descriptive alt text on any images
- [ ] Unique meta descriptions per page

### Frontmatter Format (Required for SEO)

```yaml
---
title: "Your Compelling Title Here (50-60 chars ideal)"
date: 2026-02-17
excerpt: "A compelling 1-2 sentence summary that answers 'why should I read this?' This appears in search results and social shares. (150-160 chars ideal)"
tags:
  - ai
  - economics
  - predictions
---
```

### Tag Strategy
Use consistent tags for topic clustering:
- **ai** - All AI-related content
- **economics** - Economic analysis and predictions
- **technology** - General tech trends
- **business** - Business strategy, startups
- **predictions** - Future forecasts
- **philosophy** - Deeper conceptual pieces
- **future-of-work** - Employment, labor market
- **creativity** - AI and human creativity

### Content Freshness
- **Critical for GEO**: AI systems deprioritize content older than 3-6 months
- Update high-performing posts quarterly
- Add "Last updated: [date]" to evergreen content
- The scheduled posts system auto-publishes via GitHub Actions at 00:05 UTC daily

---

## Writing Style

### Tone
- Direct, confident, and contrarian
- Challenge conventional wisdom with evidence
- First-person perspective ("I believe...", "Here's what I think...")
- Accessible but not dumbed down
- Provocative titles that create curiosity

### Structure Template
1. **Hook** (2-3 sentences): Surprising claim or contrarian take
2. **Thesis** (1 paragraph): Clear statement of the argument
3. **Evidence** (multiple sections): Data, logic, examples
4. **Implications** (1-2 sections): What this means for the reader
5. **Call to Action/Question** (closing): Engage the reader

### Length Guidelines
- Minimum: 1,500 words
- Optimal: 2,000-3,500 words
- Maximum: 5,000 words

### Author Attribution
- Author: Owen Redman
- All posts attributed automatically via schema markup

---

## Workflow Rules (ALWAYS FOLLOW)

### Local-First Development
- ALWAYS make changes to files locally first. Never push directly without a local preview.
- After making any changes, run the local dev server: npx @11ty/eleventy --serve
- Tell me to check http://localhost:8080 to review the changes.
- WAIT for my explicit approval before proceeding. Do not push until I confirm.

### Git Push Process
- Only after I confirm the local preview looks good:
  1. Stage the changed files: git add [specific files]
  2. Write a clear commit message describing what changed
  3. Push to GitHub via SSH: git push origin main
- Never use git add . or git add -A — always stage specific files by name.
- Never force push. Never push to a branch other than main unless I ask.

### After Pushing
- Remind me that Cloudflare Pages will auto-deploy in ~30 seconds.
- Suggest I check the live site at https://nullward.pro to verify.

### Blog Post Workflow Specifically
1. Create the .md file in src/posts/ with proper frontmatter
2. Run the local server so I can preview
3. Wait for my go-ahead
4. Commit and push only after approval
5. Confirm deployment to nullward.pro

### Scheduled Posts
- Posts with future dates are automatically hidden until their publish date
- GitHub Actions rebuilds the site daily at 00:05 UTC
- To schedule a post: just set a future date in the frontmatter

---

## Quick Reference: GEO Optimization Checklist

When creating any new content, verify:

- [ ] Title is compelling and includes primary keyword (50-60 chars)
- [ ] First paragraph contains the main insight/thesis
- [ ] Excerpt/description is unique and compelling (150-160 chars)
- [ ] Clear H2/H3 heading structure
- [ ] Paragraphs are 2-3 sentences max
- [ ] Includes at least one bulleted or numbered list
- [ ] Contains 2-3 quotable/bold standalone statements
- [ ] Statistics include sources
- [ ] Related internal links to other posts
- [ ] Appropriate tags assigned (2-5 tags)
- [ ] Content directly answers questions readers might ask
