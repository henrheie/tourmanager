
'use client';
import { useStages } from '@/lib/fetchers';
import { notFound } from 'next/navigation';

export default function StagePage({ params }: { params: { id: string } }) {
  const { data: stages } = useStages();
  const stage = stages.find((s: any) => String(s.id) === params.id);
  if (!stage) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{stage.name}</h1>
      <p>{stage.start} → {stage.finish}</p>
      <img src="/images/placeholder.svg" alt="Stage map" className="my-4" />
    </div>
  );
}
