import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import InstituicaoPage from "./pages/InstituicaoPage";
import LoginPage from "./pages/LoginPage";
import RegistarPage from "./pages/RegistarPage";
import SobrePage from "./pages/SobrePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/instituicoes" element={<Index />} />
            <Route path="/instituicao/:id" element={<InstituicaoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registar" element={<RegistarPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
