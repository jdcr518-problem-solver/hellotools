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
    const { slug, title, description, keywords } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    const data = getDbData();
    const toolIndex = data.tools.findIndex((t) => t.slug === slug);
    
    if (toolIndex === -1) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    if (title !== undefined) data.tools[toolIndex].title = title;
    if (description !== undefined) data.tools[toolIndex].description = description;
    if (keywords !== undefined) data.tools[toolIndex].keywords = keywords;

    saveDbData(data);

    return NextResponse.json({ success: true, tool: data.tools[toolIndex] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
