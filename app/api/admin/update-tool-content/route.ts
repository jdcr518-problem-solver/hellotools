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
    const { slug, howToUse, formula, faqs } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    const data = getDbData();
    const toolIndex = data.tools.findIndex((t) => t.slug === slug);
    
    if (toolIndex === -1) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    if (howToUse !== undefined) data.tools[toolIndex].howToUse = howToUse;
    if (formula !== undefined) data.tools[toolIndex].formula = formula;
    if (faqs !== undefined && Array.isArray(faqs)) data.tools[toolIndex].faqs = faqs;

    saveDbData(data);

    return NextResponse.json({ success: true, tool: data.tools[toolIndex] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
