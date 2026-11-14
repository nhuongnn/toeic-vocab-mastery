import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getWordById, allVocabularyWords } from '@/data/vocabulary';
import { WordDetail } from '@/components/word/WordDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allVocabularyWords.map((word) => ({
    slug: word.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const word = getWordById(slug);
  if (!word) return { title: 'Word Not Found' };

  return {
    title: `${word.word.toUpperCase()} • Deep Vocabulary Mastery`,
    description: word.deepMeaning.coreConcept,
  };
}

async function WordDetailContent({ params }: Props) {
  const { slug } = await params;
  const word = getWordById(slug);

  if (!word) {
    notFound();
    return null;
  }

  // Find previous and next words for fluid navigation
  const currentIndex = allVocabularyWords.findIndex((w) => w.id === word.id);
  const previousWord = currentIndex > 0 ? allVocabularyWords[currentIndex - 1] : undefined;
  const nextWord =
    currentIndex < allVocabularyWords.length - 1
      ? allVocabularyWords[currentIndex + 1]
      : undefined;

  return (
    <WordDetail
      key={word.id}
      word={word}
      previousWordId={previousWord?.id}
      nextWordId={nextWord?.id}
    />
  );
}

function WordDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-800 rounded w-24" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-slate-800 rounded-xl" />
          <div className="h-8 w-20 bg-slate-800 rounded-xl" />
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 bg-slate-800 rounded-lg w-48" />
          <div className="h-6 bg-slate-800 rounded-full w-20" />
        </div>
        <div className="h-5 bg-slate-800 rounded w-36" />
        <div className="h-16 bg-slate-800/60 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-slate-900/60 border border-slate-800/80 rounded-2xl" />
        <div className="h-48 bg-slate-900/60 border border-slate-800/80 rounded-2xl" />
      </div>
    </div>
  );
}

export default function WordDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<WordDetailSkeleton />}>
      <WordDetailContent params={params} />
    </Suspense>
  );
}
