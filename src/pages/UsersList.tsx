import { JSX, createResource } from 'solid-js';
import { A } from '@solidjs/router';
import { userApi, User as ApiUser, formatUserName } from '../services/api';

const UsersList = (): JSX.Element => {
  // Fetch users from Poland (pl) to get more Polish-like data
  const [users] = createResource(() => userApi.getUsers(10, 'pl'));
  
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
        Lista użytkowników
      </h1>
      
      {users.loading && (
        <div class="card" style="padding: 30px; text-align: center;">
          <p style="color: var(--text-secondary);">Ładowanie użytkowników...</p>
        </div>
      )}
      
      {users.error && (
        <div style="
          padding: 16px; 
          background-color: rgba(231, 76, 60, 0.1); 
          border-radius: var(--border-radius-md); 
          color: var(--danger-color);
          margin-bottom: 20px;
          border-left: 3px solid var(--danger-color);
        ">
          <p>Błąd ładowania użytkowników: {users.error.message}</p>
        </div>
      )}
      
      {users() && (
        <div style="display: flex; flex-direction: column; gap: 16px;">
          {users()?.map((user: ApiUser) => (
            <div class="card" style="padding: 20px; display: flex; gap: 20px;">
              <div style="flex-shrink: 0;">
                <img 
                  src={user.picture.medium} 
                  alt={formatUserName(user)}
                  style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;"
                />
              </div>
              <div style="flex-grow: 1;">
                <div style="
                  font-weight: 600; 
                  color: var(--text-primary);
                  margin-bottom: 4px;
                  font-size: 1.1rem;
                ">
                  {formatUserName(user)}
                </div>
                <div style="color: var(--text-secondary); margin-bottom: 4px;">
                  {user.email}
                </div>
                <div style="color: var(--text-secondary); margin-bottom: 12px; font-size: 0.9rem;">
                  {user.location.city}, {user.location.country} • {user.phone}
                </div>
                <div style="display: flex; gap: 16px; margin-top: 12px;">
                  <A 
                    href={`/users/${user.login.uuid}`}
                    class="btn btn-primary"
                    style="font-size: 0.9rem; padding: 8px 16px;"
                  >
                    Zobacz profil
                  </A>
                  <A 
                    href={`/users/${user.login.uuid}/posts`}
                    class="btn btn-secondary"
                    style="font-size: 0.9rem; padding: 8px 16px;"
                  >
                    Zobacz posty
                  </A>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList; 