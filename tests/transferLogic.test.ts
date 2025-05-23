import { describe, it, expect } from 'vitest';
import { MAX_TRANSFERS } from '../lib/constants';

describe('transfer logic', () => {
  it('limits number of transfers', () => {
    let transfers = 0;
    const add = () => {
      if (transfers >= MAX_TRANSFERS) return false;
      transfers += 1;
      return true;
    };
    for (let i = 0; i < MAX_TRANSFERS; i++) expect(add()).toBe(true);
    expect(add()).toBe(false);
  });
});
