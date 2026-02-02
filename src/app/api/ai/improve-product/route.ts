import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { name, tagline, category, stage, offerDescription } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    const prompt = `You are a marketing expert helping founders create compelling product listings for a marketplace that connects them with early adopters.

Given this product information:
- Name: ${name}
- Category: ${category || 'Not specified'}
- Stage: ${stage || 'Not specified'}
- Current tagline: ${tagline || 'None provided'}
- Current offer: ${offerDescription || 'None provided'}

Generate improved versions that are:
1. Concise and punchy (tagline should be under 80 characters)
2. Benefit-focused, not feature-focused
3. Creates urgency and excitement
4. Sounds human, not corporate

Respond in JSON format only:
{
  "tagline": "Your improved tagline here",
  "offerDescription": "Your improved early adopter offer here (2-3 sentences max)"
}

Only output the JSON, nothing else.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const improved = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      tagline: improved.tagline,
      offerDescription: improved.offerDescription,
    });
  } catch (error) {
    console.error('AI improve error:', error);
    return NextResponse.json(
      { error: 'Failed to improve content' },
      { status: 500 }
    );
  }
}
