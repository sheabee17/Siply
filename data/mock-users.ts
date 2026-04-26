export type UserReview = {
  id: string;
  cafeId: string;
  cafeSlug: string;
  cafeName: string;
  cafeImage: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  avatar: string;
  activeSince: string;
  followers: number;
  following: number;
  dayStreak: number;
  reviews: UserReview[];
};

export const mockUsers: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Coffee lover & digital nomad. Always searching for the perfect cup.',
    location: 'San Antonio, TX',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    activeSince: '2024',
    followers: 128,
    following: 84,
    dayStreak: 7,
    reviews: [
      {
        id: 'r1',
        cafeId: 'cafe-1',
        cafeSlug: 'The-Daily-Grind',
        cafeName: 'The Daily Grind',
        cafeImage: 'https://s.hdnux.com/photos/01/34/02/76/24129409/5/rawImage.jpg',
        rating: 4,
        reviewText: 'Amazing coffee and cozy atmosphere! Not too loud either.',
        createdAt: '2025-01-15T10:00:00Z',
      },
      {
        id: 'r2',
        cafeId: 'cafe-2',
        cafeSlug: 'Brew-and-Co',
        cafeName: 'The Bean Bar',
        cafeImage: 'https://s.hdnux.com/photos/01/34/10/33/24151789/3/rawImage.jpg',
        rating: 5,
        reviewText: 'Absolutely loved this café. The coffee was rich and flavorful, and the space was bright and inviting.',
        createdAt: '2025-02-02T14:30:00Z',
      },
    ],
  },
  'user-2': {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Smith',
    bio: 'Barista by day, latte art enthusiast by night. ☕',
    location: 'Austin, TX',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    activeSince: '2023',
    followers: 312,
    following: 145,
    dayStreak: 22,
    reviews: [
      {
        id: 'r3',
        cafeId: 'cafe-1',
        cafeSlug: 'The-Daily-Grind',
        cafeName: 'The Daily Grind',
        cafeImage: 'https://s.hdnux.com/photos/01/34/02/76/24129409/5/rawImage.jpg',
        rating: 5,
        reviewText: 'Great place to work, love the outlet availability!',
        createdAt: '2025-03-10T08:15:00Z',
      },
      {
        id: 'r4',
        cafeId: 'cafe-1',
        cafeSlug: 'The-Daily-Grind',
        cafeName: 'The Daily Grind',
        cafeImage: 'https://s.hdnux.com/photos/01/34/02/76/24129409/5/rawImage.jpg',
        rating: 4,
        reviewText: 'Friendly staff and delicious pastries!',
        createdAt: '2025-03-18T09:00:00Z',
      },
    ],
  },
};

// Which user is "you" — in a real app this comes from auth.
export const CURRENT_USER_ID = 'user-1';