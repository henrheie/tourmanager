'use client';
import { Tab } from '@headlessui/react';
import { FC, Fragment } from 'react';

interface Props {
  categories: string[];
  selected: number;
  onChange: (index: number) => void;
}

export const CategoryTabs: FC<Props> = ({ categories, selected, onChange }) => (
  <Tab.Group selectedIndex={selected} onChange={onChange}>
    <Tab.List className="flex space-x-1 rounded bg-gray-200 p-1">
      {categories.map((cat) => (
        <Tab key={cat} as={Fragment}>
          {({ selected }) => (
            <button
              className={`w-full py-2 text-sm font-medium rounded ${
                selected ? 'bg-primary text-white' : 'bg-white'
              }`}
            >
              {cat}
            </button>
          )}
        </Tab>
      ))}
    </Tab.List>
  </Tab.Group>
);
