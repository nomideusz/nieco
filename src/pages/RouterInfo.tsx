import { useLocation, useNavigate } from '@solidjs/router';

const RouterInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sprawdzamy czy używany jest HashRouter
  const isHashRouter = typeof window !== 'undefined' && window.location.hash.includes('#/');

  // Funkcja generująca linki testowe
  const generateTestUrl = (path: string) => {
    return isHashRouter ? `#${path}` : path;
  };

  return (
    <div style="padding: 20px;">
      <h1>Informacje o routerze</h1>
      
      <div style="margin-top: 20px; background-color: #f5f7fa; padding: 20px; border-radius: 8px;">
        <h2>Aktualnie używany router: <span style="color: #4a6fa5;">{isHashRouter ? 'HashRouter' : 'Router (standardowy)'}</span></h2>
        
        <div style="margin-top: 20px;">
          <h3>Informacje o bieżącym URL:</h3>
          <ul style="background-color: white; padding: 15px; border-radius: 4px; list-style-type: none;">
            <li style="margin-bottom: 8px;"><strong>Pełny URL:</strong> <code>{window.location.href}</code></li>
            <li style="margin-bottom: 8px;"><strong>pathname:</strong> <code>{location.pathname}</code></li>
            <li style="margin-bottom: 8px;"><strong>search:</strong> <code>{location.search}</code></li>
            <li style="margin-bottom: 8px;"><strong>hash:</strong> <code>{location.hash}</code></li>
          </ul>
        </div>
        
        <div style="margin-top: 20px;">
          <h3>Różnice między routerami:</h3>
          <table style="width: 100%; border-collapse: collapse; background-color: white; border-radius: 4px; overflow: hidden;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Funkcja</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Router (standardowy)</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">HashRouter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Format URL</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><code>/users/1</code></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><code>/#/users/1</code></td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>SEO</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">Przyjazny dla SEO</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">Mniej przyjazny (wszystko po # jest ignorowane przez wyszukiwarki)</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Wymaga konfiguracji serwera</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">Tak (przekierowanie 404 do index.html)</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">Nie</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Zastosowanie</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">Nowoczesne aplikacje SPA</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">Starsze hostingi bez możliwości przekierowań</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 20px;">
          <h3>Przykładowe linki:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 8px;">
              <a href={generateTestUrl("/")} style="color: #4a6fa5;">Strona główna</a>
            </li>
            <li style="margin-bottom: 8px;">
              <a href={generateTestUrl("/about?version=1.0")} style="color: #4a6fa5;">O aplikacji (z parametrem)</a>
            </li>
            <li style="margin-bottom: 8px;">
              <a href={generateTestUrl("/users")} style="color: #4a6fa5;">Użytkownicy</a>
            </li>
            <li style="margin-bottom: 8px;">
              <a href={generateTestUrl("/users/1/posts")} style="color: #4a6fa5;">Posty użytkownika</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
        <p>Możesz przełączyć się między routerami używając przycisku w prawym dolnym rogu ekranu.</p>
        <p>Podczas używania <strong>HashRouter</strong>, wszystkie URL-e będą miały format <code>/#/ścieżka</code>.</p>
        <p>Podczas używania standardowego <strong>Router</strong>, URL-e będą miały format <code>/ścieżka</code>.</p>
      </div>
    </div>
  );
};

export default RouterInfo; 