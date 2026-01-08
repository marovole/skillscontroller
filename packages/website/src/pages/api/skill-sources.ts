import type { APIRoute } from 'astro';
import { SKILL_TO_SOURCE } from '../../data/skill-sources';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(SKILL_TO_SOURCE), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
