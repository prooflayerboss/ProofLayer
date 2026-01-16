import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== TEST ENDPOINT HIT ===');
  console.log('Headers:', Object.fromEntries(request.headers.entries()));
  console.log('URL:', request.url);

  return NextResponse.json({
    success: true,
    message: 'Test endpoint working',
    url: request.url,
    headers: Object.fromEntries(request.headers.entries())
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'GET test endpoint working'
  });
}
