/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, HashRouter } from "@solidjs/router";
import { lazy, Suspense, createSignal, Show } from "solid-js";

import './index.css';

// Leniwe ładowanie stron i layoutów
const RootLayout = lazy(() => import("./pages/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const UsersLayout = lazy(() => import("./pages/UsersLayout"));
const UsersList = lazy(() => import("./pages/UsersList"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const UserPosts = lazy(() => import("./pages/UserPosts"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const RouterInfo = lazy(() => import("./pages/RouterInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Demonstracja przełączania między trybami routera
const RouterSwitch = () => {
  const [useHashRouter, setUseHashRouter] = createSignal(
    typeof window !== 'undefined' ? localStorage.getItem('useHashRouter') === 'true' : false
  );

  const routes = (
    <>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/about" component={About} />
      <Route path="/router-info" component={RouterInfo} />
      {/* Zagnieżdżone trasy z własnym layoutem */}
      <Route path="/users" component={UsersLayout}>
        <Route path="/" component={UsersList} />
        <Route path="/:userId" component={UserDetails} />
        <Route path="/:userId/posts" component={UserPosts} />
      </Route>
      <Route path="/team/:memberId?" component={TeamPage} />
      {/* Trasa catch-all (dla wszystkich niedopasowanych URL-i) */}
      <Route path="*404" component={NotFound} />
    </>
  );

  const toggleRouter = () => {
    setUseHashRouter(!useHashRouter());
    // Zapisujemy wybór użytkownika w localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('useHashRouter', (!useHashRouter()).toString());
      // Dodajemy małe opóźnienie, aby dać przeglądarce czas na zaktualizowanie widoku
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  // Przycisk przełączania typu routera
  const RouterToggleButton = () => (
    <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
      <button 
        onClick={toggleRouter}
        style="padding: 10px; background-color: #333; color: white; border: none; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"
      >
        Przełącz na {useHashRouter() ? 'standardowy router' : 'hash router'}
      </button>
    </div>
  );

  return (
    <>
      <RouterToggleButton />
      <Show when={useHashRouter()} fallback={
        <Router root={RootLayout}>
          {routes}
        </Router>
      }>
        <HashRouter root={RootLayout}>
          {routes}
        </HashRouter>
      </Show>
    </>
  );
};

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <RouterSwitch />
    </Suspense>
  ), 
  root!
);
