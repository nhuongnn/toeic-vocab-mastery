import { NextResponse } from 'next/server';
import { generateRoleplaySuggestions } from '@/lib/roleplay/router';
import { CharacterConfig, RoleplayScenario } from '@/types/roleplay';
import { AIModelPreference } from '@/lib/ai/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { character, scenario, chatHistory, targetScore, providerPreference, userId, userEmail, guestId } = body as {
      character: CharacterConfig;
      scenario: RoleplayScenario;
      chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
      targetScore?: number;
      providerPreference?: AIModelPreference;
      userId?: string;
      userEmail?: string;
      guestId?: string;
    };

    if (!character || !scenario) {
      return NextResponse.json(
        { error: 'character and scenario are required' },
        { status: 400 }
      );
    }

    const effectiveUserId = userId || request.headers.get('x-user-id') || undefined;
    const effectiveEmail = userEmail || request.headers.get('x-user-email') || undefined;
    const effectiveGuestId = guestId || request.headers.get('x-guest-id') || undefined;

    const suggestions = await generateRoleplaySuggestions(
      character,
      scenario,
      chatHistory || [],
      targetScore || 650,
      providerPreference || 'auto',
      { userId: effectiveUserId, userEmail: effectiveEmail, guestId: effectiveGuestId }
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
