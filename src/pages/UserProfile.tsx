import { useParams, useNavigate } from '@solidjs/router';
import Header from '../components/Header';
import { createResource } from 'solid-js';
import { userApi, formatUserName } from '../services/api';

const UserProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user] = createResource(() => params.userId, userApi.getUser);

  const goBack = () => {
    navigate("/dashboard");
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <div class="app-container">
      <Header />
      <main style="animation: fadeIn var(--transition-medium) forwards;">
        <div style="padding: 20px;">
          <h1 style="
            color: var(--text-primary);
            font-size: 1.8rem;
            margin-bottom: 24px;
            font-weight: 700;
          ">Profil użytkownika</h1>
          
          {user.loading && (
            <div class="card" style="padding: 30px; text-align: center;">
              <p style="color: var(--text-secondary);">Ładowanie danych użytkownika...</p>
            </div>
          )}
          
          {user.error && (
            <div style="
              padding: 16px; 
              background-color: rgba(231, 76, 60, 0.1); 
              border-radius: var(--border-radius-md); 
              color: var(--danger-color);
              margin-bottom: 20px;
              border-left: 3px solid var(--danger-color);
            ">
              <p>Błąd: {user.error.message}</p>
            </div>
          )}
          
          {user() && (
            <div class="card" style="padding: 30px; margin-top: 20px;">
              <div style="display: flex; gap: 30px; margin-bottom: 30px;">
                <div style="flex-shrink: 0;">
                  <img 
                    src={user()?.picture.large} 
                    alt={formatUserName(user()!)}
                    style="
                      width: 140px; 
                      height: 140px; 
                      border-radius: 50%; 
                      object-fit: cover;
                      border: 4px solid var(--bg-light);
                      box-shadow: var(--card-shadow);
                    "
                  />
                </div>
                <div>
                  <h2 style="
                    color: var(--primary-color);
                    font-size: 1.6rem;
                    margin-top: 0;
                    margin-bottom: 8px;
                    font-weight: 700;
                  ">{formatUserName(user()!)}</h2>
                  <p style="color: var(--text-secondary); margin: 0 0 4px 0; font-size: 1.1rem;">
                    {user()?.email}
                  </p>
                  <p style="color: var(--text-secondary); margin: 0; font-size: 0.95rem;">
                    {user()?.location.city}, {user()?.location.country}
                  </p>
                </div>
              </div>
              
              <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 20px;
                border-top: 1px solid var(--border-color);
                padding-top: 20px;
              ">
                <div>
                  <h3 style="
                    color: var(--text-secondary);
                    font-size: 1rem;
                    margin-top: 0;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                  ">Informacje kontaktowe</h3>
                  
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Email:</strong> {user()?.email}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Telefon:</strong> {user()?.phone}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Komórka:</strong> {user()?.cell}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>ID:</strong> {user()?.login.uuid}
                  </p>
                </div>
                
                <div>
                  <h3 style="
                    color: var(--text-secondary);
                    font-size: 1rem;
                    margin-top: 0;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                  ">Adres</h3>
                  
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Ulica:</strong> {user()?.location.street.name} {user()?.location.street.number}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Miasto:</strong> {user()?.location.city}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Województwo:</strong> {user()?.location.state}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Kod pocztowy:</strong> {user()?.location.postcode}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Kraj:</strong> {user()?.location.country}
                  </p>
                </div>
                
                <div>
                  <h3 style="
                    color: var(--text-secondary);
                    font-size: 1rem;
                    margin-top: 0;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                  ">Dodatkowe informacje</h3>
                  
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Data urodzenia:</strong> {formatDate(user()?.dob?.date)} ({user()?.dob?.age} lat)
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Data rejestracji:</strong> {formatDate(user()?.registered?.date)}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Nazwa użytkownika:</strong> {user()?.login.username}
                  </p>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">
                    <strong>Narodowość:</strong> {user()?.nat}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p style="
            margin-top: 20px;
            color: var(--text-secondary);
            line-height: 1.6;
          ">
            Parametr <code>userId</code> został pobrany z adresu URL przy użyciu <code>useParams</code>.
            Dzięki walidacji parametru (<code>matchFilters</code>), ta strona zostanie wyświetlona tylko gdy ID jest liczbą.
          </p>

          <button 
            onClick={goBack}
            class="btn btn-primary"
            style="margin-top: 20px;"
          >
            Powrót do panelu
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile; 