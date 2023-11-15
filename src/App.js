import { Main, Login } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Drawer } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Drawer />} />
          <Route path="/about-us" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
