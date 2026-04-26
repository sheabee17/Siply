import { useEffect, useState, useCallback } from 'react';

const API_URL = 'http://localhost:3001';

export type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  avatar?: string;
  reviews: {
    id: string;
    rating: number;
    comment: string;
    cafe: {
      id: string;
      name: string;
      slug: string;
      images: { url: string }[];
    };
  }[];
};

type UseUserResult = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
};

export function useUser(userId: string | undefined): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/users/${userId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: User) => setUser(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId, tick]);

  return { user, loading, error, refresh };
}

export async function updateUser(
  userId: string,
  fields: { name?: string; bio?: string; location?: string }
): Promise<User> {
  const r = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}