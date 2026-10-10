import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { 
  initialWorkItems, 
  initialServicesList, 
  initialBusinessConfig, 
  WorkItem, 
  ServiceItem, 
  BusinessConfig 
} from '@/data/initialData';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolioData.json');

interface PortfolioData {
  workItems: WorkItem[];
  services: ServiceItem[];
  config: BusinessConfig;
}

function getInitialData(): PortfolioData {
  return {
    workItems: initialWorkItems,
    services: initialServicesList,
    config: initialBusinessConfig,
  };
}

async function loadData(): Promise<PortfolioData> {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContent = await fs.promises.readFile(dataFilePath, 'utf8');
      const parsed = JSON.parse(fileContent);
      return {
        workItems: Array.isArray(parsed.workItems) && parsed.workItems.length > 0 
          ? parsed.workItems 
          : initialWorkItems,
        services: Array.isArray(parsed.services) && parsed.services.length > 0 
          ? parsed.services 
          : initialServicesList,
        config: parsed.config 
          ? { ...initialBusinessConfig, ...parsed.config } 
          : initialBusinessConfig,
      };
    }
  } catch (err) {
    console.error('Error reading portfolioData.json:', err);
  }

  // Create initial file if not present
  const initial = getInitialData();
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(dataFilePath, JSON.stringify(initial, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing initial portfolioData.json:', err);
  }
  return initial;
}

async function saveData(data: Partial<PortfolioData>): Promise<PortfolioData> {
  const current = await loadData();
  const updated: PortfolioData = {
    workItems: data.workItems || current.workItems,
    services: data.services || current.services,
    config: data.config ? { ...current.config, ...data.config } : current.config,
  };

  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(dataFilePath, JSON.stringify(updated, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing portfolioData.json:', err);
  }

  return updated;
}

export async function GET() {
  const data = await loadData();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = await saveData(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error('API POST /api/content error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to save data' },
      { status: 500 }
    );
  }
}
