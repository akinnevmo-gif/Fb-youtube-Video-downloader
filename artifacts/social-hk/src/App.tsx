import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import DownloaderPage from "@/pages/DownloaderPage";
import LiveStreamPage from "@/pages/LiveStreamPage";
import VirtualCardPage from "@/pages/VirtualCardPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import TutorialsPage from "@/pages/TutorialsPage";
import ToolsPage from "@/pages/ToolsPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <NewsTicker />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/download" component={DownloaderPage} />
          <Route path="/live" component={LiveStreamPage} />
          <Route path="/virtual-cards" component={VirtualCardPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/tutorials" component={TutorialsPage} />
          <Route path="/tools" component={ToolsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
