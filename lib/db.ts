import fs from 'fs';
import path from 'path';
import dbJsonData from '@/data/db.json';
import { toolsMaster, ToolMetadata } from '@/data/tools-master';

export interface BlogPost {
  title: string;
  content: string;
  slug: string;
  metaDescription: string;
  keyword: string;
  date: string;
  readingTime: string;
}

export interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  featuredTools: string[];
}

export interface DBData {
  tools: ToolMetadata[];
  blogs: BlogPost[];
  homepage: HomepageContent;
}

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

export function getDbData(): DBData {
  let base: DBData | null = null;
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      base = JSON.parse(content);
    } catch (err) {
      base = null;
    }
  }

  if (!base) {
    base = JSON.parse(JSON.stringify(dbJsonData)) as DBData;
  }

  // Ensure all bundled tools exist in base.tools
  const existingSlugs = new Set((base.tools || []).map((t) => t.slug));
  const bundledTools = (dbJsonData as DBData).tools || [];
  for (const t of bundledTools) {
    if (!existingSlugs.has(t.slug)) {
      base.tools.push(t);
    }
  }

  return base;
}

export function saveDbData(data: DBData) {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
