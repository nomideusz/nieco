/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from "@solidjs/router";
import { lazy, Suspense } from "solid-js";

import './index.css';

// Lazy load pages and layouts
const RootLayout = lazy(() => import("./pages/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UsersLayout = lazy(() => import("./pages/UsersLayout"));
const UsersList = lazy(() => import("./pages/UsersList"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const UserPosts = lazy(() => import("./pages/UserPosts"));
const NotFound = lazy(() => import("./pages/NotFound"));

const root = document.getElementById('root');

// @ts-ignore - import.meta.env is provided by Vite
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <Router root={RootLayout}>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        {/* Nested routes with their own layout */}
        <Route path="/users" component={UsersLayout}>
          <Route path="/" component={UsersList} />
          <Route path="/:userId" component={UserDetails} />
          <Route path="/:userId/posts" component={UserPosts} />
        </Route>
        {/* Catch-all route (for all unmatched URLs) */}
        <Route path="*404" component={NotFound} />
      </Router>
    </Suspense>
  ), 
  root!
);
