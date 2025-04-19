import { createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Przykładowe dane
  const items = [
    { id: 1, name: "Zadanie 1", category: "praca", priority: "wysoki" },
    { id: 2, name: "Zadanie 2", category: "dom", priority: "średni" },
    { id: 3, name: "Zadanie 3", category: "hobby", priority: "niski" },
    { id: 4, name: "Zadanie 4", category: "praca", priority: "wysoki" },
    { id: 5, name: "Zadanie 5", category: "dom", priority: "niski" },
    { id: 6, name: "Zadanie 6", category: "hobby", priority: "średni" }
  ];

  // Filtrowanie elementów na podstawie parametrów URL
  const filteredItems = () => {
    return items.filter(item => {
      // Jeśli nie wybrano kategorii, zwracamy wszystkie elementy
      if (!searchParams.category) return true;
      // W przeciwnym razie filtrujemy po kategorii
      return item.category === searchParams.category;
    }).filter(item => {
      // Jeśli nie wybrano priorytetu, zwracamy wszystkie elementy
      if (!searchParams.priority) return true;
      // W przeciwnym razie filtrujemy po priorytecie
      return item.priority === searchParams.priority;
    });
  };

  // Zmiana kategorii
  const setCategory = (category: string) => {
    setSearchParams({ category, priority: searchParams.priority });
  };

  // Zmiana priorytetu
  const setPriority = (priority: string) => {
    setSearchParams({ category: searchParams.category, priority });
  };

  // Resetowanie filtrów
  const resetFilters = () => {
    setSearchParams({});
  };

  const goToHomePage = () => {
    navigate("/", { replace: false });
  };

  const goToAboutPage = () => {
    // Z replace: true usuwamy aktualną stronę ze stosu historii
    navigate("/about", { replace: true });
  };

  return (
    <div style="padding: 20px;">
      <h1>Panel użytkownika</h1>
      <p>Tutaj znajdziesz swoje ustawienia i statystyki.</p>
      
      <div style="margin-top: 20px; background-color: #f5f7fa; padding: 20px; border-radius: 8px;">
        <h2>Przykład użycia parametrów wyszukiwania (useSearchParams)</h2>
        <p>Aktualne parametry: <strong>category={searchParams.category || "wszystkie"}</strong>, <strong>priority={searchParams.priority || "wszystkie"}</strong></p>
        
        <div style="margin-top: 15px;">
          <h3>Filtruj według kategorii</h3>
          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button 
              onClick={() => setCategory("praca")}
              style={`padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; 
                     background-color: ${searchParams.category === "praca" ? "#4a6fa5" : "#e0e0e0"}; 
                     color: ${searchParams.category === "praca" ? "white" : "black"};`}
            >
              Praca
            </button>
            <button 
              onClick={() => setCategory("dom")}
              style={`padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; 
                     background-color: ${searchParams.category === "dom" ? "#4a6fa5" : "#e0e0e0"}; 
                     color: ${searchParams.category === "dom" ? "white" : "black"};`}
            >
              Dom
            </button>
            <button 
              onClick={() => setCategory("hobby")}
              style={`padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; 
                     background-color: ${searchParams.category === "hobby" ? "#4a6fa5" : "#e0e0e0"}; 
                     color: ${searchParams.category === "hobby" ? "white" : "black"};`}
            >
              Hobby
            </button>
          </div>
        </div>
        
        <div style="margin-top: 15px;">
          <h3>Filtruj według priorytetu</h3>
          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button 
              onClick={() => setPriority("wysoki")}
              style={`padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; 
                     background-color: ${searchParams.priority === "wysoki" ? "#4a6fa5" : "#e0e0e0"}; 
                     color: ${searchParams.priority === "wysoki" ? "white" : "black"};`}
            >
              Wysoki
            </button>
            <button 
              onClick={() => setPriority("średni")}
              style={`padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; 
                     background-color: ${searchParams.priority === "średni" ? "#4a6fa5" : "#e0e0e0"}; 
                     color: ${searchParams.priority === "średni" ? "white" : "black"};`}
            >
              Średni
            </button>
            <button 
              onClick={() => setPriority("niski")}
              style={`padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; 
                     background-color: ${searchParams.priority === "niski" ? "#4a6fa5" : "#e0e0e0"}; 
                     color: ${searchParams.priority === "niski" ? "white" : "black"};`}
            >
              Niski
            </button>
          </div>
        </div>
        
        <button 
          onClick={resetFilters}
          style="padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; background-color: #e74c3c; color: white; margin-top: 15px;"
        >
          Resetuj filtry
        </button>
        
        <div style="margin-top: 20px;">
          <h3>Lista zadań po filtrowaniu:</h3>
          <ul style="list-style-type: none; padding: 0;">
            {filteredItems().map(item => (
              <li style="margin-bottom: 8px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 4px; background-color: white;">
                <div style="display: flex; justify-content: space-between;">
                  <strong>{item.name}</strong>
                  <div>
                    <span style="margin-right: 10px; padding: 2px 6px; background-color: #f0f0f0; border-radius: 4px; font-size: 0.8rem;">
                      {item.category}
                    </span>
                    <span style={`padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; 
                                background-color: ${item.priority === 'wysoki' ? '#f8d7da' : item.priority === 'średni' ? '#fff3cd' : '#d1e7dd'};
                                color: ${item.priority === 'wysoki' ? '#721c24' : item.priority === 'średni' ? '#856404' : '#155724'};`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {filteredItems().length === 0 && (
              <li style="text-align: center; padding: 20px; border: 1px dashed #e0e0e0; border-radius: 4px;">
                Brak zadań spełniających kryteria filtrowania
              </li>
            )}
          </ul>
        </div>
      </div>
      
      <div style="margin-top: 30px;">
        <h2>Przykład programowej nawigacji</h2>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button 
            onClick={goToHomePage}
            style="padding: 8px 16px; background-color: #4a6fa5; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Przejdź do strony głównej
          </button>
          <button 
            onClick={goToAboutPage}
            style="padding: 8px 16px; background-color: #345a8a; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Przejdź do strony O aplikacji (replace)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
