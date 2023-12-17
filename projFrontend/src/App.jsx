import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import UserPage from "./components/pages/UserPage";
import DashboardPage from "./components/pages/DashboardPage";
import RegisterPage from "./components/pages/RegisterPage";
import JoinTeamPage from "./components/pages/JoinTeamPage";
import ProfilePage from "./components/pages/ProfilePage";
import Leaderboards from "./components/pages/LeaderboardsPage";
import Notifications from "./components/pages/NotificationPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/teams/join/:token" element={<JoinTeamPage />}></Route>
        <Route path="/leaderboards" element={<Leaderboards />}></Route>
        <Route path="/notifications" element={<Notifications />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
