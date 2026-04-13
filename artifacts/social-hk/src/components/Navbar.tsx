import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Download, Tv, CreditCard, Briefcase, BookOpen, Phone, Home, Wrench } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/download", label: "Downloader", icon: Download },
  { href: "/live", label: "Live TV", icon: Tv },
  { href: "/virtual-cards", label: "Cards", icon: CreditCard },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/tutorials", label: "Tutorials", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Phone },
];

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-border flex items-center justify-center glow-purple">
              <span className="text-lg font-black gradient-text">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg gradient-text tracking-tight">Social HK</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase hidden sm:block">by SAS Tech</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${location === href ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all">
              {WA_ICON}
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <button onClick={() => setOpen(!open)}
              className="xl:hidden p-2 rounded-xl bg-secondary hover:bg-accent transition-all">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="xl:hidden border-t border-border bg-background/98 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${location === href ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-500 text-white transition-all">
              {WA_ICON}
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
