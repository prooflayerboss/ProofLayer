import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const widgetPath = path.join(process.cwd(), 'public', 'widget.js');
    const widgetCode = fs.readFileSync(widgetPath, 'utf-8');

    return new NextResponse(widgetCode, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error serving widget.js:', error);
    return new NextResponse('Widget not found', { status: 404 });
  }
}
