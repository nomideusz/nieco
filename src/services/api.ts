// Base API URL for all requests
const API_BASE_URL = 'https://randomuser.me/api';

// Generic fetch function with error handling
async function fetchData<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Random User API interfaces
export interface User {
  id: {
    name: string;
    value: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  cell: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
}

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  date: string;
}

// Helper function to format user name
export const formatUserName = (user: User): string => {
  return `${user.name.title} ${user.name.first} ${user.name.last}`;
};

// Helper to generate random posts for a user
const generateRandomPosts = (userId: string): Post[] => {
  const postCount = Math.floor(Math.random() * 6) + 1; // 1-6 posts
  const posts: Post[] = [];
  
  const topics = [
    "Moja podróż po Europie",
    "Najlepsze restauracje w mieście",
    "Recenzja najnowszego filmu",
    "Wskazówki dotyczące zdrowego stylu życia",
    "Moje przemyślenia o technologii",
    "Wspomnienia z wakacji",
    "Co sądzę o obecnej sytuacji gospodarczej",
    "Mój ulubiony przepis kulinarny",
    "Relacja z koncertu",
    "Jak prowadzić zrównoważony tryb życia"
  ];
  
  const bodies = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt luctus, nunc nisl aliquam nisl, eget tincidunt nisl nunc vel nunc. Sed euismod, nisl vel tincidunt luctus, nunc nisl aliquam nisl, eget tincidunt nisl nunc vel nunc.",
    "Ostatnio miałem okazję odwiedzić to miejsce i jestem pod wrażeniem. Polecam każdemu, kto szuka nowych doświadczeń i wrażeń. Na pewno tam wrócę w przyszłości!",
    "Po dogłębnej analizie doszedłem do wniosku, że warto inwestować czas w rozwój osobisty. Codzienne małe kroki prowadzą do wielkich zmian w perspektywie czasu.",
    "Dziś chciałbym podzielić się z Wami moimi przemyśleniami na ten temat. Co o tym sądzicie? Jestem ciekawy Waszych opinii i doświadczeń w komentarzach.",
    "To był niezapomniany dzień pełen wrażeń i niesamowitych doświadczeń. Trudno opisać słowami to, co czułem w tamtym momencie. Polecam każdemu przeżyć to na własnej skórze."
  ];
  
  for (let i = 0; i < postCount; i++) {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
    
    posts.push({
      id: `${userId}-${i+1}`,
      title: topics[Math.floor(Math.random() * topics.length)],
      body: bodies[Math.floor(Math.random() * bodies.length)],
      userId: userId,
      date: randomDate.toISOString().split('T')[0]
    });
  }
  
  return posts;
};

// Store posts to maintain consistency between calls
const userPostsCache: Record<string, Post[]> = {};

// API functions
export const userApi = {
  // Get all users - country parameter can filter by nationality (e.g., 'pl' for Poland)
  getUsers: async (count: number = 10, country?: string): Promise<User[]> => {
    const nationalityParam = country ? `&nat=${country}` : '';
    const response = await fetchData<RandomUserResponse>(`/?results=${count}${nationalityParam}`);
    return response.results;
  },
  
  // Get a single user by ID
  getUser: async (userId: string): Promise<User> => {
    // In a real app, we'd fetch a specific user
    // Since Random User API doesn't support this, we'll use the seed parameter
    // to always get the same user for a given ID
    const response = await fetchData<RandomUserResponse>(`/?seed=${userId}&results=1`);
    return response.results[0];
  },
  
  // Get posts for a specific user
  getUserPosts: async (userId: string): Promise<Post[]> => {
    // Check if we already have generated posts for this user
    if (!userPostsCache[userId]) {
      userPostsCache[userId] = generateRandomPosts(userId);
    }
    
    return userPostsCache[userId];
  },
};

export default {
  userApi,
}; 