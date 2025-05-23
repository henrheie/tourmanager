'use client';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { FC } from 'react';

interface Rider {
  id: number;
  name: string;
  team: string;
  price: number;
  ownership: number;
}

interface Props {
  rider: Rider;
  onAdd: (id: number) => void;
}

export const RiderCard: FC<Props> = ({ rider, onAdd }) => (
  <Card className="mb-2" aria-label={rider.name}>
    <CardContent className="flex justify-between items-center p-2">
      <div>
        <p className="font-semibold">{rider.name}</p>
        <p className="text-sm text-gray-500">{rider.team}</p>
        <p className="text-sm">{rider.price} mill.</p>
      </div>
      <div className="text-right">
        <p className="text-sm">{rider.ownership}% eier</p>
        <Button onClick={() => onAdd(rider.id)} aria-label="Add rider">
          +
        </Button>
      </div>
    </CardContent>
  </Card>
);
