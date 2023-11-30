import { Main, Login } from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Drawer } from "./components";
function App() {
  const token = sessionStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute>
                <Main />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* <Route path="/dashboard" element={<Drawer />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Drawer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              token ? <Navigate to={"/dashboard"} /> : <Navigate to="/login" />
            }
          />
          <Route path="/about-us" />
        </Routes>
      </Router>
    </div>
  );
}
const ProtectedRoute = ({ children }) => {
  // const { token } = useAuth();
  // console.log("dd", token)
  const token = sessionStorage.getItem("token");

  if (!token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  else {
    return <Drawer />;
  }
};

const PublicRoute = ({ children }) => {
  // const { token } = useAuth();
  // console.log("dd", token)
  const token = sessionStorage.getItem("token");

  if (!token) {
    // not logged in so redirect to login page with the return url
    return children;
  }

  // authorized so return child components
  else {
    return <Navigate to="/dashboard" />;
  }
};

export default App;
