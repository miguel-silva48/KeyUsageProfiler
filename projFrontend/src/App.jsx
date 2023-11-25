import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import UserPage from './components/pages/UserPage';
import DashboardPage from './components/pages/DashboardPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/user"
          element={<UserPage />}
        />
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
