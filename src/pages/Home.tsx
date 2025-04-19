import { createSignal } from 'solid-js';
import { redirect, action } from "@solidjs/router";

// Akcja z przekierowaniem
const logout = action(async () => {
  // Tutaj mogłaby być logika wylogowania, np. czyszczenie localStorage
  console.log("Wylogowywanie użytkownika...");
  // Symulacja opóźnienia operacji
  await new Promise(resolve => setTimeout(resolve, 500));
  throw redirect("/dashboard");
});

const Home = () => {
  return (
    <div style="padding: 20px;">
      <h1>Strona główna</h1>
      <p>Witaj w aplikacji nieco.pl!</p>
      
      <div style="margin-top: 20px;">
        <h2>Przykład redirect z akcji</h2>
        <p>Po kliknięciu przycisku nastąpi przekierowanie do panelu użytkownika.</p>
        <form action={logout} method="post">
          <button 
            type="submit"
            style="padding: 8px 16px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;"
          >
            Wyloguj (przekierowanie do panelu)
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
