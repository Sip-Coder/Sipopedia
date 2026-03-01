import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SippyChat } from "@/components/SippyChat";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import Home from "@/pages/Home";
import Encyclopedia from "@/pages/Encyclopedia";
import SippyAI from "@/pages/SippyAI";
import SippyProfile from "@/pages/SippyProfile";
import Certifications from "@/pages/Certifications";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/Dashboard";
import ManagerPortal from "@/pages/ManagerPortal";
import AdminPortal from "@/pages/AdminPortal";
import Login from "@/pages/Login";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import TermDetail from "@/pages/TermDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import Community from "@/pages/Community";
import TastingNotes from "@/pages/TastingNotes";
import TastingNoteForm from "@/pages/TastingNoteForm";
import TastingAnalytics from "@/pages/TastingAnalytics";
import NotFound from "@/pages/not-found";

function ProtectedTastingNotes() {
  return (
    <ProtectedRoute title="Tasting Notes" description="Sign in to access your wine tasting notes.">
      <TastingNotes />
    </ProtectedRoute>
  );
}

function ProtectedTastingNoteForm() {
  return (
    <ProtectedRoute title="Tasting Notes" description="Sign in to record a new tasting.">
      <TastingNoteForm />
    </ProtectedRoute>
  );
}

function ProtectedTastingAnalytics() {
  return (
    <ProtectedRoute title="Tasting Analytics" description="Sign in to view your tasting performance.">
      <TastingAnalytics />
    </ProtectedRoute>
  );
}

function ProtectedDashboard() {
  return (
    <ProtectedRoute title="Dashboard Access" description="Sign in to view your personalized dashboard, track your progress, and manage your account.">
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProtectedCertifications() {
  return (
    <ProtectedRoute title="Certifications Access" description="Sign in to view and manage your professional certifications and achievements.">
      <Certifications />
    </ProtectedRoute>
  );
}

function ProtectedSippyAI() {
  return (
    <ProtectedRoute title="Sippy AI Access" description="Sign in to chat with Sippy AI, your personal beverage expert.">
      <SippyAI />
    </ProtectedRoute>
  );
}

function ProtectedManagerPortal() {
  return (
    <RoleProtectedRoute 
      requiredRole="site_manager" 
      title="Site Manager Access" 
      description="This area is for site managers and administrators only."
    >
      <ManagerPortal />
    </RoleProtectedRoute>
  );
}

function ProtectedAdminPortal() {
  return (
    <RoleProtectedRoute 
      requiredRole="admin" 
      title="Admin Access" 
      description="This area is for administrators only."
    >
      <AdminPortal />
    </RoleProtectedRoute>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <Route path="/encyclopedia" component={Encyclopedia} />
      <Route path="/encyclopedia/term/:termId" component={TermDetail} />
      <Route path="/encyclopedia/:category" component={Encyclopedia} />
      <Route path="/sippy-ai" component={ProtectedSippyAI} />
      <Route path="/sippy" component={SippyProfile} />
      <Route path="/certifications" component={ProtectedCertifications} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/dashboard" component={ProtectedDashboard} />
      <Route path="/dashboard/tasting-notes" component={ProtectedTastingNotes} />
      <Route path="/dashboard/tasting-notes/new" component={ProtectedTastingNoteForm} />
      <Route path="/dashboard/tasting-notes/:id" component={ProtectedTastingNoteForm} />
      <Route path="/dashboard/analytics" component={ProtectedTastingAnalytics} />
      <Route path="/manager" component={ProtectedManagerPortal} />
      <Route path="/admin" component={ProtectedAdminPortal} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route path="/community" component={Community} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <SippyChat />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
