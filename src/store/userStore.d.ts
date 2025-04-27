interface User {
  id?: string;
  email?: string;
  name?: string;
  isLoggedIn: boolean;
  lastLogin?: string;
}

interface UserStore {
  user: User;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name?: string) => boolean;
  isLoginModalOpen: () => boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

declare const userStore: UserStore;
export default userStore;

export function createUserStore(): UserStore; 