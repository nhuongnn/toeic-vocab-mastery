import { NextResponse } from 'next/server';
import { generateRoleplaySuggestions } from '@/lib/roleplay/router';
import { CharacterConfig, RoleplayScenario } from '@/types/roleplay';
import { AIModelPreference } from '@/lib/ai/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { character, scenario, chatHistory, targetScore, providerPreference } = body as {
      character: CharacterConfig;
      scenario: RoleplayScenario;
      chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
      targetScore?: number;
      providerPreference?: AIModelPreference;
    };

    if (!character || !scenario) {
      return NextResponse.json(
        { error: 'character and scenario are required' },
        { status: 400 }
      );
    }

    const suggestions = await generateRoleplaySuggestions(
      character,
      scenario,
      chatHistory || [],
      targetScore || 650,
      providerPreference || 'auto'
    );

    return NextResponse.json({
      success: true,
      suggestions,
    });
  } catch (error: unknown) {
    console.error('API /api/roleplay/suggest error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
        suggestions: [],
      },
      { status: 500 }
    );
  }
}
