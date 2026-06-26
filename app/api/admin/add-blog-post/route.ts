import { NextResponse } from 'next/server';
import { getDbData, saveDbData, BlogPost } from '@/lib/db';

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.ADMIN_API_KEY || 'default_secret_key_123';
  
  if (apiKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, slug, metaDescription, keyword, date, readingTime } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and Content are required fields' }, { status: 400 });
    }

    const data = getDbData();
    
    // Auto generate slug if missing
    let targetSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Ensure unique slug
    let finalSlug = targetSlug;
    let counter = 1;
    while (data.blogs.some((b) => b.slug === finalSlug)) {
      finalSlug = `${targetSlug}-${counter}`;
      counter++;
    }

    const newPost: BlogPost = {
      title,
      content,
      slug: finalSlug,
      metaDescription: metaDescription || title,
      keyword: keyword || 'guide',
      date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readingTime: readingTime || '3 min read'
    };

    data.blogs.unshift(newPost);
    saveDbData(data);

    return NextResponse.json({ success: true, blog: newPost });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
