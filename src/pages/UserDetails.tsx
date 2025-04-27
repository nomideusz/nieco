import { JSX, createResource } from 'solid-js';
import { useParams, A } from '@solidjs/router';
import { userApi, User, formatUserName } from '../services/api';

const UserDetails = (): JSX.Element => {
  const params = useParams();
  const [user] = createResource(() => params.userId, userApi.getUser);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };
  
  return (
    <div style="
      padding: 20px;
      animation: fadeIn var(--transition-medium) forwards;
    ">
      <h1 style="
        color: var(--text-primary);
        font-size: 1.8rem;
        margin-bottom: 24px;
        font-weight: 700;
      ">
        Szczegóły użytkownika
      </h1>
      
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
          <p style="margin-top: 12px;">
            <A 
              href="/users" 
              style="
                color: var(--primary-color);
                text-decoration: none;
                &:hover {
                  text-decoration: underline;
                }
              "
            >
              Powrót do listy użytkowników
            </A>
          </p>
        </div>
      )}
      
      {user() && (
        <>
          <div class="card" style="padding: 30px;">
            <div style="display: flex; gap: 30px; margin-bottom: 30px;">
              <div style="flex-shrink: 0; text-align: center;">
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
              <div style="flex-grow: 1;">
                <h2 style="
                  color: var(--primary-color);
                  font-size: 1.6rem;
                  margin-top: 0;
                  margin-bottom: 8px;
                  font-weight: 700;
                ">{formatUserName(user()!)}</h2>
                <p style="
                  color: var(--text-secondary);
                  margin: 0 0 4px 0;
                  font-size: 1.1rem;
                ">{user()?.email}</p>
                <p style="
                  color: var(--text-secondary);
                  margin: 0 0 20px 0;
                  font-size: 0.95rem;
                ">{user()?.location.city}, {user()?.location.country}</p>
                
                <div style="display: flex; gap: 16px;">
                  <A 
                    href={`/users/${user()?.login.uuid}/posts`} 
                    class="btn btn-primary"
                  >
                    Zobacz posty użytkownika
                  </A>
                  <A 
                    href="/users" 
                    class="btn btn-secondary"
                  >
                    Powrót do listy
                  </A>
                </div>
              </div>
            </div>
            
            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              border-top: 1px solid var(--border-color);
              padding-top: 20px;
            ">
              <div>
                <h3 style="
                  color: var(--text-secondary);
                  font-size: 1rem;
                  margin-top: 0;
                  margin-bottom: 12px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  font-weight: 600;
                ">Informacje kontaktowe</h3>
                
                <div style="
                  display: grid;
                  grid-template-columns: 120px 1fr;
                  row-gap: 12px;
                  column-gap: 10px;
                ">
                  <div style="font-weight: 600; color: var(--text-secondary);">Telefon:</div>
                  <div style="color: var(--text-primary);">{user()?.phone}</div>
                  
                  <div style="font-weight: 600; color: var(--text-secondary);">Komórka:</div>
                  <div style="color: var(--text-primary);">{user()?.cell}</div>
                  
                  <div style="font-weight: 600; color: var(--text-secondary);">Login:</div>
                  <div style="color: var(--text-primary);">{user()?.login.username}</div>
                  
                  <div style="font-weight: 600; color: var(--text-secondary);">ID:</div>
                  <div style="color: var(--text-primary);">{user()?.login.uuid}</div>
                </div>
              </div>
              
              <div>
                <h3 style="
                  color: var(--text-secondary);
                  font-size: 1rem;
                  margin-top: 0;
                  margin-bottom: 12px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  font-weight: 600;
                ">Informacje osobiste</h3>
                
                <div style="
                  display: grid;
                  grid-template-columns: 120px 1fr;
                  row-gap: 12px;
                  column-gap: 10px;
                ">
                  <div style="font-weight: 600; color: var(--text-secondary);">Data urodzenia:</div>
                  <div style="color: var(--text-primary);">{formatDate(user()?.dob.date)} ({user()?.dob.age} lat)</div>
                  
                  <div style="font-weight: 600; color: var(--text-secondary);">Rejestracja:</div>
                  <div style="color: var(--text-primary);">{formatDate(user()?.registered.date)}</div>
                  
                  <div style="font-weight: 600; color: var(--text-secondary);">Narodowość:</div>
                  <div style="color: var(--text-primary);">{user()?.nat}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card" style="padding: 30px; margin-top: 20px;">
            <h3 style="
              color: var(--primary-color);
              font-size: 1.2rem;
              margin-top: 0;
              margin-bottom: 20px;
              border-bottom: 2px solid var(--border-color);
              padding-bottom: 12px;
            ">
              Adres
            </h3>
            
            <div style="
              display: grid;
              grid-template-columns: 120px 1fr;
              row-gap: 16px;
              column-gap: 20px;
            ">
              <div style="font-weight: 600; color: var(--text-secondary);">Ulica:</div>
              <div style="color: var(--text-primary);">{user()?.location.street.name} {user()?.location.street.number}</div>
              
              <div style="font-weight: 600; color: var(--text-secondary);">Miasto:</div>
              <div style="color: var(--text-primary);">{user()?.location.city}</div>
              
              <div style="font-weight: 600; color: var(--text-secondary);">Województwo:</div>
              <div style="color: var(--text-primary);">{user()?.location.state}</div>
              
              <div style="font-weight: 600; color: var(--text-secondary);">Kraj:</div>
              <div style="color: var(--text-primary);">{user()?.location.country}</div>
              
              <div style="font-weight: 600; color: var(--text-secondary);">Kod pocztowy:</div>
              <div style="color: var(--text-primary);">{user()?.location.postcode}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails; 