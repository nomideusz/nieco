import { useParams, useNavigate } from '@solidjs/router';

const NotFound = () => {
  const params = useParams();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div style="padding: 20px; text-align: center;">
      <h1 style="font-size: 5rem; margin: 0; color: #4a6fa5;">404</h1>
      <h2>Strona nie została znaleziona</h2>
      
      <div style="margin: 30px 0;">
        <p>Nie znaleziono strony pod adresem: <strong>/{params[404] || ''}</strong></p>
        <p>Jest to przykład wykorzystania trasy catch-all oznaczonej jako <code>*404</code>.</p>
        <p>Parametr <code>404</code> zawiera nierozpoznaną część URL.</p>
      </div>
      
      <button 
        onClick={goHome}
        style="padding: 10px 20px; background-color: #4a6fa5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
      >
        Powrót do strony głównej
      </button>
    </div>
  );
};

export default NotFound; 