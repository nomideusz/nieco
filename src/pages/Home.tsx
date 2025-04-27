import { createSignal, Show, onMount } from 'solid-js';
import { redirect, action, useNavigate } from "@solidjs/router";
import userStore from '../store/userStore';

// Akcja z przekierowaniem
const logout = action(async () => {
  // Tutaj mogłaby być logika wylogowania, np. czyszczenie localStorage
  console.log("Wylogowywanie użytkownika...");
  // Symulacja opóźnienia operacji
  await new Promise(resolve => setTimeout(resolve, 500));
  throw redirect("/dashboard");
});

const Home = () => {
  const navigate = useNavigate();
  const { user, setIsLoginModalOpen } = userStore;
  const [scrolled, setScrolled] = createSignal(false);
  const [showScrollIndicator, setShowScrollIndicator] = createSignal(false);

  const goToDashboard = () => {
    navigate("/dashboard");
  };
  
  // Add scroll effect
  onMount(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check if page is tall enough to warrant a scroll indicator
    const checkPageHeight = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      setShowScrollIndicator(documentHeight > windowHeight + 100);
    };
    
    // Check on load and resize
    checkPageHeight();
    window.addEventListener('resize', checkPageHeight);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkPageHeight);
    };
  });

  return (
    <div style="
      overflow-x: hidden;
      position: relative;
      animation: fadeIn var(--transition-medium) forwards;
    ">
      {/* Animated background elements */}
      <div style="
        position: absolute;
        width: 800px;
        height: 800px;
        background: radial-gradient(circle, rgba(74, 111, 165, 0.03) 0%, rgba(74, 111, 165, 0) 70%);
        border-radius: 50%;
        top: -300px;
        right: -300px;
        z-index: -1;
      "></div>
      <div style="
        position: absolute;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(74, 111, 165, 0.04) 0%, rgba(74, 111, 165, 0) 70%);
        border-radius: 50%;
        bottom: 100px;
        left: -200px;
        z-index: -1;
      "></div>
    
      {/* Hero section with full viewport height */}
      <section style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        padding: 40px 20px;
        overflow: hidden;
      ">
        <div style="
          max-width: 1200px; 
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        ">
          {/* Floating decorative elements */}
          <div style="
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: var(--border-radius-full);
            background: linear-gradient(135deg, rgba(74, 111, 165, 0.1) 0%, rgba(74, 111, 165, 0.05) 100%);
            top: 20px;
            right: -100px;
            animation: float 15s ease-in-out infinite alternate;
            z-index: -1;
          "></div>
          <div style="
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: var(--border-radius-full);
            background: linear-gradient(135deg, rgba(92, 187, 92, 0.1) 0%, rgba(92, 187, 92, 0.05) 100%);
            bottom: 50px;
            left: -50px;
            animation: float 12s ease-in-out infinite alternate-reverse;
            z-index: -1;
          "></div>
          <div style="
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: var(--border-radius-full);
            background: linear-gradient(135deg, rgba(240, 173, 78, 0.1) 0%, rgba(240, 173, 78, 0.05) 100%);
            top: 150px;
            left: 50px;
            animation: float 20s ease-in-out infinite alternate;
            z-index: -1;
          "></div>
          
          {/* Animated logo/app name */}
          <div style="
            margin-bottom: 30px;
            transform: translateY(0);
            transition: transform 0.5s ease;
            position: relative;
            ${scrolled() ? 'transform: translateY(-20px);' : ''}
          ">
            <h1 style="
              font-size: min(4.5rem, 15vw);
              background: linear-gradient(90deg, var(--primary-color) 0%, #6a95df 100%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              text-align: center;
              margin: 0;
              font-weight: 900;
              letter-spacing: -2px;
              line-height: 1.1;
              position: relative;
            ">
              nieco.pl
            </h1>
            <div style="
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: var(--primary-color);
              position: absolute;
              bottom: 15px;
              right: calc(50% - 70px);
              box-shadow: 0 0 10px rgba(74, 111, 165, 0.5);
            "></div>
            <p style="
              font-size: clamp(1rem, 1.5vw, 1.4rem);
              color: var(--text-secondary);
              text-align: center;
              margin: 10px 0 0 0;
              font-weight: 300;
              letter-spacing: 2px;
              opacity: 0.8;
            ">
              TWOJE LEPSZE JUTRO
            </p>
          </div>
          
          {/* Main headline */}
          <div style="
            text-align: center;
            max-width: 800px;
            margin-bottom: 40px;
            transition: all 0.5s ease;
            padding: 0 10px;
            ${scrolled() ? 'transform: scale(0.95);' : ''}
          ">
            <h2 style="
              font-size: clamp(1.8rem, 4vw, 3.2rem);
              color: var(--text-primary);
              margin-bottom: 25px;
              font-weight: 800;
              line-height: 1.2;
            ">
              Buduj <span style="color: var(--primary-color);">lepsze</span> nawyki, 
              twórz <span style="color: var(--success-color);">lepsze</span> życie
            </h2>
            <p style="
              font-size: clamp(1rem, 2vw, 1.3rem);
              color: var(--text-secondary);
              margin: 0 auto;
              line-height: 1.6;
              max-width: 700px;
            ">
              Aplikacja, która pomoże Ci być nieco lepszym każdego dnia poprzez budowanie pozytywnych nawyków i regularność.
            </p>
          </div>
          
          {/* CTA Button */}
          <div style="
            display: flex;
            justify-content: center;
            margin-top: 20px;
            animation: fadeInUp 1s 0.5s both;
            position: relative;
          ">
            <Show when={!user.isLoggedIn} fallback={
              <button 
                onClick={goToDashboard}
                class="btn btn-primary"
                style="
                  padding: 16px 36px; 
                  font-size: 1.1rem;
                  font-weight: 600;
                  border-radius: 100px;
                  box-shadow: 0 10px 25px rgba(74, 111, 165, 0.3);
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                  &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(74, 111, 165, 0.4);
                  }
                  &:active {
                    transform: translateY(-2px);
                  }
                "
              >
                <span style="position: relative; z-index: 1;">Przejdź do panelu</span>
                <div style="
                  position: absolute;
                  width: 30px;
                  height: 100%;
                  background: rgba(255, 255, 255, 0.2);
                  top: 0;
                  left: -50px;
                  transform: skewX(-25deg);
                  animation: shine 5s infinite;
                "></div>
              </button>
            }>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                class="btn btn-primary"
                style="
                  padding: 16px 36px; 
                  font-size: 1.1rem;
                  font-weight: 600;
                  border-radius: 100px;
                  box-shadow: 0 10px 25px rgba(74, 111, 165, 0.3);
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                  &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(74, 111, 165, 0.4);
                  }
                  &:active {
                    transform: translateY(-2px);
                  }
                "
              >
                <span style="position: relative; z-index: 1;">Rozpocznij za darmo</span>
                <div style="
                  position: absolute;
                  width: 30px;
                  height: 100%;
                  background: rgba(255, 255, 255, 0.2);
                  top: 0;
                  left: -50px;
                  transform: skewX(-25deg);
                  animation: shine 5s infinite;
                "></div>
              </button>
            </Show>
          </div>
          
          {/* Scroll down indicator - Only shown if page is scrollable */}
          <Show when={showScrollIndicator()}>
            <div style="
              position: fixed;
              bottom: 30px;
              left: 50%;
              transform: translateX(-50%);
              animation: bounce 2s infinite;
              opacity: 0.7;
              z-index: 5;
              background-color: rgba(255, 255, 255, 0.7);
              padding: 8px;
              border-radius: 50%;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
              cursor: pointer;
            " 
            onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 12L12 19L5 12" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </Show>
        </div>
      </section>

      {/* Features section with 3D-like cards */}
      <section style="
        padding: 70px 20px;
        background: linear-gradient(180deg, var(--bg-color) 0%, var(--bg-light) 100%);
        position: relative;
        overflow: hidden;
      ">
        <div style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
          <h2 style="
            text-align: center; 
            margin-bottom: 60px; 
            color: var(--text-primary);
            font-size: clamp(1.6rem, 3vw, 2.2rem);
            font-weight: 800;
            position: relative;
          ">
            <span style="
              background: linear-gradient(90deg, var(--primary-color) 0%, var(--info-color) 100%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            ">Dlaczego</span> warto używać nieco.pl?
            <div style="
              width: 80px;
              height: 5px;
              background: linear-gradient(90deg, var(--primary-color) 0%, var(--info-color) 100%);
              position: absolute;
              bottom: -15px;
              left: 50%;
              transform: translateX(-50%);
              border-radius: 3px;
            "></div>
          </h2>
          
          <div style="
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 30px; 
            margin-bottom: 60px;
            padding: 0 10px;
          ">
            <div class="feature-card" style="
              background: white;
              border-radius: 16px;
              padding: 40px 25px;
              transition: all 0.4s ease;
              position: relative;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
              overflow: hidden;
              transform: translateY(0) rotate(0);
              &:hover {
                transform: translateY(-10px) rotate(1deg);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              }
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 5px;
                background: linear-gradient(90deg, var(--info-color) 0%, #85c9e7 100%);
              }
            ">
              <div style="
                font-size: 3rem; 
                margin-bottom: 20px;
                background: linear-gradient(135deg, var(--info-color) 0%, #85c9e7 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                display: inline-block;
              ">📊</div>
              <h3 style="
                margin-top: 0; 
                color: var(--text-primary);
                font-size: 1.4rem;
                margin-bottom: 12px;
                font-weight: 700;
              ">Śledź swoje postępy</h3>
              <p style="
                color: var(--text-secondary); 
                line-height: 1.7;
                margin: 0;
                font-size: 1rem;
              ">
                Monitoruj swoje nawyki i obserwuj postępy dzięki przejrzystym statystykom i wizualizacjom. Zobaczysz, jak małe kroki prowadzą do wielkich zmian.
              </p>
              <div style="
                position: absolute;
                bottom: -20px;
                right: -20px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(74, 162, 213, 0.1) 0%, rgba(74, 162, 213, 0) 70%);
                border-radius: 50%;
              "></div>
            </div>

            <div class="feature-card" style="
              background: white;
              border-radius: 16px;
              padding: 40px 25px;
              transition: all 0.4s ease;
              position: relative;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
              overflow: hidden;
              transform: translateY(0) rotate(0);
              &:hover {
                transform: translateY(-10px) rotate(-1deg);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              }
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 5px;
                background: linear-gradient(90deg, var(--success-color) 0%, #8ed58e 100%);
              }
            ">
              <div style="
                font-size: 3rem; 
                margin-bottom: 20px;
                background: linear-gradient(135deg, var(--success-color) 0%, #8ed58e 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                display: inline-block;
              ">🔄</div>
              <h3 style="
                margin-top: 0; 
                color: var(--text-primary);
                font-size: 1.4rem;
                margin-bottom: 12px;
                font-weight: 700;
              ">Buduj regularność</h3>
              <p style="
                color: var(--text-secondary); 
                line-height: 1.7;
                margin: 0;
                font-size: 1rem;
              ">
                Regularność jest kluczem do sukcesu. Nasza aplikacja pomoże Ci utrzymać stały rytm i motywację, nawet gdy brakuje Ci energii i zapału.
              </p>
              <div style="
                position: absolute;
                bottom: -20px;
                right: -20px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(92, 187, 92, 0.1) 0%, rgba(92, 187, 92, 0) 70%);
                border-radius: 50%;
              "></div>
            </div>

            <div class="feature-card" style="
              background: white;
              border-radius: 16px;
              padding: 40px 25px;
              transition: all 0.4s ease;
              position: relative;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
              overflow: hidden;
              transform: translateY(0) rotate(0);
              &:hover {
                transform: translateY(-10px) rotate(1deg);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              }
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 5px;
                background: linear-gradient(90deg, var(--warning-color) 0%, #f8c97a 100%);
              }
            ">
              <div style="
                font-size: 3rem; 
                margin-bottom: 20px;
                background: linear-gradient(135deg, var(--warning-color) 0%, #f8c97a 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                display: inline-block;
              ">🎯</div>
              <h3 style="
                margin-top: 0; 
                color: var(--text-primary);
                font-size: 1.4rem;
                margin-bottom: 12px;
                font-weight: 700;
              ">Osiągaj swoje cele</h3>
              <p style="
                color: var(--text-secondary); 
                line-height: 1.7;
                margin: 0;
                font-size: 1rem;
              ">
                Małe nawyki prowadzą do wielkich zmian. Wyznaczaj cele i osiągaj je krok po kroku, obserwując jak zmieniasz swoje życie dzień po dniu.
              </p>
              <div style="
                position: absolute;
                bottom: -20px;
                right: -20px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(240, 173, 78, 0.1) 0%, rgba(240, 173, 78, 0) 70%);
                border-radius: 50%;
              "></div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo section with floating card */}
      <section style="
        padding: 60px 20px 90px;
        position: relative;
        overflow: hidden;
      ">
        <div style="max-width: 800px; margin: 0 auto; position: relative; z-index: 1; padding: 0 10px;">
          <div class="demo-card" style="
            background: white;
            border-radius: 20px;
            padding: 40px 30px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.06);
            position: relative;
            overflow: hidden;
            transition: all 0.5s ease;
            &:hover {
              transform: translateY(-10px) scale(1.02);
              box-shadow: 0 25px 80px rgba(0, 0, 0, 0.1);
            }
          ">
            <div style="
              position: absolute;
              width: 300px;
              height: 300px;
              background: linear-gradient(135deg, rgba(74, 111, 165, 0.03) 0%, rgba(74, 111, 165, 0) 70%);
              border-radius: 50%;
              top: -100px;
              right: -100px;
            "></div>
            <div style="
              position: absolute;
              width: 200px;
              height: 200px;
              background: linear-gradient(135deg, rgba(74, 111, 165, 0.02) 0%, rgba(74, 111, 165, 0) 70%);
              border-radius: 50%;
              bottom: -50px;
              left: -50px;
            "></div>
            
            <h2 style="
              margin-top: 0;
              background: linear-gradient(90deg, var(--primary-color) 0%, #6a95df 100%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              font-size: 2rem;
              margin-bottom: 16px;
              font-weight: 800;
              position: relative;
              display: inline-block;
            ">
              Wypróbuj aplikację
              <div style="
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color) 0%, #6a95df 100%);
                border-radius: 3px;
              "></div>
            </h2>
            <p style="
              color: var(--text-secondary);
              line-height: 1.6;
              margin-bottom: 25px;
              font-size: 1rem;
            ">
              Zobacz, jak prosta i intuicyjna jest nasza aplikacja. Po kliknięciu przycisku nastąpi przekierowanie do panelu demonstracyjnego, gdzie możesz poznać wszystkie funkcje.
            </p>
            <form action={logout} method="post">
              <button 
                type="submit"
                class="btn"
                style="
                  background: linear-gradient(90deg, var(--primary-color) 0%, #6a95df 100%);
                  color: white;
                  padding: 14px 32px;
                  font-size: 1rem;
                  font-weight: 600;
                  border-radius: 100px;
                  border: none;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  box-shadow: 0 10px 25px rgba(74, 111, 165, 0.3);
                  &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(74, 111, 165, 0.4);
                  }
                "
              >
                Wypróbuj demo
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Global animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shine {
            0% { left: -100px; }
            20% { left: 100%; }
            100% { left: 100%; }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) translateX(-50%);
            }
            40% {
              transform: translateY(-10px) translateX(-50%);
            }
            60% {
              transform: translateY(-5px) translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
