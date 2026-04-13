import { Link } from "wouter";
import { Download, Tv, CreditCard, Briefcase, BookOpen, ArrowRight, Zap, Shield, Globe, Smartphone } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";

const features = [
  {
    icon: Download,
    title: "Video Downloader",
    desc: "Download videos from Facebook & YouTube directly to your device in HD quality.",
    href: "/download",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Tv,
    title: "Live TV & Movies",
    desc: "Stream 50+ live YouTube channels and 70+ free public license movies globally.",
    href: "/live",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: CreditCard,
    title: "Virtual Card Generator",
    desc: "Generate Visa, MasterCard, and other virtual cards for testing and privacy.",
    href: "/virtual-cards",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Briefcase,
    title: "Web Design Services",
    desc: "Professional static websites, landing pages, and portfolios at affordable prices.",
    href: "/services",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: BookOpen,
    title: "Tutorial Classes",
    desc: "Live online courses for nursing, engineering, business, technology, and more.",
    href: "/tutorials",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Globe,
    title: "Weather Updates",
    desc: "Real-time weather information for any city worldwide, powered live data.",
    href: "/",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const stats = [
  { label: "Live Streams", value: "120+" },
  { label: "Free Movies", value: "70+" },
  { label: "Happy Users", value: "10K+" },
  { label: "Countries", value: "50+" },
];

const appPlatforms = [
  { name: "Download for iOS", icon: "🍎", sub: "App Store" },
  { name: "Download for Android", icon: "🤖", sub: "Google Play" },
  { name: "Web Browser", icon: "🌐", sub: "All Browsers" },
];

export default function HomePage() {
  return (
    <div className="hero-bg">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" />
                All-in-One Digital Platform by SAS Tech Inc
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
                Your Complete
                <br />
                <span className="gradient-text">Digital Hub</span>
                <br />
                for Liberia & Beyond
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Download videos, stream live TV, generate virtual cards, get custom websites built — all in one powerful platform. Made in Liberia, reaching the world.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/download"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold px-6 py-3.5 rounded-xl transition-all glow-purple">
                  <Download className="w-5 h-5" />
                  Start Downloading
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/live"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-accent text-foreground font-semibold px-6 py-3.5 rounded-xl transition-all border border-border">
                  <Tv className="w-5 h-5" />
                  Watch Live TV
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {appPlatforms.map((p) => (
                  <div key={p.name} className="flex items-center gap-2 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 cursor-pointer hover:border-primary/40 transition-all">
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-foreground">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <WeatherWidget />

              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-2xl p-5 gradient-border text-center card-hover">
                    <div className="text-3xl font-black gradient-text">{s.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between gradient-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
                    <span className="text-sm font-bold text-foreground">Join Our WhatsApp Group</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Get updates, support & connect with our community</p>
                </div>
                <a
                  href="https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS?mode=gi_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Everything You Need, <span className="gradient-text">One Platform</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built for Africa and beyond — fast, reliable, and packed with features that put you ahead.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, href, color, bg }) => (
            <Link key={title} href={href}
              className="bg-card border border-border rounded-2xl p-6 card-hover group cursor-pointer">
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <div className="flex items-center gap-1 mt-4 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-card border border-border rounded-3xl p-8 gradient-border">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              <h3 className="font-bold text-foreground">100% Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">All downloads and streams are protected and safe for your device</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Zap className="w-10 h-10 text-yellow-400" />
              <h3 className="font-bold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Optimized for speed — downloads start instantly, streams load in seconds</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Smartphone className="w-10 h-10 text-emerald-400" />
              <h3 className="font-bold text-foreground">Mobile First</h3>
              <p className="text-sm text-muted-foreground">Perfectly designed for phones — works flawlessly on iOS and Android</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent to-secondary border border-primary/20 p-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Need a Website Built?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            SAS Tech Inc builds stunning, fast, static websites for businesses, portfolios, and brands. Contact us today for a free quote.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/2347043125375"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link href="/services"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold px-6 py-3.5 rounded-xl transition-all">
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
