import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.ADMIN_API_KEY || 'default_secret_key_123';
  
  if (apiKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { heroHeadline, heroSubheadline, featuredTools } = body;

    const data = getDbData();

    if (heroHeadline !== undefined) data.homepage.heroHeadline = heroHeadline;
    if (heroSubheadline !== undefined) data.homepage.heroSubheadline = heroSubheadline;
    
    if (featuredTools !== undefined) {
      if (!Array.isArray(featuredTools)) {
        return NextResponse.json({ error: 'featuredTools must be an array of slugs' }, { status: 400 });
      }
      
      // Validate all slugs exist
      const invalidSlugs = featuredTools.filter(
        (slug) => !data.tools.some((t) => t.slug === slug)
      );
      
      if (invalidSlugs.length > 0) {
        return NextResponse.json(
          { error: `Invalid featured tools slugs: ${invalidSlugs.join(', ')}` },
          { status: 400 }
        );
      }
      data.homepage.featuredTools = featuredTools;
    }

    saveDbData(data);

    return NextResponse.json({ success: true, homepage: data.homepage });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
