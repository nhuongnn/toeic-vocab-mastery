import { NextResponse } from 'next/server';
import { generateDynamicOpening } from '@/lib/roleplay/router';
import { CharacterConfig, RoleplayScenario, UserLearningContext } from '@/types/roleplay';
import { AIModelPreference } from '@/lib/ai/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { character, scenario, userContext, userName, providerPreference } = body as {
      character: CharacterConfig;
      scenario: RoleplayScenario;
      userContext?: Partial<UserLearningContext>;
      userName?: string;
      providerPreference?: AIModelPreference;
    };

    if (!character || !scenario) {
      return NextResponse.json(
        { error: 'character and scenario are required fields' },
        { status: 400 }
      );
    }

    const opening = await generateDynamicOpening(
      character,
      scenario,
      userContext,
      userName,
      providerPreference || 'auto'
    );
    return NextResponse.json(opening);
  } catch (error: unknown) {
    console.error('API /api/roleplay/opening error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
