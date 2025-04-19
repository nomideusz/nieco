import { JSX, createResource } from 'solid-js';
import { useParams, A } from '@solidjs/router';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

// Simulate fetching a single user from an API
const fetchUserDetails = async (userId: string): Promise<UserData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Sample user data based on ID
  const users: Record<string, UserData> = {
    '1': { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joinDate: '2022-01-15' },
    '2': { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', joinDate: '2022-03-22' },
    '3': { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', joinDate: '2022-05-10' },
    '4': { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', joinDate: '2022-06-08' },
  };
  
  const user = users[userId];
  
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  
  return user;
};

const UserDetails = (): JSX.Element => {
  const params = useParams();
  const [user] = createResource(() => params.userId, fetchUserDetails);
  
  return (
    <div class="user-details">
      <h2 class="text-xl font-semibold mb-4">User Details</h2>
      
      <div class="loading-state">
        {user.loading && <p>Loading user details...</p>}
      </div>
      
      <div class="error-state">
        {user.error && (
          <div class="p-4 bg-red-100 text-red-700 rounded mb-4">
            <p>Error: {user.error.message}</p>
            <p class="mt-2">
              <A href="/users" class="text-blue-500 hover:underline">
                Back to Users List
              </A>
            </p>
          </div>
        )}
      </div>
      
      {user() && (
        <div class="bg-white p-5 rounded shadow">
          <div class="grid grid-cols-2 gap-4">
            <div class="field-label font-medium">Name:</div>
            <div>{user()?.name}</div>
            
            <div class="field-label font-medium">Email:</div>
            <div>{user()?.email}</div>
            
            <div class="field-label font-medium">Role:</div>
            <div>{user()?.role}</div>
            
            <div class="field-label font-medium">Join Date:</div>
            <div>{user()?.joinDate}</div>
            
            <div class="field-label font-medium">User ID:</div>
            <div>{user()?.id}</div>
          </div>
          
          <div class="mt-6 flex space-x-4">
            <A 
              href={`/users/${user()?.id}/posts`} 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View User's Posts
            </A>
            <A 
              href="/users" 
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Back to List
            </A>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails; 