import { NextResponse } from 'next/server';
import { getDbData } from '@/lib/db';

export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.ADMIN_API_KEY || 'default_secret_key_123';
  
  if (apiKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = getDbData();
    
    const toolsReport = data.tools.map((tool) => {
      const titleLen = tool.title?.length || 0;
      const descLen = tool.description?.length || 0;
      const keywords = tool.keywords ? tool.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];
      
      let titleStatus = 'Good';
      if (titleLen < 30) titleStatus = 'Too Short';
      else if (titleLen > 70) titleStatus = 'Too Long';

      let descStatus = 'Good';
      if (descLen < 80) descStatus = 'Too Short';
      else if (descLen > 160) descStatus = 'Too Long';

      return {
        slug: tool.slug,
        name: tool.name,
        category: tool.category,
        titleLength: titleLen,
        titleStatus,
        descriptionLength: descLen,
        descriptionStatus: descStatus,
        keywordsCount: keywords.length,
        hasFAQ: tool.faqs && tool.faqs.length > 0,
        faqsCount: tool.faqs?.length || 0
      };
    });

    const blogsReport = data.blogs.map((post) => {
      const titleLen = post.title?.length || 0;
      const descLen = post.metaDescription?.length || 0;

      let titleStatus = 'Good';
      if (titleLen < 30) titleStatus = 'Too Short';
      else if (titleLen > 70) titleStatus = 'Too Long';

      let descStatus = 'Good';
      if (descLen < 80) descStatus = 'Too Short';
      else if (descLen > 160) descStatus = 'Too Long';

      return {
        slug: post.slug,
        title: post.title,
        titleLength: titleLen,
        titleStatus,
        descriptionLength: descLen,
        descriptionStatus: descStatus,
        date: post.date,
        keyword: post.keyword
      };
    });

    // Compute summary stats
    const totalTools = data.tools.length;
    const totalBlogs = data.blogs.length;
    const toolsWithWarnings = toolsReport.filter(
      (t) => t.titleStatus !== 'Good' || t.descriptionStatus !== 'Good' || !t.hasFAQ || t.keywordsCount === 0
    ).length;
    
    const blogsWithWarnings = blogsReport.filter(
      (b) => b.titleStatus !== 'Good' || b.descriptionStatus !== 'Good'
    ).length;

    return NextResponse.json({
      summary: {
        totalTools,
        totalBlogs,
        toolsWithWarnings,
        blogsWithWarnings,
        healthyToolsCount: totalTools - toolsWithWarnings,
        healthyBlogsCount: totalBlogs - blogsWithWarnings
      },
      tools: toolsReport,
      blogs: blogsReport
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
