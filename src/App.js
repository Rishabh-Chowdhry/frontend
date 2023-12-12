import { Main, Login, CreateForms } from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Drawer, TicketTable } from "./components";
import CreateForm from "./pages/formbuilder/createForm";
import { UserManagement } from "./container";
import Reportbuilder from "./pages/ReportBuilder/reportbuilder";
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
            index
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Drawer />
                {/* Use Outlet to specify where child routes should be rendered */}
                <Outlet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/form-builder"
            element={
              <ProtectedRoute>
                <Drawer />
                <CreateForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user-management"
            element={
              <ProtectedRoute>
                <Drawer />
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/report-builder"
            element={
              <ProtectedRoute>
                <Drawer />
                <Reportbuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tickets-management"
            element={
              <ProtectedRoute>
                <Drawer />
                <TicketTable />
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
