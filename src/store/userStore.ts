import { createSignal, createEffect, createRoot } from "solid-js";
import { createStore } from "solid-js/store";

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
}

interface UserStore {
  user: User;
  isLoginModalOpen: () => boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Funkcja do wczytywania stanu użytkownika z localStorage
function loadUserState(): User {
  if (typeof window === 'undefined') {
    return {
      id: null,
      name: null,
      email: null,
      isLoggedIn: false
    };
  }
  
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      return JSON.parse(savedUser);
    } catch (e) {
      console.error("Błąd wczytywania stanu użytkownika:", e);
    }
  }
  
  return {
    id: null,
    name: null,
    email: null,
    isLoggedIn: false
  };
}

// Tworzenie i eksportowanie magazynu użytkownika
export function createUserStore(): UserStore {
  const [user, setUser] = createStore<User>(loadUserState());
  const [_isLoginModalOpen, _setIsLoginModalOpen] = createSignal(false);
  
  // Debug-friendly wrappers
  const isLoginModalOpen = () => {
    const result = _isLoginModalOpen();
    console.log("isLoginModalOpen called, value:", result);
    return result;
  };
  
  const setIsLoginModalOpen = (isOpen: boolean) => {
    console.log("setIsLoginModalOpen called with value:", isOpen);
    _setIsLoginModalOpen(isOpen);
    // Log after setting to verify
    console.log("Modal state after change:", _isLoginModalOpen());
    return isOpen;
  };
  
  // Wrap effects in createRoot to ensure proper disposal
  createRoot(() => {
    // Zapisuj stan użytkownika przy każdej zmianie
    createEffect(() => {
      if (typeof window === 'undefined') return;
      localStorage.setItem('user', JSON.stringify(user));
    });
  });
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Symulacja logowania - w rzeczywistej aplikacji tutaj byłoby połączenie z API
    try {
      // Sprawdzenie danych logowania
      if (email === 'test@example.com' && password === 'password') {
        setUser({
          id: '1',
          name: 'Jan Kowalski',
          email: email,
          isLoggedIn: true
        });
        setIsLoginModalOpen(false);
        return true;
      } else if (email && password) {
        // Uproszczone logowanie testowe (dowolny email/hasło)
        setUser({
          id: '2',
          name: email.split('@')[0],
          email: email,
          isLoggedIn: true
        });
        setIsLoginModalOpen(false);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Błąd logowania:", e);
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Symulacja rejestracji - w rzeczywistej aplikacji tutaj byłoby połączenie z API
    try {
      setUser({
        id: '3',
        name: name,
        email: email,
        isLoggedIn: true
      });
      setIsLoginModalOpen(false);
      return true;
    } catch (e) {
      console.error("Błąd rejestracji:", e);
      return false;
    }
  };
  
  const logout = () => {
    setUser({
      id: null,
      name: null,
      email: null,
      isLoggedIn: false
    });
  };
  
  return {
    user,
    isLoginModalOpen,
    setIsLoginModalOpen,
    login,
    register,
    logout
  };
}

// Singleton instancja magazynu
const userStore: UserStore = createUserStore();
export default userStore; 