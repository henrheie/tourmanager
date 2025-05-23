'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRiders } from '@/lib/fetchers';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { data: riders } = useRiders();
  return (
    <main className="p-4">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-4">
        TV 2 Tourmanager
      </motion.h1>
      <Link href="/team">
        <Button variant="secondary" className="mb-4">Logg inn / Registrer</Button>
      </Link>
      <section>
        <h2 className="text-xl font-semibold mb-2">Topp ryttere</h2>
        <ul>
          {riders.slice(0, 3).map((r: any) => (
            <li key={r.id}>{r.name} - {r.ownership}%</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
