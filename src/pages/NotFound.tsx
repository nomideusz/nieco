import { useParams, useNavigate } from '@solidjs/router';

const NotFound = () => {
  const params = useParams();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div style="
      padding: 40px 20px;
      text-align: center;
      max-width: 600px;
      margin: 60px auto;
      animation: fadeIn var(--transition-medium) forwards;
    ">
      <h1 style="
        font-size: 5rem; 
        margin: 0; 
        color: var(--primary-color);
      ">404</h1>
      
      <h2 style="
        color: var(--text-primary);
        font-size: 1.8rem;
        margin-bottom: 24px;
        font-weight: 700;
      ">Strona nie została znaleziona</h2>
      
      <div class="card" style="padding: 30px; margin: 30px 0;">
        <p style="color: var(--text-secondary); line-height: 1.6;">
          Nie znaleziono strony pod adresem: <strong>/{params[404] || ''}</strong>
        </p>
        <p style="color: var(--text-secondary); line-height: 1.6;">
          Jest to przykład wykorzystania trasy catch-all oznaczonej jako <code>*404</code>.
        </p>
        <p style="color: var(--text-secondary); line-height: 1.6;">
          Parametr <code>404</code> zawiera nierozpoznaną część URL.
        </p>
      </div>
      
      <button 
        onClick={goHome}
        class="btn btn-primary"
        style="
          padding: 14px 32px; 
          font-size: 1.1rem;
        "
      >
        Powrót do strony głównej
      </button>
    </div>
  );
};

export default NotFound; 