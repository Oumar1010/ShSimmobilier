
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import AdminListings from "./pages/AdminListings";
import NewProject from "./pages/NewProject";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { FloatingAuthButton } from "./components/auth/FloatingAuthButton";
import { Navbar } from "./components/Navbar";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/listings" element={<AdminListings />} />
          <Route path="/new-project" element={<NewProject />} />
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FloatingAuthButton />
      <Toaster />
    </>
  );
}

export default App;
