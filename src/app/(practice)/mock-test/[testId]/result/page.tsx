import React, { Suspense } from 'react';
import { MockTestResultClient } from './MockTestResultClient';

interface Props {
  params: Promise<{ testId: string }>;
}

export async function generateStaticParams() {
  return [
    { testId: 'mini-reading' },
    { testId: 'full-reading' },
  ];
}

export default async function MockTestResultPage({ params }: Props) {
  const { testId } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      }
    >
      <MockTestResultClient testId={testId} />
    </Suspense>
  );
}
