import { JSX, createSignal, createEffect } from 'solid-js';
import userStore from '../store/userStore';

const UserStoreTest = (): JSX.Element => {
  const { user, login, register, logout, isLoginModalOpen, setIsLoginModalOpen } = userStore;
  
  const [testEmail, setTestEmail] = createSignal("test@example.com");
  const [testPassword, setTestPassword] = createSignal("password123");
  const [testName, setTestName] = createSignal("Test User");
  const [testResult, setTestResult] = createSignal("");
  const [stateLog, setStateLog] = createSignal<string[]>([]);
  
  // Log state changes
  createEffect(() => {
    const logEntry = `Modal open: ${isLoginModalOpen()}, User logged in: ${user.isLoggedIn}, Username: ${user.name || 'none'}`;
    setStateLog((prev) => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  });
  
  const testLoginFunction = async () => {
    setTestResult("Attempting login...");
    try {
      const result = await login(testEmail(), testPassword());
      setTestResult(`Login result: ${result}`);
    } catch (error) {
      setTestResult(`Login error: ${error}`);
    }
  };
  
  const testRegisterFunction = async () => {
    setTestResult("Attempting registration...");
    try {
      const result = await register(testName(), testEmail(), testPassword());
      setTestResult(`Registration result: ${result}`);
    } catch (error) {
      setTestResult(`Registration error: ${error}`);
    }
  };
  
  const testLogoutFunction = () => {
    setTestResult("Logging out...");
    logout();
    setTestResult("Logout complete");
  };
  
  const testOpenModal = () => {
    setTestResult(`Opening modal (current state: ${isLoginModalOpen()})`);
    setIsLoginModalOpen(true);
    setTestResult(`Modal state after opening: ${isLoginModalOpen()}`);
  };
  
  const testCloseModal = () => {
    setTestResult(`Closing modal (current state: ${isLoginModalOpen()})`);
    setIsLoginModalOpen(false);
    setTestResult(`Modal state after closing: ${isLoginModalOpen()}`);
  };
  
  return (
    <div style="
      padding: 20px;
      margin: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #ddd;
    ">
      <h2 style="margin-top: 0;">UserStore Test Component</h2>
      
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
        <h3>Current State:</h3>
        <div style="
          padding: 10px;
          background-color: white;
          border-radius: 4px;
          border: 1px solid #eee;
        ">
          <p><strong>Modal Open:</strong> {isLoginModalOpen() ? 'YES' : 'NO'}</p>
          <p><strong>User Logged In:</strong> {user.isLoggedIn ? 'YES' : 'NO'}</p>
          <p><strong>User Name:</strong> {user.name || 'none'}</p>
          <p><strong>User Email:</strong> {user.email || 'none'}</p>
        </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
        <h3>Test Controls:</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button 
            onClick={testLoginFunction}
            style="
              padding: 8px 16px;
              background-color: #4A6FA5;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Test Login
          </button>
          
          <button 
            onClick={testRegisterFunction}
            style="
              padding: 8px 16px;
              background-color: #5CBB5C;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Test Register
          </button>
          
          <button 
            onClick={testLogoutFunction}
            style="
              padding: 8px 16px;
              background-color: #D9534F;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Test Logout
          </button>
          
          <button 
            onClick={testOpenModal}
            style="
              padding: 8px 16px;
              background-color: #F0AD4E;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Open Modal
          </button>
          
          <button 
            onClick={testCloseModal}
            style="
              padding: 8px 16px;
              background-color: #777;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Close Modal
          </button>
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3>Test Result:</h3>
        <div style="
          padding: 10px;
          background-color: white;
          border-radius: 4px;
          border: 1px solid #eee;
          min-height: 24px;
        ">
          {testResult()}
        </div>
      </div>
      
      <div>
        <h3>State Change Log:</h3>
        <div style="
          padding: 10px;
          background-color: white;
          border-radius: 4px;
          border: 1px solid #eee;
          max-height: 200px;
          overflow-y: auto;
        ">
          <ul style="margin: 0; padding-left: 20px;">
            {stateLog().map((log, i) => (
              <li>{log}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserStoreTest; 