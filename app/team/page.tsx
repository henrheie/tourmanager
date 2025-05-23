'use client';
import { useState, use } from "react";
import { useRiders } from '@/lib/fetchers';
import { BudgetBar } from '@/components/BudgetBar';
import { RiderCard } from '@/components/RiderCard';
import { CategoryTabs } from '@/components/CategoryTabs';
import { TransferModal } from '@/components/TransferModal';
import { CATEGORY_LIMITS, TOTAL_BUDGET, MAX_TRANSFERS } from '@/lib/constants';

interface Rider {
  id: number;
  name: string;
  team: string;
  price: number;
  category: keyof typeof CATEGORY_LIMITS;
  ownership: number;
}

export default function TeamPage() {
  const { data: riders } = use(useRiders());
  const [selectedCat, setCat] = useState(0);
  const [squad, setSquad] = useState<Rider[]>([]);
  const [transfers, setTransfers] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    'Kapteiner',
    'Spurtere',
    'Klatrere',
    'Tempo-ryttere',
    'Ungdom',
    'Hjelperyttere',
  ];

  const addRider = (id: number) => {
    const rider = riders.find((r: Rider) => r.id === id);
    if (!rider) return;
    if (squad.length >= 15) {
      if (transfers >= MAX_TRANSFERS) {
        setShowModal(true);
        return;
      }
      setTransfers((t) => t + 1);
    }
    setSquad((s) => [...s, rider]);
  };

  const spent = squad.reduce((s, r) => s + r.price, 0);
  return (
    <div className="p-4">
      <BudgetBar spent={spent} />
      <CategoryTabs
        categories={categories}
        selected={selectedCat}
        onChange={setCat}
      />
      <div className="mt-4">
        {riders
          .filter((r: Rider) => r.category === Object.keys(CATEGORY_LIMITS)[selectedCat])
          .map((r: Rider) => (
            <RiderCard key={r.id} rider={r} onAdd={addRider} />
          ))}
      </div>
      <TransferModal
        open={showModal}
        onClose={() => setShowModal(false)}
        transfersLeft={MAX_TRANSFERS - transfers}
      />
    </div>
  );
}
