
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ResetPassword from "@/pages/ResetPassword";
import NewProject from "@/pages/NewProject";
import Listings from "@/pages/Listings";
import AdminListings from "@/pages/AdminListings";
import { Toaster } from "@/components/ui/sonner";
import { FloatingAuthButton } from "@/components/auth/FloatingAuthButton";
import { Navbar } from "@/components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <FloatingAuthButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/admin" element={<AdminListings />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
