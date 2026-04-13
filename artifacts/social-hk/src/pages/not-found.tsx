import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl font-black text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 bg-secondary hover:bg-accent text-foreground font-semibold px-6 py-3 rounded-xl transition-all border border-border">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
