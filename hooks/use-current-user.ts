/**
 * useCurrentUser — returns the id of the currently-logged-in user.
 *
 * Placeholder implementation. When auth is wired up, replace the body
 * with a call to your auth context / session store.
 */

import { CURRENT_USER_ID } from '../data/mock-users';

export function useCurrentUser(): { currentUserId: string | null } {
  // TODO: replace with real auth state, e.g.:
  //   const { session } = useAuth();
  //   return { currentUserId: session?.userId ?? null };
  return { currentUserId: CURRENT_USER_ID };
}
