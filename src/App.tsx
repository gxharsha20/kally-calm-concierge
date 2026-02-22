import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Threads from "./pages/Threads";
import Chat from "./pages/Chat";
import Insights from "./pages/Insights";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/tasks" element={<AppLayout><Tasks /></AppLayout>} />
          <Route path="/threads" element={<AppLayout><Threads /></AppLayout>} />
          <Route path="/chat" element={<AppLayout><Chat /></AppLayout>} />
          <Route path="/insights" element={<AppLayout><Insights /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
