import { createResource } from 'solid-js';
import { useParams, A } from '@solidjs/router';
import { userApi, Post, formatUserName } from '../services/api';

const UserPosts = () => {
  const params = useParams();
  const [user] = createResource(() => params.userId, userApi.getUser);
  const [posts] = createResource(() => params.userId, userApi.getUserPosts);
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };
  
  const getUserName = () => {
    if (!user()) return '';
    return formatUserName(user()!);
  };
  
  return (
    <div style="
      padding: 20px;
      animation: fadeIn var(--transition-medium) forwards;
    ">
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 24px;">
        {user() && (
          <img 
            src={user()!.picture.medium} 
            alt={getUserName()}
            style="
              width: 60px; 
              height: 60px; 
              border-radius: 50%; 
              object-fit: cover;
              border: 3px solid var(--bg-light);
            "
          />
        )}
        <h1 style="
          color: var(--text-primary);
          font-size: 1.8rem;
          margin: 0;
          font-weight: 700;
        ">
          {user() ? `Posty użytkownika: ${getUserName()}` : "Ładowanie..."}
        </h1>
      </div>
      
      <div style="margin-bottom: 20px;">
        <A href={`/users/${params.userId}`} class="btn btn-secondary">
          Powrót do profilu użytkownika
        </A>
      </div>
      
      {/* Loading state */}
      {posts.loading && (
        <div class="card" style="padding: 30px; text-align: center;">
          <p style="color: var(--text-secondary);">Ładowanie postów użytkownika...</p>
        </div>
      )}
      
      {/* Error state */}
      {posts.error && (
        <div style="
          padding: 16px; 
          background-color: rgba(231, 76, 60, 0.1); 
          border-radius: var(--border-radius-md); 
          color: var(--danger-color);
          margin-bottom: 20px;
          border-left: 3px solid var(--danger-color);
        ">
          <p>Błąd: {posts.error.message}</p>
        </div>
      )}
      
      {/* Posts list */}
      {posts() && posts()!.length > 0 && (
        <div style="display: flex; flex-direction: column; gap: 16px;">
          {posts()!.map((post: Post) => (
            <div class="card" style="padding: 24px;">
              <h2 style="
                color: var(--primary-color);
                font-size: 1.2rem;
                margin-top: 0;
                margin-bottom: 8px;
                font-weight: 600;
              ">
                {post.title}
              </h2>
              <div style="
                color: var(--text-muted);
                font-size: 0.85rem;
                margin-bottom: 14px;
              ">
                Data publikacji: {formatDate(post.date)}
              </div>
              <p style="
                color: var(--text-secondary);
                line-height: 1.6;
                margin: 0;
              ">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* No posts state */}
      {posts() && posts()!.length === 0 && (
        <div class="card" style="padding: 30px; text-align: center;">
          <p style="color: var(--text-secondary);">Ten użytkownik nie ma żadnych postów.</p>
        </div>
      )}
    </div>
  );
};

export default UserPosts; 