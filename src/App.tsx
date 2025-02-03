import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ResetPassword from "@/pages/ResetPassword";
import NewProject from "@/pages/NewProject";
import Listings from "@/pages/Listings";
import { Toaster } from "@/components/ui/sonner";
import { FloatingAuthButton } from "@/components/auth/FloatingAuthButton";

function App() {
  return (
    <Router>
      <FloatingAuthButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;