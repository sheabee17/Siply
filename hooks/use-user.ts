/**
 * useUser — fetch a user by id.
 *
 * Currently returns mock data synchronously. When the backend is ready,
 * swap the inside of this hook for a fetch/react-query call. The shape
 * of the returned object ({ user, loading, error }) stays the same so
 * no UI components need to change.
 */

import { useEffect, useState } from 'react';
import { mockUsers, type User } from '../data/mock-users';

type UseUserResult = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};

export function useUser(userId: string | undefined): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // --- MOCK IMPLEMENTATION ---
    // Simulate a short async delay so the loading state is testable.
    const timer = setTimeout(() => {
      const found = mockUsers[userId];
      if (found) {
        setUser(found);
      } else {
        setError(new Error(`User not found: ${userId}`));
        setUser(null);
      }
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);

    // --- REAL BACKEND IMPLEMENTATION (example) ---
    // Replace the block above with something like:
    //
    // fetch(`${API_URL}/users/${userId}`)
    //   .then((r) => {
    //     if (!r.ok) throw new Error(`HTTP ${r.status}`);
    //     return r.json();
    //   })
    //   .then((data: User) => setUser(data))
    //   .catch((err) => setError(err))
    //   .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
