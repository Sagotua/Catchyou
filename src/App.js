import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";

import WelcomeScreen from "./WelcomeScreen";
import SignUpScreen from "./SignUpScreen";
import LogInScreen from "./LogInScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import SwipeScreen from "./SwipeScreen";
import MessagesScreen from "./MessagesScreen";
import UserProfileScreen from "./UserProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import BottomNavBar from "./BottomNavBar";
import ChatConversationScreen from "./ChatConversationScreen";
import LikesScreen from "./LikesScreen";

function AppContent() {
  const location = useLocation();
  const hideNavOn = ["/", "/login", "/signup", "/forgot-password"];

  const shouldShowNav = !hideNavOn.includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/swipe" element={<SwipeScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/profile" element={<UserProfileScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/chat/:userId" element={<ChatConversationScreen />} />
        <Route path="/likes" element={<LikesScreen />} />
      </Routes>

      {shouldShowNav && <BottomNavBar />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
