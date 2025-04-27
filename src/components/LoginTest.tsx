import { JSX } from 'solid-js';
import userStore from '../store/userStore';

const LoginTest = (): JSX.Element => {
  const { setIsLoginModalOpen, isLoginModalOpen } = userStore;

  const openModal = () => {
    console.log("Opening modal, current state:", isLoginModalOpen());
    setIsLoginModalOpen(true);
    console.log("After setting, state:", isLoginModalOpen());
  };

  return (
    <div style="
      padding: 20px;
      margin: 20px;
      background-color: #f0f0f0;
      border-radius: 8px;
    ">
      <h3>Login Modal Test</h3>
      <p>Current modal state: {isLoginModalOpen() ? 'OPEN' : 'CLOSED'}</p>
      <button 
        onClick={openModal}
        style="
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Open Login Modal (Test)
      </button>
    </div>
  );
};

export default LoginTest; 