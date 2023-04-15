import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {
  HomePage
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
      {/* <Route
        path="/protected"
        element={
          // Good! Do your composition here instead of wrapping <Route>.
          // This is really just inverting the wrapping, but it's a lot
          // more clear which components expect which props.
          <RequireAuth redirectTo="/login">
            <ProtectedPage />
          </RequireAuth>
        }
      /> */}
    </BrowserRouter>
  );
}

// function RequireAuth({ children, redirectTo }) {
//   let isAuthenticated = getAuth();
//   return isAuthenticated ? children : <Navigate to={redirectTo} />;
// }

export default App;
