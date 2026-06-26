import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function DELETE(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.ADMIN_API_KEY || 'default_secret_key_123';
  
  if (apiKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Read slug from query parameters or body
    const url = new URL(request.url);
    let slug = url.searchParams.get('slug');

    if (!slug) {
      try {
        const body = await request.json();
        slug = body.slug;
      } catch (e) {
        // Body was empty or invalid
      }
    }

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    const data = getDbData();
    const blogIndex = data.blogs.findIndex((b) => b.slug === slug);

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    data.blogs.splice(blogIndex, 1);
    saveDbData(data);

    return NextResponse.json({ success: true, message: `Successfully deleted blog: ${slug}` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
