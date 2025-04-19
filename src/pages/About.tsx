import { createSignal } from 'solid-js';
import { useLocation, useNavigate } from '@solidjs/router';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Funkcja do generowania losowego parametru wersji w adresie URL
  const addRandomVersionParam = () => {
    const versions = ['1.0.0', '1.1.0', '1.2.0', '2.0.0-beta'];
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];
    navigate(`/about?version=${randomVersion}&timestamp=${Date.now()}`);
  };

  return (
    <div style="padding: 20px;">
      <h1>O aplikacji</h1>
      <p>Nieco.pl to aplikacja, która pomaga Ci być nieco lepszym każdego dnia.</p>
      <p>Wersja: 1.0.0</p>
      
      <div style="margin-top: 30px; background-color: #f5f7fa; padding: 20px; border-radius: 8px;">
        <h2>Przykład dostępu do parametrów wyszukiwania przez useLocation</h2>
        <div>
          <p>Aktualny URL: <code>{location.pathname + location.search}</code></p>
          <p>Parametry wyszukiwania (search): <code>{location.search}</code></p>
          
          {location.search && (
            <div style="margin-top: 15px; padding: 15px; background-color: white; border-radius: 4px;">
              <h3>Parametry obecne w URL:</h3>
              <pre style="background-color: #f0f0f0; padding: 10px; border-radius: 4px; overflow-x: auto;">
                {JSON.stringify(Object.fromEntries(new URLSearchParams(location.search)), null, 2)}
              </pre>
            </div>
          )}
          
          <button 
            onClick={addRandomVersionParam}
            style="padding: 8px 16px; background-color: #4a6fa5; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px;"
          >
            Dodaj losowy parametr wersji do URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
