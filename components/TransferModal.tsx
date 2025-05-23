'use client';
import { Dialog } from '@headlessui/react';
import { Button } from './ui/button';
import { FC } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  transfersLeft: number;
}

export const TransferModal: FC<Props> = ({ open, onClose, transfersLeft }) => (
  <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow relative z-10 w-80">
      <Dialog.Title className="text-lg font-bold mb-2">Maks antall ryttere</Dialog.Title>
      <p className="mb-4">Du har {transfersLeft} overganger igjen.</p>
      <Button onClick={onClose} className="w-full">OK</Button>
    </div>
  </Dialog>
);
