import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export function useRiders() {
  return useSWR('/api/riders', fetcher, { suspense: true });
}

export function useStages() {
  return useSWR('/api/stages', fetcher, { suspense: true });
}

export function useLeaderboard() {
  return useSWR('/api/leaderboard', fetcher, { suspense: true });
}
