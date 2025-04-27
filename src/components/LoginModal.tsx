import { createSignal, Show, JSX, onMount } from "solid-js";
import userStore from "../store/userStore";

const LoginModal = (): JSX.Element => {
  const { login, register, isLoginModalOpen, setIsLoginModalOpen } = userStore;
  
  const [isLogin, setIsLogin] = createSignal(true);
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  
  // Debug information
  onMount(() => {
    console.log("LoginModal mounted");
    console.log("isLoginModalOpen initial value:", isLoginModalOpen());
  });
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    console.log("Form submitted");
    setError("");
    
    if (!email()) {
      setError("Email jest wymagany");
      return;
    }
    
    if (!password()) {
      setError("Hasło jest wymagane");
      return;
    }
    
    if (!isLogin() && !name()) {
      setError("Imię jest wymagane");
      return;
    }
    
    try {
      let success;
      
      if (isLogin()) {
        console.log("Attempting login with:", email());
        success = await login(email(), password());
      } else {
        console.log("Attempting registration with:", email(), name());
        success = await register(name(), email(), password());
      }
      
      console.log("Login/registration result:", success);
      
      if (!success) {
        setError("Nieprawidłowe dane logowania");
      } else {
        // Close modal on successful login/registration
        setIsLoginModalOpen(false);
      }
    } catch (err) {
      setError("Wystąpił błąd podczas przetwarzania żądania");
      console.error(err);
    }
  };
  
  const closeModal = () => {
    console.log("Closing modal");
    setIsLoginModalOpen(false);
  };
  
  console.log("Rendering LoginModal, isOpen:", isLoginModalOpen());
  
  return (
    <Show when={isLoginModalOpen()}>
      <div 
        style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn var(--transition-fast) forwards;
        "
        onClick={(e) => {
          // Close modal when clicking outside
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div style="
          background-color: white;
          border-radius: var(--border-radius-lg);
          padding: 32px;
          width: 100%;
          max-width: 420px;
          box-shadow: var(--card-shadow);
          animation: slideDown var(--transition-medium) forwards;
        ">
          <div style="
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 24px;
          ">
            <h2 style="
              margin: 0; 
              color: var(--primary-color);
              font-size: 1.5rem;
              font-weight: 600;
            ">
              {isLogin() ? 'Zaloguj się' : 'Załóż konto'}
            </h2>
            <button 
              onClick={closeModal} 
              style="
                background: none; 
                border: none; 
                font-size: 1.5rem; 
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0 5px;
                line-height: 1;
                transition: all var(--transition-fast);
                border-radius: var(--border-radius-full);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                  background-color: var(--bg-light);
                }
              "
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Show when={!isLogin()}>
              <div style="margin-bottom: 16px;">
                <label 
                  for="name" 
                  style="
                    display: block; 
                    margin-bottom: 8px; 
                    color: var(--text-secondary); 
                    font-weight: 500;
                    font-size: 0.9rem;
                  "
                >
                  Imię
                </label>
                <input 
                  id="name"
                  type="text" 
                  value={name()} 
                  onInput={(e) => setName((e.target as HTMLInputElement).value)}
                  style="
                    width: 100%; 
                    padding: 12px 16px; 
                    border: 1px solid var(--border-color); 
                    border-radius: var(--border-radius-md);
                    font-size: 1rem;
                    box-sizing: border-box;
                    transition: all var(--transition-fast);
                    &:focus {
                      border-color: var(--primary-color);
                      outline: none;
                      box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.1);
                    }
                  "
                />
              </div>
            </Show>
            
            <div style="margin-bottom: 16px;">
              <label 
                for="email" 
                style="
                  display: block; 
                  margin-bottom: 8px; 
                  color: var(--text-secondary); 
                  font-weight: 500;
                  font-size: 0.9rem;
                "
              >
                Email
              </label>
              <input 
                id="email"
                type="email" 
                value={email()} 
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                style="
                  width: 100%; 
                  padding: 12px 16px; 
                  border: 1px solid var(--border-color); 
                  border-radius: var(--border-radius-md);
                  font-size: 1rem;
                  box-sizing: border-box;
                  transition: all var(--transition-fast);
                  &:focus {
                    border-color: var(--primary-color);
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.1);
                  }
                "
              />
            </div>
            
            <div style="margin-bottom: 24px;">
              <label 
                for="password" 
                style="
                  display: block; 
                  margin-bottom: 8px; 
                  color: var(--text-secondary); 
                  font-weight: 500;
                  font-size: 0.9rem;
                "
              >
                Hasło
              </label>
              <input 
                id="password"
                type="password" 
                value={password()} 
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                style="
                  width: 100%; 
                  padding: 12px 16px; 
                  border: 1px solid var(--border-color); 
                  border-radius: var(--border-radius-md);
                  font-size: 1rem;
                  box-sizing: border-box;
                  transition: all var(--transition-fast);
                  &:focus {
                    border-color: var(--primary-color);
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.1);
                  }
                "
              />
            </div>
            
            <Show when={error()}>
              <div style="
                margin-bottom: 16px; 
                padding: 12px 16px; 
                background-color: rgba(231, 76, 60, 0.1); 
                border-radius: var(--border-radius-md); 
                color: var(--danger-color);
                font-size: 0.9rem;
                border-left: 3px solid var(--danger-color);
              ">
                {error()}
              </div>
            </Show>
            
            <button 
              type="submit" 
              class="btn btn-primary"
              style="
                width: 100%; 
                padding: 14px; 
                font-size: 1rem;
                font-weight: 500;
                margin-bottom: 20px;
              "
            >
              {isLogin() ? 'Zaloguj się' : 'Załóż konto'}
            </button>
            
            <div style="
              text-align: center; 
              border-top: 1px solid var(--border-color); 
              padding-top: 16px;
            ">
              <p style="
                color: var(--text-secondary); 
                margin: 0 0 8px 0;
                font-size: 0.9rem;
              ">
                {isLogin() ? 'Nie masz jeszcze konta?' : 'Masz już konto?'}
              </p>
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin())}
                style="
                  background: none; 
                  border: none; 
                  color: var(--primary-color); 
                  cursor: pointer;
                  font-size: 0.95rem;
                  font-weight: 500;
                  transition: all var(--transition-fast);
                  &:hover {
                    text-decoration: underline;
                  }
                "
              >
                {isLogin() ? 'Załóż konto' : 'Zaloguj się'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
};

export default LoginModal; 