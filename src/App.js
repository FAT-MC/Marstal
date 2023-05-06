import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {
  HomePage,
  VoiceChatPage,
  AuthPage,
  Page
} from "./components";
import { SocketProvider } from "./context";


function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  function RequireAuth({ children, redirectTo }) {
    return isAuthenticated ? children : <Navigate to="/auth" replace state={{ redirectTo }} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/voice" element={
          <RequireAuth redirectTo="/voice">
            <Page>
              <SocketProvider>
                <VoiceChatPage />
              </SocketProvider>
            </Page>
          </RequireAuth>
        } />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo="/home">
              <Page>
                <SocketProvider>
                  <HomePage />
                </SocketProvider>
              </Page>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
