import { Link } from "wouter";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-border flex items-center justify-center">
                <span className="text-lg font-black gradient-text">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg gradient-text">Social HK</span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">by SAS Tech Inc</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your all-in-one digital platform for video downloads, live streaming, virtual cards, and professional web services.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-green-600 hover:bg-green-500 flex items-center justify-center transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS?mode=gi_t" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-secondary hover:bg-accent flex items-center justify-center transition-all text-muted-foreground hover:text-primary">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/download", label: "Video Downloader" },
                { href: "/live", label: "Live TV Streams" },
                { href: "/virtual-cards", label: "Virtual Cards" },
                { href: "/services", label: "Our Services" },
                { href: "/tutorials", label: "Tutorials" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Static Website Design</li>
              <li>Business Landing Pages</li>
              <li>Portfolio Websites</li>
              <li>E-Commerce Stores</li>
              <li>Blog & News Sites</li>
              <li>Video Production</li>
              <li>Graphic Design</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Monrovia, Liberia, West Africa
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +234 704 312 5375
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@socialhk.com</span>
              </li>
              <li className="mt-4">
                <a
                  href="https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS?mode=gi_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Join WhatsApp Group
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center">
            &copy; 2026 SAS Tech Inc. All rights reserved. Based in Liberia.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
