/**
 * Nullward Likes API - Cloudflare Worker
 *
 * Handles like/unlike functionality for blog posts
 * Uses Cloudflare KV for storage
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Cloudflare Dashboard > Workers & Pages
 * 2. Create a new Worker called "nullward-likes"
 * 3. Paste this code into the worker
 * 4. Go to Settings > Variables > KV Namespace Bindings
 * 5. Create a new KV namespace called "LIKES"
 * 6. Bind it with Variable name: LIKES
 * 7. Deploy!
 *
 * Your API will be at: https://nullward-likes.YOUR_SUBDOMAIN.workers.dev
 * Update the LIKES_API variable in post.njk to match.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routes
    // GET /likes/:slug - Get like count
    // POST /like/:slug - Add a like
    // POST /unlike/:slug - Remove a like

    const match = path.match(/^\/(likes|like|unlike)\/(.+)$/);

    if (!match) {
      return new Response(
        JSON.stringify({ error: 'Invalid endpoint' }),
        { status: 404, headers: corsHeaders }
      );
    }

    const [, action, slug] = match;
    const key = `likes:${slug}`;

    try {
      if (action === 'likes' && request.method === 'GET') {
        // Get current count
        const count = await env.LIKES.get(key);
        return new Response(
          JSON.stringify({ slug, count: parseInt(count || '0') }),
          { headers: corsHeaders }
        );
      }

      if (action === 'like' && request.method === 'POST') {
        // Increment like
        const current = parseInt(await env.LIKES.get(key) || '0');
        const newCount = current + 1;
        await env.LIKES.put(key, newCount.toString());
        return new Response(
          JSON.stringify({ slug, count: newCount }),
          { headers: corsHeaders }
        );
      }

      if (action === 'unlike' && request.method === 'POST') {
        // Decrement like (min 0)
        const current = parseInt(await env.LIKES.get(key) || '0');
        const newCount = Math.max(0, current - 1);
        await env.LIKES.put(key, newCount.toString());
        return new Response(
          JSON.stringify({ slug, count: newCount }),
          { headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: corsHeaders }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
