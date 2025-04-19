import { JSX, createResource } from 'solid-js';
import { useParams, A } from '@solidjs/router';

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface User {
  id: number;
  name: string;
}

// Simulate fetching posts for a user
const fetchUserPosts = async (userId: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Sample user data
  const users: Record<string, User> = {
    '1': { id: 1, name: 'John Doe' },
    '2': { id: 2, name: 'Jane Smith' },
    '3': { id: 3, name: 'Bob Johnson' },
    '4': { id: 4, name: 'Alice Brown' },
  };
  
  // Sample posts data by user
  const postsByUser: Record<string, Post[]> = {
    '1': [
      { id: 101, title: 'Getting Started with SolidJS', content: 'SolidJS is a declarative JavaScript library for creating user interfaces...', date: '2023-03-15' },
      { id: 102, title: 'SolidJS vs React', content: 'While both libraries serve the same purpose, they differ in several key aspects...', date: '2023-04-02' },
      { id: 103, title: 'State Management in SolidJS', content: 'SolidJS provides powerful primitives for managing state...', date: '2023-05-10' },
    ],
    '2': [
      { id: 201, title: 'CSS Grid Layout', content: 'CSS Grid Layout offers a grid-based layout system with rows and columns...', date: '2023-02-18' },
      { id: 202, title: 'The Future of CSS', content: 'New CSS features are constantly being developed...', date: '2023-04-25' },
    ],
    '3': [
      { id: 301, title: 'TypeScript Best Practices', content: 'TypeScript adds static types to JavaScript, improving developer experience...', date: '2023-01-30' },
      { id: 302, title: 'Advanced TypeScript Patterns', content: 'TypeScript offers powerful type manipulation capabilities...', date: '2023-03-12' },
      { id: 303, title: 'TypeScript and SolidJS', content: 'SolidJS works great with TypeScript, providing type safety...', date: '2023-05-05' },
      { id: 304, title: 'Understanding TypeScript Generics', content: 'Generics are a powerful feature of TypeScript...', date: '2023-06-20' },
    ],
    '4': [
      { id: 401, title: 'UI Design Principles', content: 'Good UI design follows certain principles that enhance usability...', date: '2023-02-10' },
      { id: 402, title: 'Color Theory for Developers', content: 'Understanding color theory can improve your UI designs...', date: '2023-04-15' },
    ],
  };
  
  const user = users[userId];
  const posts = postsByUser[userId] || [];
  
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  
  return { user, posts };
};

const UserPosts = (): JSX.Element => {
  const params = useParams();
  const [userData] = createResource(() => params.userId, fetchUserPosts);
  
  return (
    <div class="user-posts">
      <h2 class="text-xl font-semibold mb-4">User Posts</h2>
      
      <div class="loading-state">
        {userData.loading && <p>Loading posts...</p>}
      </div>
      
      <div class="error-state">
        {userData.error && (
          <div class="p-4 bg-red-100 text-red-700 rounded mb-4">
            <p>Error: {userData.error.message}</p>
            <p class="mt-2">
              <A href="/users" class="text-blue-500 hover:underline">
                Back to Users List
              </A>
            </p>
          </div>
        )}
      </div>
      
      {userData() && (
        <>
          <div class="user-info mb-6 p-4 bg-blue-50 rounded border border-blue-200">
            <h3 class="text-lg font-medium">Posts by {userData()?.user.name}</h3>
            <p class="text-gray-600">User ID: {userData()?.user.id}</p>
            <A 
              href={`/users/${params.userId}`} 
              class="text-blue-500 hover:underline inline-block mt-2"
            >
              Back to User Profile
            </A>
          </div>
          
          {userData()?.posts.length === 0 ? (
            <div class="p-4 bg-gray-50 rounded text-center">
              <p>No posts found for this user.</p>
            </div>
          ) : (
            <div class="posts-list space-y-4">
              {userData()?.posts.map((post: Post) => (
                <article class="bg-white p-4 rounded shadow">
                  <h3 class="text-lg font-semibold">{post.title}</h3>
                  <p class="text-gray-500 text-sm mb-2">Posted on {post.date}</p>
                  <p class="text-gray-700">{post.content}</p>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPosts; 