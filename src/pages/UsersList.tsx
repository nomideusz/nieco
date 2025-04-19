import { JSX, createSignal, createResource } from 'solid-js';
import { A } from '@solidjs/router';

interface User {
  id: number;
  name: string;
  email: string;
}

// Simulate fetching users from an API
const fetchUsers = async (): Promise<User[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
  ];
};

const UsersList = (): JSX.Element => {
  const [users] = createResource(fetchUsers);
  
  return (
    <div class="users-list">
      <h2 class="text-xl font-semibold mb-4">Users List</h2>
      
      <div class="loading-state">
        {users.loading && <p>Loading users...</p>}
      </div>
      
      <div class="error-state">
        {users.error && <p class="text-red-500">Error loading users: {users.error.message}</p>}
      </div>
      
      {users() && (
        <ul class="space-y-2">
          {users()?.map((user: User) => (
            <li class="p-3 bg-white rounded shadow">
              <div class="font-medium">{user.name}</div>
              <div class="text-gray-600">{user.email}</div>
              <div class="mt-2 space-x-3">
                <A 
                  href={`/users/${user.id}`}
                  class="text-blue-500 hover:underline"
                >
                  View Profile
                </A>
                <A 
                  href={`/users/${user.id}/posts`}
                  class="text-blue-500 hover:underline"
                >
                  View Posts
                </A>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList; 