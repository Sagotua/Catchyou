import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import WelcomeScreen from "./WelcomeScreen";
import SignUpScreen from "./SignUpScreen";
import LogInScreen from "./LogInScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import SwipeScreen from "./SwipeScreen";
import UserProfileScreen from "./UserProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import BottomNavBar from "./BottomNavBar";
import ChatConversationScreen from "./ChatConversationScreen";
import MatchesScreen from "./MatchesScreen";
import SettingsScreen from "./SettingsScreen";
import AboutAppScreen from "./AboutAppScreen";
import HelpScreen from "./HelpScreen";


function AppContent() {
  const location = useLocation();
  const hideNavOn = ["/", "/login", "/signup", "/forgot-password"];
  const shouldShowNav = !hideNavOn.includes(location.pathname);

  return (
    <div className="min-h-screen bg-warm text-black dark:bg-black dark:text-white grid">
      {/* iPhone 15 Pro Max frame */}
      {/* <div className="w-[430px] h-[932px] rounded-[38px] border-[12px] border-zinc-800 shadow-2xl overflow-hidden relative"> */}
      {/* Dynamic Island */}
      {/* <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[140px] h-[30px] rounded-full bg-zinc-900/80 z-10" /> */}

      {/* App Content */}
      <div className="relative w-full h-full">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/login" element={<LogInScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/swipe" element={<SwipeScreen />} />
          <Route path="/matches" element={<MatchesScreen />} />
          <Route path="/profile" element={<UserProfileScreen />} />
          <Route path="/edit-profile" element={<EditProfileScreen />} />
          <Route path="/chat/:userId" element={<ChatConversationScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/about" element={<AboutAppScreen />} />
          <Route path="/help" element={<HelpScreen />} />
        </Routes>

        {shouldShowNav && <BottomNavBar />}
      </div>
      {/* </div> */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
