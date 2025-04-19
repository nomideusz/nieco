import { useParams, useNavigate } from '@solidjs/router';
import Header from '../components/Header';

const UserProfile = () => {
  const params = useParams();
  const navigate = useNavigate();

  // Symulacja danych użytkownika - w rzeczywistości byłyby pobierane z API
  const getUserData = (id: string) => {
    const users = [
      { id: "1", name: "Jan Kowalski", role: "Administrator" },
      { id: "2", name: "Anna Nowak", role: "Użytkownik" },
      { id: "3", name: "Piotr Wiśniewski", role: "Moderator" }
    ];
    
    return users.find(user => user.id === id) || { id, name: "Nieznany użytkownik", role: "Brak" };
  };

  const userData = getUserData(params.userId);

  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div class="app-container">
      <Header />
      <main>
        <div style="padding: 20px;">
          <h1>Profil użytkownika</h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h2>Informacje o użytkowniku</h2>
            <p><strong>ID:</strong> {params.userId}</p>
            <p><strong>Imię i nazwisko:</strong> {userData.name}</p>
            <p><strong>Rola:</strong> {userData.role}</p>
          </div>

          <p style="margin-top: 20px;">
            Parametr <code>userId</code> został pobrany z adresu URL przy użyciu <code>useParams</code>.
            Dzięki walidacji parametru (<code>matchFilters</code>), ta strona zostanie wyświetlona tylko gdy ID jest liczbą.
          </p>

          <button 
            onClick={goBack}
            style="padding: 8px 16px; background-color: #4a6fa5; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;"
          >
            Powrót do panelu
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile; 